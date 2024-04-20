"use client";

import { gql } from "@/__generated__";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useToken from "@/hook/useToken";
import { cn, getPaymentUrl } from "@/lib/utils";
import { useCart } from "@/provider/cart-provider";
import { useUser } from "@/provider/user-provider";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { FormEventHandler } from "react";
import { z } from "zod";
import { CircleX } from "lucide-react";

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
  const [sendRegisterUserMutation, { data: registerData }] =
    useMutation(REGISTER_MUTATION);
  const [sendSubmitOrderMutation, { data: paymentData }] = useMutation(
    SUBMIT_ORDER_MUTATION
  );
  const userContext = useUser();

  const { token, setToken } = useToken();

  const parseResult = schema.safeParse(latestCartData);

  if (!cartData.cart.length) {
    return <div>Cart is empty</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!parseResult.success) {
    return <div>Failed to load data</div>;
  }

  const { courses } = parseResult.data;

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

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
        courseIds: courses.data.map((course) => course.id),
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
    <div className=" w-full h-full ">
      <form
        onSubmit={onSubmit}
        className=" flex flex-wrap  items-center justify-center w-full h-full gap-4 mt-12"
      >
        <div className=" inline-flex flex-col w-1/2 gap-4 min-w-96">
          <h1 className=" font-semibold text-4xl">結帳</h1>
          <div className=" ml-5 inline-flex flex-col gap-4 min-w-96">
            {userContext.userData !== null && (
              <p className="text-orange-600">
                以登入, 購買資訊將自動綁定到登入會員
              </p>
            )}
            {/* 已註冊時不用填寫會員資料 */}
            <p className=" font-semibold text-2xl mt-10">帳單資訊</p>
            <p>姓名</p>
            <Input
              required
              placeholder="輸入本名"
              name="name"
              disabled={userContext.userData !== null}
              className=" w-1/3"
            />
            <p>電子郵件(作為系統帳號)</p>
            <Input
              required
              placeholder="example@gmail.com"
              name="email"
              disabled={userContext.userData !== null}
            />
            <p>密碼</p>
            <Input
              required
              placeholder="密碼(至少6碼以上)"
              name="password"
              min={6}
              disabled={userContext.userData !== null}
            />
          </div>
        </div>
        <div className=" inline-flex flex-col min-w-96 max-w-lg w-2/3 justify-center gap-4 my-2">
          <p>購物車內容</p>
          <table className=" table-auto border p-2 rounded">
            <thead>
              <tr className=" border">
                <th>操作</th>
                <th>商品預覽</th>
                <th>課程名稱</th>
                <th>小計</th>
              </tr>
            </thead>
            <tbody>
              {courses.data.map((course) => (
                <tr key={course.id} className=" border p-5 m-5">
                  <td className=" align-middle text-center">
                    <button
                      onClick={() => cartData.removeFromCart(course.id)}
                      type="button"
                    >
                      <CircleX className="h-5 w-5" />
                    </button>
                  </td>
                  <td className=" align-middle pl-10 ">
                    <Image
                      width={100}
                      height={100}
                      src={course.attributes.image.data.attributes.url}
                      alt={course.attributes.title}
                    />
                  </td>
                  <td className=" align-middle text-center">
                    {course.attributes.title}
                  </td>
                  <td className=" align-middle text-center">
                    {course.attributes.price}元
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            總金額：
            {courses.data.reduce(
              (acc, course) => acc + course.attributes.price,
              0
            )}
            元
          </p>
          {/* TODO 藍星金流CART*/}
          <div>
            <input type="radio" name="newstoemail" id="" />
            &nbsp;
            <label htmlFor="newstoemail" className=" text-lg font-semibold">
              藍新金流
            </label>
          </div>
          <div>
            <input type="checkbox" name="newstoemail" id="" />
            &nbsp;
            <label htmlFor="newstoemail" className=" text-lg font-semibold">
              我想收到包含折扣碼、優惠活動等電子報
            </label>
          </div>
          <div>
            <input type="checkbox" name="rules" id="" />
            &nbsp;
            <label htmlFor="rules" className=" text-lg font-semibold">
              我已閱讀並同意網站的服務條款與條件
            </label>
          </div>
          <Button
            type="submit"
            className=" bg-orange-500 text-lg font-semibold w-1/2 mt-1 sm:w-1/3 "
          >
            下單購買
          </Button>
          <p className=" text-gray-400">
            您的個人資訊將會被用於處理您的訂單，以及支持您在整個網站上的體驗，以及其他在我們的隱私政策中描述的用途。
          </p>
        </div>
      </form>
    </div>
  );
}
