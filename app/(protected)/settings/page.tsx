'use client'
import { useTransition } from "react";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GearIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormMessage, FormLabel, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SettingsSchema } from "@/schemas";

const SettingsPage = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: ""
    }
  })

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values).then(() => {
        update();
      })
    })
  }
  // NOTE: This is an individual user's settings page, so it must be only accessible by the user the account or an admin
  return (
    <Card className="">
      <CardHeader>
        <div className="text-center items-center justify-center">
          <p className="text-2xl flex items-center">
            <GearIcon className="mr-2 size-6" />
            Settings Page
          </p>
        </div>
        <CardContent>
          <div className="flex items-center justify-between">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Daniel" {...field} />
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
                        <Input placeholder="johndoe@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isPending} type="submit">
                  Update info
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default SettingsPage;