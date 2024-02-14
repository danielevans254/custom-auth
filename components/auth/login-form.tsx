'use client'
import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from "@/actions/login"
import { useState, useTransition } from "react"
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
import { CircularProgress } from "@mui/material";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = await login(values);
      setError(data?.error);
      setSuccess(data?.success);
    } catch (error) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

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
            className={`w-full bg-indigo-800/90 shadow-xl hover:bg-indigo-900 ${isLoading ? "cursor-no-drop" : ""
              }`}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Log in"
            )}
          </Button>
          <div className="flex flex-col items-center justify-center pt-0">
            <span className="text-sm font-medium text-gray-900">
              or continue with the following
            </span>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}

