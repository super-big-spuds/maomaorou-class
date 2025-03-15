"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { gql } from "@/__generated__";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useUser } from "@/provider/user-provider";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "請輸入正確的電子信箱格式",
  }),
  password: z.string().min(6),
});

const LOGIN_MUTATION = gql(`
mutation login($email: String!, $password: String!) {
  login(input: {
    identifier: $email,
    password: $password,
  }) {
    jwt
  }
} 
`);

export default function LoginPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [sendLoginMutation, { error, loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: async (data) => {
      form.reset();
      const token = data.login.jwt;
      if (typeof token === "string") {
        userContext.handleLogin(token);
        router.push("/my-courses");
      }
    },
    onError: (error) => {
      toast({
        title: "登入失敗",
        description: error.message,
      });
    },
  });
  const userContext = useUser();
  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    sendLoginMutation({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
  }

  function submitMessageTransformer(message: string) {
    if (message === "Invalid identifier or password") {
      return "帳號或密碼錯誤";
    }
    return message;
  }

  return (
    <div className="p-4 relative w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-16">
          {loading && (
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
              <Loader2 className="animate-spin" />
            </div>
          )}
          <Card
            className={`${loading ? "animate-pulse" : ""} mx-auto max-w-sm`}
          >
            <CardHeader className="space-y-1 shadow-4xl">
              <CardTitle className="text-2xl font-bold">登入</CardTitle>
              <CardDescription>請輸入您的帳號資訊</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>電子信箱</FormLabel>
                      <FormControl>
                        <Input placeholder="您的電子信箱" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        <p>密碼</p>
                        <Link
                          className="text-sm hover:underline"
                          href={"/missing-password"}
                        >
                          忘記密碼?
                        </Link>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="密碼" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <p className="text-red-400 w-full text-center">
                    {submitMessageTransformer(error.message)}
                  </p>
                )}
                <Button className="w-full" type="submit">
                  登入
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
