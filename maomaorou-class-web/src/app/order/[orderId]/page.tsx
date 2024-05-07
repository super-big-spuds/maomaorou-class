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
import { useMutation, useQuery } from "@apollo/client";
import { z } from "zod";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/provider/user-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

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

const ConfirmPaymentMutation = gql(`
  mutation ConfirmPayment($orderId: ID!) {
    userDoneHandlePayment(orderId: $orderId) {
      data {
        id
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
  const { toast } = useToast();
  const { token } = useUser();
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
  const [
    sendConfirmPaymentRequest,
    { loading: isSendConfirmPaymentRequestLoading },
  ] = useMutation(ConfirmPaymentMutation);

  const parseResult = schema.safeParse(data);

  const onSubmitConfirmPayment = async () => {
    toast({
      title: "已送出付款確認",
      description: "請等待管理員確認付款",
    });

    await sendConfirmPaymentRequest({
      variables: {
        orderId: params.orderId,
      },
      context: {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
    });
  };

  return (
    <Card className="bg-gray-100 p-8">
      {loading || !token ? (
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

            <div className="flex flex-col justify-end">
              {parseResult.data.myOrder.data.attributes.status == "pending" && (
                <AlertDialog>
                  <AlertDialogTrigger
                    className={cn(
                      buttonVariants(),
                      "text-lg font-semibold w-full"
                    )}
                  >
                    我要付款/我已完成付款
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>完成匯款</AlertDialogTitle>
                      <AlertDialogDescription>
                        <p>
                          請匯款至以下帳戶並
                          <span className="text-red-600">備註訂單編號</span>
                          ，完成後請按送出
                        </p>
                        <p>銀行編號：012</p>
                        <p>帳戶編號：82210000081322</p>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction onClick={onSubmitConfirmPayment}>
                        我已完成匯款
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
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
