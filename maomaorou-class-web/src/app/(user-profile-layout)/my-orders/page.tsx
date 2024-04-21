"use client";

import { gql } from "@/__generated__";
import { useQuery } from "@apollo/client";
import { z } from "zod";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/provider/user-provider";

const QUERY = gql(`
query getMyOrders {
  myOrders {
		data {
      id
      attributes {
        status
        createdAt
        totalPrice
      }
    }
  }
}
`);

const schema = z.object({
  myOrders: z.array(
    z.object({
      data: z.object({
        id: z.string(),
        attributes: z.object({
          status: z.string(),
          createdAt: z
            .string()
            .transform((v) => new Date(v).toISOString().slice(0, 10)),
          totalPrice: z.number(),
        }),
      }),
    })
  ),
});

export default function MyOrdersPage() {
  const { token } = useUser();
  const { data, loading } = useQuery(QUERY, {
    skip: !token,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const parseResult = schema.safeParse(data);

  return (
    <Card className="grow p-4">
      <CardTitle>我的訂單</CardTitle>
      <Separator className="my-2" />
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">訂單編號</TableHead>
              <TableHead>下訂日期</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead>金額</TableHead>
              <TableHead className="text-right">動作</TableHead>
            </TableRow>
          </TableHeader>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Skeleton className="w-full h-12" />
              </TableCell>
            </TableRow>
          ) : (
            <TableBody>
              {parseResult.success &&
                parseResult.data.myOrders.map((order) => (
                  <TableRow key={order.data.id}>
                    <TableCell className="font-medium">
                      {order.data.id}
                    </TableCell>
                    <TableCell>{order.data.attributes.createdAt}</TableCell>
                    <TableCell>{order.data.attributes.status}</TableCell>
                    <TableCell>
                      {order.data.attributes.totalPrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/order/${order.data.id}`}>查看</Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </CardContent>
    </Card>
  );
}
