"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useUser } from "@/provider/user-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(3, "至少 3 個字元"),
  email: z.string().min(6, "至少 6 個字元"),
});

const UPDATE_PROFILE_MUTATION = gql(`
mutation updateProfileData($userProfile: UpdateSelfUserProfileInput) {
  UpdateSelfUserProfile(userProfile: $userProfile) {
    data {
      id
      attributes {
        username
        email
      }
    }
  }
}
`);

export default function AccountSettingPage() {
  const userContext = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });
  const [
    sendUpdateUserProfileMutation,
    { loading: isSendUpdateUserProfileLoading },
  ] = useMutation(UPDATE_PROFILE_MUTATION, {
    onCompleted: userContext.handleRefetch,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    sendUpdateUserProfileMutation({
      variables: {
        userProfile: values,
      },
      context: {
        headers: {
          Authorization: `Bearer ${userContext.token}`,
        },
      },
    });
  }

  useEffect(() => {
    if (!userContext.userData) return;
    form.setValue("username", userContext.userData.username);
    form.setValue("email", userContext.userData.email);
  }, [userContext.userData, form]);

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card
            className={`${
              userContext.isLoading || isSendUpdateUserProfileLoading
                ? "animate-pulse"
                : ""
            }relative`}
          >
            {isSendUpdateUserProfileLoading && (
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
                <Loader2 className="animate-spin" />
              </div>
            )}
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">帳號設定</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>使用者名稱</FormLabel>
                      {userContext.isLoading ? (
                        <area className="w-full h-10 animate-pulse bg-gray-200 block rounded" />
                      ) : (
                        <FormControl>
                          <Input
                            placeholder="您的使用者名稱"
                            disabled={isSendUpdateUserProfileLoading}
                            {...field}
                          />
                        </FormControl>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>電子信箱</FormLabel>
                      {userContext.isLoading ? (
                        <area className="w-full h-10 animate-pulse bg-gray-200 block rounded" />
                      ) : (
                        <FormControl>
                          <Input
                            placeholder="您的電子信箱"
                            disabled={isSendUpdateUserProfileLoading}
                            {...field}
                          />
                        </FormControl>
                      )}
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
