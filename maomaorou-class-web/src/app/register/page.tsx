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
import useToken from "@/hook/useToken";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(3),
  email: z.string().min(6).email({
    message: "請輸入正確的電子信箱格式",
  }),
  password: z.string().min(6),
});

const REGISTER_MUTATION = gql(`
mutation register($username: String!, $email: String!, $password: String!) {
  register(input: {
    username: $username,
    email: $email,
    password: $password,
  }) {
    jwt
  }
} 
`);

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const [sendRegisterMutation, { error, loading }] =
    useMutation(REGISTER_MUTATION);
  const { setToken } = useToken();
  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    sendRegisterMutation({
      variables: {
        username: values.username,
        email: values.email,
        password: values.password,
      },
    })
      .then((response) => {
        const token = response.data?.register.jwt;
        if (typeof token === "string") {
          setToken(token);
          router.push("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function submitMessageTransformer(message: string) {
    if (message === "Invalid identifier or password") {
      return "帳號或密碼錯誤";
    }
    return message;
  }

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {loading && (
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
              <Loader2 className="animate-spin" />
            </div>
          )}
          <Card
            className={`${loading ? "animate-pulse" : ""} mx-auto max-w-sm`}
          >
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Register</CardTitle>
              <CardDescription>
                Enter your email and password to register to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="您的名字" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="密碼" {...field} />
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
                  Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
