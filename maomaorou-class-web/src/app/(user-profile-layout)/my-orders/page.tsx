"use client";

import { gql } from "@/__generated__";
import useToken from "@/hook/useToken";
import { useQuery } from "@apollo/client";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const { token } = useToken();
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
    <>
      {/* Loading skeleton */}
      {loading && <div>載入中...</div>}

      {/* OrderList block */}
      {!loading && !parseResult.success && <div>載入訂單失敗</div>}
      {!loading && parseResult.success && (
        <div className="grow">
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
            <TableBody>
              {parseResult.data.myOrders.map((order) => (
                <TableRow key={order.data.id}>
                  <TableCell className="font-medium">{order.data.id}</TableCell>
                  <TableCell>{order.data.attributes.createdAt}</TableCell>
                  <TableCell>{order.data.attributes.status}</TableCell>
                  <TableCell>
                    {order.data.attributes.totalPrice.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button>查看</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
