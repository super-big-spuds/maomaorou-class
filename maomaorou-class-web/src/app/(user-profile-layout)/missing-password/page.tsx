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

const formSchema = z.object({
  email: z.string().email({
    message: "請輸入正確的 Email 格式",
  }),
});

const SEND_USER_PASSWORD_EMAIL_MUTATION = gql(`
mutation sendForgetPasswordEmail($email: String!) {
	forgotPassword(email: $email) {
    ok
  }
}
`);

export default function MissingPasswordPage() {
  const { toast } = useToast();
  const { token } = useToken();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const [
    sendForgetPasswordEmailMutation,
    { loading: isSendUpdateUserProfileLoading },
  ] = useMutation(SEND_USER_PASSWORD_EMAIL_MUTATION, {
    onCompleted: () => {
      form.reset();
      toast({
        description: "信件已發送成功, 請至信箱確認內容",
      });
    },
    onError: (error) => {
      toast({
        title: "信件發送失敗, 請確認信箱是否正確",
        description: errorMessageTrasformer(error.message),
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    sendForgetPasswordEmailMutation({
      variables: {
        email: values.email,
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
              <CardTitle className="text-2xl font-bold">重新找回密碼</CardTitle>
              <CardDescription>
                請重新輸入您的信箱以確認身份, 我們將會寄送密碼重設信給您
              </CardDescription>
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
                        <Input
                          placeholder="電子信箱"
                          disabled={isSendUpdateUserProfileLoading}
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
