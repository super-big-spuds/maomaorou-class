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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [sendLoginMutation, { error }] = useMutation(LOGIN_MUTATION);
  const { setToken } = useToken();
  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    sendLoginMutation({
      variables: {
        email: values.email,
        password: values.password,
      },
    })
      .then((response) => {
        const token = response.data?.login.jwt;
        if (typeof token === "string") {
          setToken(token);
          router.push("/my-courses");
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
  }

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <CardDescription>
                Enter your email and password to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
