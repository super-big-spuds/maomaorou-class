"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { gql } from "@/__generated__/gql";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { useUser } from "@/provider/user-provider";

const formSchema = z
  .object({
    newPassword: z.string().min(6, "至少 6 個字元"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "密碼不一致",
    path: ["confirmNewPassword"],
  });

const SEND_RESET_PASSWORD_MUTATION = gql(`
mutation resetPasswordWithCode($password: String!, $passwordConfirmation: String!, $code: String!) {
	resetPassword(password: $password, passwordConfirmation: $passwordConfirmation, code: $code) {
    user {
      username
    }
  }
}
`);

export default function MissingPasswordPage() {
  const { toast } = useToast();
  const { token } = useUser();
  const { code } = useParams<{ code: string }>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const [
    sendResetPasswordMutation,
    { loading: isSendUpdateUserProfileLoading },
  ] = useMutation(SEND_RESET_PASSWORD_MUTATION, {
    onCompleted: () => {
      form.reset();
      toast({
        description: "密碼重設成功, 請重新登入",
      });
    },
    onError: (error) => {
      toast({
        title: "密碼重設失敗, 請重新至遺失密碼頁面重新寄信",
        description: errorMessageTrasformer(error.message),
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (code === null) {
      toast({
        title: "重設密碼Code錯誤",
        description: "請重新至遺失密碼頁面重新寄信",
        variant: "destructive",
      });
      return;
    }

    sendResetPasswordMutation({
      variables: {
        password: values.newPassword,
        passwordConfirmation: values.confirmNewPassword,
        code: code,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  }

  function errorMessageTrasformer(message: string) {
    if (message === "Password not match") {
      return "輸入的原先密碼不正確";
    }
    return message;
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card
            className={`${
              isSendUpdateUserProfileLoading ? "animate-pulse" : ""
            } mx-auto max-w-sm relative`}
          >
            {isSendUpdateUserProfileLoading && (
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
                <Loader2 className="animate-spin" />
              </div>
            )}
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">重新設定密碼</CardTitle>
              <CardDescription>請輸入您的新密碼</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>新密碼</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="新密碼"
                          disabled={isSendUpdateUserProfileLoading}
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>確認新密碼</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="確認新密碼"
                          disabled={isSendUpdateUserProfileLoading}
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit">
                  儲存
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
