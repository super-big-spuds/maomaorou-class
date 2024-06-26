"use client";

import { gql } from "@/__generated__";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@apollo/client";
import { z } from "zod";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import useToken from "@/hook/useToken";

const QUERY = gql(`
  query GetOrderData($orderId: ID!) {
    myOrder(orderId: $orderId) {
      data {
        id
        attributes {
          status
          createdAt
          totalPrice
          order_courses {
            data {
              id
              attributes {
                expiredAt
                price
                course {
                  data {
                    attributes {
                      title
                      image {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                    }
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
  myOrder: z.object({
    data: z.object({
      id: z.string(),
      attributes: z.object({
        status: z.string(),
        createdAt: z.string().transform((v) => new Date(v)),
        totalPrice: z.number(),
        order_courses: z.object({
          data: z.array(
            z.object({
              id: z.string(),
              attributes: z.object({
                expiredAt: z.string(),
                price: z.number(),
                course: z.object({
                  data: z.object({
                    attributes: z.object({
                      title: z.string(),
                      image: z.object({
                        data: z.object({
                          attributes: z.object({
                            url: z.string(),
                          }),
                        }),
                      }),
                    }),
                  }),
                }),
              }),
            })
          ),
        }),
      }),
    }),
  }),
});

export default function OrderViewPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { token } = useToken();
  const { data, loading } = useQuery(QUERY, {
    skip: !token,
    variables: {
      orderId: params.orderId,
    },
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  const parseResult = schema.safeParse(data);

  return (
    <Card className="bg-gray-100 p-8">
      {loading ? (
        <Skeleton className="w-full h-12" />
      ) : !parseResult.success ? (
        <div className="text-xl font-bold">讀取內容發生錯誤</div>
      ) : (
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <CardTitle>訂單檢視</CardTitle>
              <CardDescription>
                訂單編號 #{parseResult.data.myOrder.data.id}
              </CardDescription>
            </div>

            <div className="text-sm">
              <strong>
                {parseResult.data.myOrder.data.attributes.createdAt
                  .toISOString()
                  .slice(0, 10)}
                下單
              </strong>
              <span>，目前狀態為 </span>
              <span className="text-yellow-500">
                {parseResult.data.myOrder.data.attributes.status}
              </span>
            </div>
          </div>
          <div className="py-4">
            <h3 className="text-xl font-semibold mb-2">訂單詳細資料</h3>
            <div className="flex">
              <Table className="grow">
                <TableHeader>
                  <TableRow>
                    <TableHead>商品照片</TableHead>
                    <TableHead>課程名稱</TableHead>
                    <TableHead className="text-right">價格</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parseResult.data.myOrder.data.attributes.order_courses.data.map(
                    (orderCourse) => (
                      <TableRow key={orderCourse.id}>
                        <TableCell>
                          <Image
                            width={100}
                            height={100}
                            src={
                              orderCourse.attributes.course.data.attributes
                                .image.data.attributes.url
                            }
                            alt={
                              orderCourse.attributes.course.data.attributes
                                .title
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {orderCourse.attributes.course.data.attributes.title}
                        </TableCell>
                        <TableCell className="text-right">
                          NT$ {orderCourse.attributes.price.toLocaleString()}元
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>總金額</TableCell>
                    <TableCell className="text-right">
                      NT$
                      {parseResult.data.myOrder.data.attributes.totalPrice.toLocaleString()}
                      元
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
