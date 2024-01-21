'use client'
import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from "@/actions/login"
import { useTransition } from "react"
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
  FormField,

} from "@/components/ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-sucess"
import { Separator } from "@radix-ui/react-separator"
export const LoginForm = () => {

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
    login(values)
  }

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // FIXME: Form errors not showing

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">

            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="john.doe@example.com"
                        type="email"
                      />
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
                      <Input
                        {...field}
                        placeholder="********"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          </div>
          <FormError message={""} />
          <FormSuccess message={""} />
          <Button type="submit" className="w-full bg-indigo-800/90 shadow-xl hover:bg-indigo-900">Login</Button>
          <div className="flex flex-col items-center justify-center pt-0">
            <Separator orientation="horizontal" className="absolute w-80 border-t-2" />
            <span className="text-gray-600 px-6 z-10 bg-white">OR</span>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}
