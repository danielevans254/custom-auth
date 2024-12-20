'use client'
import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import * as z from "zod"
import { RegisterSchema } from "@/schemas"
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react"
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
import Loader from "./loader"
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

  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [clearForm, setClearForm] = useState(false)

  const handleSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = await register(values);
      setError(data?.error);
      setSuccess(data?.success);
      setClearForm(true);
    } catch (error) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (clearForm) {
    form.reset();
    setClearForm(false);
  }

  return (

    <CardWrapper
      headerLabel="Create an Account"
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
                        className="border border-gray-700"
                        disabled={isLoading}
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
                        className="border border-gray-700"
                        disabled={isLoading}
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
                        className="border border-gray-700"
                        disabled={isLoading}
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
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isLoading}
            type="submit"
            className={`w-full bg-indigo-800/90 shadow-xl hover:bg-indigo-900 ${isLoading ? "cursor-not-allowed	" : ""
              }`}
          >
            {isLoading ? (
              <Loader />
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default RegisterForm;