"use client";

import { gql } from "@/__generated__";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCart } from "@/provider/cart-provider";
import { useUser } from "@/provider/user-provider";
import { useMutation, useQuery } from "@apollo/client";
import { FormEventHandler, useRef } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import useCartWithUserCourseStatus from "@/hook/useCartWithUserCourseStatus";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";

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
          firstPrice
          renewPrice
          isFirstBuy
          buyOption {
            id
            name
            price
          }
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
mutation createOrderWithPayment($courses: [CreateOrderWithPaymentInput!]) {
  createOrderWithPayment(courses: $courses) {
    paymentUrl
    orderId
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
          firstPrice: z.number(),
          renewPrice: z.number(),
          isFirstBuy: z.boolean(),
          image: z.object({
            data: z.object({
              id: z.string(),
              attributes: z.object({
                url: z.string(),
              }),
            }),
          }),
          buyOption: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              price: z.number(),
            })
          ),
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
  const cartDataWithUserCourseStatus = useCartWithUserCourseStatus();
  const cartData = useCart();
  const { toast } = useToast();
  const userContext = useUser();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { data: latestCartData, loading: getPriceLoading } = useQuery(
    GET_LATEST_PRICE_QUERY,
    {
      variables: {
        courseIds: cartData.cart.map((item) => item.id),
      },
      context: {
        headers: {
          Authorization: `Bearer ${userContext.token}`,
        },
      },
    }
  );
  const [sendRegisterUserMutation, { loading: registerLoading }] =
    useMutation(REGISTER_MUTATION);
  const [sendSubmitOrderMutation, { loading: submitOrderLoading }] =
    useMutation(SUBMIT_ORDER_MUTATION);

  const parseResult = schema.safeParse(latestCartData);

  const loading = registerLoading || submitOrderLoading || getPriceLoading;

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!parseResult.success) {
      alert("載入購物車資料失敗, 請重新整理頁面後再試一次");
      return;
    }
    toast({
      title: "已送出訂單",
      description: "即將為您跳轉至付款頁面, 請稍後...",
    });

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries()) as IFormData;

    // Register a user
    const getToken = async () => {
      if (userContext.userData !== null && userContext.token !== null) {
        return userContext.token;
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
        userContext.handleLogin(registerResponse.data.register.jwt);
        return registerResponse.data.register.jwt;
      }
    };

    const createOrderToken = await getToken();

    if (createOrderToken === null) {
      alert("Failed to register user");
      return;
    }

    // Send Create Order To Server.
    const submitOrderResponse = await sendSubmitOrderMutation({
      variables: {
        courses: cartData.cart.map((item) => ({
          courseId: item.id,
          optionId: item.selectedOption?.id,
        })),
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

    // 因為藍新有問題 暫時不導向到付款連結 直接導向到訂單葉面
    //window.location.href = getPaymentUrl(
    //  submitOrderResponse.data.createOrderWithPayment.paymentUrl
    //);
    router.push(
      `/order/${submitOrderResponse.data.createOrderWithPayment.orderId}`
    );
  };

  const getCourseExpiryDate = (courseId: string) => {
    const course = cartDataWithUserCourseStatus.find(
      (courseStatus) => courseStatus.id === courseId
    );
    if (course === undefined) {
      return "未知";
    }

    const expiredAt = new Date(course.expiredAt);

    if (expiredAt.getFullYear() > 2100) {
      return "永久有效";
    }

    return `${expiredAt.getFullYear()}/${
      expiredAt.getMonth() + 1
    }/${expiredAt.getDate()}`;
  };

  const getCoursePriceInCart = (courseId: string) => {
    const courseStatus = cartDataWithUserCourseStatus.find(
      (courseStatus) => courseStatus.id === courseId
    );

    if (courseStatus === undefined) {
      return 0;
    }

    if (!parseResult.success) {
      return 0;
    }

    const course = parseResult.data.courses.data.find(
      (course) => course.id === courseId
    );

    if (course === undefined) {
      return 0;
    }

    if (course.attributes.isFirstBuy) {
      const inOption = course.attributes.buyOption.find(
        (option) => option.id === courseStatus.selectedOption?.id
      );

      return inOption?.price || course.attributes.firstPrice;
    } else {
      return course.attributes.renewPrice;
    }
  };

  return (
    <div className="w-full h-full relative">
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className={cn(
          "flex md:flex-row flex-col items-center justify-center w-full h-full gap-4 m-4",
          {
            "animate-pulse": loading,
          }
        )}
      >
        {loading && (
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2  ">
            <Loader2 className="animate-spin" />
          </div>
        )}
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
              <p>使用者名稱</p>
              <Input
                required
                placeholder="使用者名稱"
                name="name"
                disabled={userContext.userData !== null}
                className={cn("w-full", {
                  "bg-gray-200": userContext.userData !== null,
                })}
              />
            </div>
            <div>
              <p>電子郵件(作為系統帳號)</p>
              <Input
                required
                placeholder="example@gmail.com"
                name="email"
                disabled={userContext.userData !== null}
                className={cn("w-full", {
                  "bg-gray-200": userContext.userData !== null,
                })}
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
                className={cn("w-full", {
                  "bg-gray-200": userContext.userData !== null,
                })}
              />
            </div>
          </CardContent>
          <Separator className="my-6" />
          <CardTitle>購物車內容</CardTitle>
          <CardContent className="flex flex-col gap-4 p-0 my-4">
            {cartData.cart.length === 0 ? (
              <p className="text-center">購物車是空的</p>
            ) : getPriceLoading ? (
              <div>
                <Skeleton className="w-full h-24" />
              </div>
            ) : !parseResult.success ? (
              <div>系統發生錯誤, 請通知管理員</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>操作</TableHead>
                    <TableHead>商品預覽</TableHead>
                    <TableHead>課程名稱</TableHead>
                    <TableHead>課程有效至</TableHead>
                    <TableHead className="text-right">價格</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
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
                      <TableCell>
                        {course.attributes.title}{" "}
                        {cartDataWithUserCourseStatus.find(
                          (courseStatus) => courseStatus.id === course.id
                        )?.selectedOption &&
                          `- ${
                            cartDataWithUserCourseStatus.find(
                              (courseStatus) => courseStatus.id === course.id
                            )?.selectedOption?.name
                          }`}
                      </TableCell>
                      <TableCell>{getCourseExpiryDate(course.id)}</TableCell>
                      <TableCell className="text-right">
                        {course.attributes.isFirstBuy ? (
                          <p>
                            {getCoursePriceInCart(course.id).toLocaleString()}元
                          </p>
                        ) : (
                          <p>
                            續訂：NT${" "}
                            {course.attributes.renewPrice.toLocaleString()}元
                          </p>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>總金額</TableCell>
                    <TableCell className="text-right">
                      NT$
                      {parseResult.data.courses.data
                        .reduce(
                          (acc, course) =>
                            acc +
                            (course.attributes.isFirstBuy
                              ? getCoursePriceInCart(course.id)
                              : course.attributes.renewPrice),
                          0
                        )
                        .toLocaleString()}
                      元
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            )}
          </CardContent>
          <Separator className="mb-4" />
          <CardFooter className="flex-col">
            <AlertDialog>
              <AlertDialogTrigger
                className={cn(buttonVariants(), "text-lg font-semibold w-full")}
                disabled={cartData.cart.length === 0 || loading}
              >
                下單購買
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>確認下訂?</AlertDialogTitle>
                  <AlertDialogDescription>
                    送出訂單後，請依據提示進行匯款，並於匯款後聯絡我們，以完成訂單流程。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      formRef.current!.requestSubmit();
                    }}
                  >
                    確定送出
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
