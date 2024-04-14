"use client";

import { gql } from "@/__generated__";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/provider/cart-provider";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { FormEventHandler } from "react";
import { z } from "zod";

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

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries()) as IFormData;

    // Send Create Order To Server.
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Checkout Page</h1>

      <p>購物車內容</p>
      <ul>
        {courses.data.map((course) => (
          <li key={course.id}>
            <Image
              width={100}
              height={100}
              src={course.attributes.image.data.attributes.url}
              alt={course.attributes.title}
            />
            <p>{course.attributes.title}</p>
          </li>
        ))}
      </ul>

      <Input required placeholder="Name" name="name" />
      <Input required placeholder="Phone" name="phone" />
      <Input required placeholder="Email" name="email" />
      <Input required placeholder="Password" name="password" />

      <Button type="submit">前往結帳</Button>
    </form>
  );
}
