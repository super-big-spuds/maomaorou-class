"use client";

import { gql } from "@/__generated__";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useToken from "@/hook/useToken";
import { cn, getPaymentUrl } from "@/lib/utils";
import { useCart } from "@/provider/cart-provider";
import { useUser } from "@/provider/user-provider";
import { useMutation, useQuery } from "@apollo/client";
import { FormEventHandler } from "react";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { X } from "lucide-react";

const GET_LATEST_PRICE_QUERY = gql(`
  query GetCoursesQueryData($courseIds: [ID]) {
    courses(filters: {
      id: {
        in: $courseIds
      }
    }) {
      data {
        id
        attributes {
          title
          price
          image {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`);

const REGISTER_MUTATION = gql(`
mutation registerUser($userData: UsersPermissionsRegisterInput!) {
  register(input: $userData) {
    jwt
  }
}
`);

const SUBMIT_ORDER_MUTATION = gql(`
mutation createOrderWithPayment($courseIds: [ID]) {
  createOrderWithPayment(courseIds: $courseIds) {
    paymentUrl
    error
  }
}
`);

const schema = z.object({
  courses: z.object({
    data: z.array(
      z.object({
        id: z.string(),
        attributes: z.object({
          title: z.string(),
          price: z.number(),
          image: z.object({
            data: z.object({
              id: z.string(),
              attributes: z.object({
                url: z.string(),
              }),
            }),
          }),
        }),
      })
    ),
  }),
});

type IFormData = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

export default function CheckoutPage() {
  const cartData = useCart();
  const { data: latestCartData, loading } = useQuery(GET_LATEST_PRICE_QUERY, {
    variables: {
      courseIds: cartData.cart.map((item) => item.id),
    },
  });
  const [sendRegisterUserMutation] = useMutation(REGISTER_MUTATION);
  const [sendSubmitOrderMutation] = useMutation(SUBMIT_ORDER_MUTATION);
  const userContext = useUser();
  const { token, setToken } = useToken();
  const parseResult = schema.safeParse(latestCartData);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!parseResult.success) {
      alert("載入購物車資料失敗, 請重新整理頁面後再試一次");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries()) as IFormData;

    // Register a user
    const getToken = async () => {
      if (userContext.userData !== null && token !== null) {
        return token;
      } else {
        const registerResponse = await sendRegisterUserMutation({
          variables: {
            userData: {
              username: data.name,
              email: data.email,
              password: data.password,
            },
          },
        });
        if (registerResponse.errors || !registerResponse.data?.register?.jwt) {
          return null;
        }
        setToken(registerResponse.data.register.jwt);
        return registerResponse.data.register.jwt;
      }
    };

    const createOrderToken = getToken();

    if (createOrderToken === null) {
      alert("Failed to register user");
      return;
    }

    // Send Create Order To Server.
    const submitOrderResponse = await sendSubmitOrderMutation({
      variables: {
        courseIds: parseResult.data.courses.data.map((course) => course.id),
      },
      context: {
        headers: {
          Authorization: `Bearer ${createOrderToken}`,
        },
      },
    });
    if (
      submitOrderResponse.data?.createOrderWithPayment?.error ||
      !submitOrderResponse.data?.createOrderWithPayment?.paymentUrl
    ) {
      alert(submitOrderResponse.data?.createOrderWithPayment?.error);
      return;
    }

    window.location.href = getPaymentUrl(
      submitOrderResponse.data.createOrderWithPayment.paymentUrl
    );
  };

  return (
    <div className="w-full h-full ">
      <form
        onSubmit={onSubmit}
        className="flex md:flex-row flex-col items-center justify-center w-full h-full gap-4 m-4"
      >
        <Card className="flex flex-col w-full max-w-3xl justify-center p-4">
          <CardTitle>結帳</CardTitle>
          {userContext.userData !== null && (
            <CardDescription className="mt-1">
              已登入, 購買資訊將自動綁定到登入會員
            </CardDescription>
          )}
          <CardContent className="flex flex-col gap-4 p-0 my-4">
            {/* 已註冊時不用填寫會員資料 */}
            <div>
              <p>姓名</p>
              <Input
                required
                placeholder="輸入本名"
                name="name"
                disabled={userContext.userData !== null}
                className=" w-full"
              />
            </div>
            <div>
              <p>電子郵件(作為系統帳號)</p>
              <Input
                required
                placeholder="example@gmail.com"
                name="email"
                disabled={userContext.userData !== null}
                className=" w-full"
              />
            </div>
            <div>
              <p>密碼</p>
              <Input
                required
                placeholder="密碼(至少6碼以上)"
                name="password"
                min={6}
                disabled={userContext.userData !== null}
                className=" w-full"
              />
            </div>
          </CardContent>
          <Separator className="my-6" />
          <CardTitle>購物車內容</CardTitle>
          <CardContent className="flex flex-col gap-4 p-0 my-4">
            {cartData.cart.length < 0 ? (
              <p>購物車是空的</p>
            ) : !parseResult.success ? (
              <div>系統發生錯誤, 請通知管理員</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>操作</TableHead>
                    <TableHead>商品預覽</TableHead>
                    <TableHead>課程名稱</TableHead>
                    <TableHead className="text-right">價格</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* TODO: do skeleton her */}
                  {parseResult.data.courses.data.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <button
                          onClick={() => cartData.removeFromCart(course.id)}
                        >
                          <X className="text-gray-100" />
                        </button>
                      </TableCell>
                      <TableCell>
                        <Image
                          width={100}
                          height={100}
                          src={course.attributes.image.data.attributes.url}
                          alt={course.attributes.title}
                        />
                      </TableCell>
                      <TableCell>{course.attributes.title}</TableCell>
                      <TableCell className="text-right">
                        NT$ {course.attributes.price.toLocaleString()}元
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>總金額</TableCell>
                    <TableCell className="text-right">
                      NT$
                      {parseResult.data.courses.data.reduce(
                        (acc, course) => acc + course.attributes.price,
                        0
                      )}
                      元
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            )}
          </CardContent>
          <Separator className="mb-4" />
          <CardFooter className="flex-col">
            <Button type="submit" className="text-lg font-semibold w-full">
              下單購買
            </Button>
            <p className=" text-gray-400 text-center">
              您的個人資訊將會被用於處理您的訂單，以及支持您在整個網站上的體驗，以及其他在我們的
              <Link className="text-blue-500 hover:underline" href="/terms">
                使用條款
              </Link>
              中描述的用途。
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
