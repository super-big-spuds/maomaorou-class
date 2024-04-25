import { useCart } from "@/provider/cart-provider";
import { useUser } from "@/provider/user-provider";
import { useQuery } from "@apollo/client";
import { z } from "zod";
import { gql } from "@/__generated__/gql";

const query = gql(`
query getUserCoursesStatus($courseIds: [ID!]) {
  courses(filters: {
    id: {
      in: $courseIds
    }
  }) {
    data {
      attributes {
        withUserStatus {
          data {
            attributes {
              expiredAt
              course {
                data {
                  id
                }
              }
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
        attributes: z.object({
          withUserStatus: z.object({
            data: z.nullable(
              z.object({
                attributes: z.object({
                  expiredAt: z.string(),
                  course: z.object({
                    data: z.object({
                      id: z.string(),
                    }),
                  }),
                }),
              })
            ),
          }),
        }),
      })
    ),
  }),
});

export default function useCartWithUserCourseStatus() {
  const cartContext = useCart();
  const userContext = useUser();
  const { data: userCourseStatusData } = useQuery(query, {
    skip: !userContext.token,
    variables: {
      courseIds: cartContext.cart.map((item) => item.id),
    },
    context: {
      headers: {
        Authorization: `Bearer ${userContext?.token}`,
      },
    },
  });
  const parsedResult = schema.safeParse(userCourseStatusData);

  const cartDataWithUserCourseStatus = cartContext.cart.map((cartItem) => {
    if (parsedResult.success === false) {
      return {
        ...cartItem,
        isFirst: true,
        expiredAt: cartItem.expiredAt,
      };
    }

    const originalExpiredAt = parsedResult.data.courses.data.find((course) => {
      if (!course.attributes.withUserStatus.data) {
        return false;
      }
      return (
        course.attributes.withUserStatus.data.attributes.course.data.id ===
        cartItem.id
      );
    })?.attributes.withUserStatus.data?.attributes.expiredAt;

    const expiredDateAfterBuyed = originalExpiredAt
      ? new Date(
          new Date(originalExpiredAt).getTime() +
            cartItem.durationDay * 24 * 60 * 60 * 1000
        )
      : cartItem.expiredAt;

    return {
      ...cartItem,
      isFirst: originalExpiredAt === undefined,
      expiredAt: expiredDateAfterBuyed,
    };
  });

  return cartDataWithUserCourseStatus;
}
