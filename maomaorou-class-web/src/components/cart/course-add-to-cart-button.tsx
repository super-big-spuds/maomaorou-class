"use client";

import { useQuery } from "@apollo/client";
import { Button } from "../ui/button";
import { useCart } from "./../../provider/cart-provider";
import { useUser } from "@/provider/user-provider";
import { gql } from "@/__generated__";
import { z } from "zod";

type Props = {
  courseId: string;
  title: string;
  className?: string;
};

const query = gql(`
 query getIsUserFirstBuyAndPrice($courseId: ID!) {
    course(id: $courseId) {
      data {
        id
        attributes {
          isFirstBuy
          firstPrice
          renewPrice
          firstDurationDay
          renewDurationDay
        }
      }
    }
  }
`);

const schema = z.object({
  course: z.object({
    data: z.object({
      id: z.string(),
      attributes: z.object({
        isFirstBuy: z.boolean(),
        firstPrice: z.number(),
        renewPrice: z.number(),
        firstDurationDay: z.number(),
        renewDurationDay: z.number(),
      }),
    }),
  }),
});

export default function CourseAddToCartButton({
  className = "",
  ...props
}: Props) {
  const userContext = useUser();
  const useCartData = useCart();

  const { data } = useQuery(query, {
    skip: !userContext.token,
    variables: {
      courseId: props.courseId,
    },
    context: {
      headers: {
        authorization: `Bearer ${userContext.token}`,
      },
    },
  });

  const parsedResult = schema.safeParse(data);

  const getExpiredAt = (durationDay: number) => {
    const now = new Date();
    return new Date(now.setDate(now.getDate() + durationDay));
  };

  return (
    <Button
      className={className}
      disabled={!parsedResult.success}
      onClick={
        parsedResult.success
          ? () =>
              useCartData.addToCart({
                id: props.courseId,
                title: props.title,
                price: parsedResult.data.course.data.attributes.isFirstBuy
                  ? parsedResult.data.course.data.attributes.firstPrice
                  : parsedResult.data.course.data.attributes.renewPrice,
                expiredAt: getExpiredAt(
                  parsedResult.data.course.data.attributes.isFirstBuy
                    ? parsedResult.data.course.data.attributes.firstDurationDay
                    : parsedResult.data.course.data.attributes.renewDurationDay
                ),
                durationDay: parsedResult.data.course.data.attributes.isFirstBuy
                  ? parsedResult.data.course.data.attributes.firstDurationDay
                  : parsedResult.data.course.data.attributes.renewDurationDay,
              })
          : () => {}
      }
    >
      加入購物車
    </Button>
  );
}
