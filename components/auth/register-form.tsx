'use client'
import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import * as z from "zod"
import { LoginSchema, RegisterSchema } from "@/schemas"
import { zodResolver } from '@hookform/resolvers/zod';

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
import { FormSuccess } from "../form-success"
import { register } from "@/actions/register"

interface RegisterFormProps {
  children: string,
  mode?: "modal" | "redirect";
  asChild?: boolean;
}
const RegisterForm = ({
  children,
  mode = "redirect",
  asChild,
}: RegisterFormProps) => {

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const handleSubmit = (values: z.infer<typeof RegisterSchema>) => {
    register(values)
    console.log(values)
  }

  return (
    <div>
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Already have an account?"
        backButtonHref="login"
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          type="text"
                        />
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
            <Button type="submit" className="w-full bg-indigo-800/90 shadow-xl hover:bg-indigo-900">Register</Button>
          </form>

        </Form>
        <div className="mt-4">
          <span className="text-sm font-medium text-gray-900">
            or continue with the following
          </span>
        </div>
      </CardWrapper>
    </div>
  );
}

export default RegisterForm;