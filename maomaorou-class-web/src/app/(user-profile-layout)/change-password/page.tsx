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
import useToken from "@/hook/useToken";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z
  .object({
    password: z.string().min(6, "至少 6 個字元"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "密碼不一致",
    path: ["confirmPassword"],
  });

const UPDATE_USER_PASSWORD_MUTATION = gql(`
mutation updateUserPasswordData($userProfile: UpdateSelfUserProfileInput) {
  UpdateSelfUserProfile(userProfile: $userProfile) {
    data {
      id
    }
  }
}
`);

type IFormMessage = {
  status: "pending" | "success" | "error";
  message: string;
};

export default function ChangePasswordPage() {
  const { toast } = useToast();
  const { token } = useToken();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [
    sendUpdateUserProfileMutation,
    { loading: isSendUpdateUserProfileLoading },
  ] = useMutation(UPDATE_USER_PASSWORD_MUTATION, {
    onCompleted: () => {
      form.reset();
      toast({
        description: "密碼已重設完畢",
      });
    },
    onError: (error) => {
      toast({
        title: "重設密碼發生錯誤",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    sendUpdateUserProfileMutation({
      variables: {
        userProfile: {
          password: values.password,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
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
              <CardDescription>
                請重新輸入您的密碼以確認身份, 並設定新的密碼
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>原先密碼</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="原先密碼"
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>確認密碼</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="確認密碼"
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
