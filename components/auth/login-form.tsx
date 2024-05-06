'use client'
import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from "@/actions/login"
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
import Loader from "./loader"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"


// FIXME: I would rather want to use the error thrown from the callback on the form error message
export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const OAuthAccountNotLinkedErrorUrl = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email in use with different provider" : "";

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
      <Form {...form} >
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 "
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
                        className="w-full border border-gray-700"
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
                        className="w-full border border-gray-700"
                        disabled={isLoading}
                        {...field}
                        placeholder="********"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="flex justify-between items-center">
                      {/* TODO: Implement the remember me, this will just increase the session length till it expires default is already 30 days, i'll change it to 1 hour */}
                      {/* TODO: Add a state to check if the checkbox is ticked */}
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remember me ?
                        </label>
                      </div>
                      <Button variant="link" className="text-sm" size="sm" asChild>
                        <Link href="/reset-password">
                          Forgot password?
                        </Link>
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </>
          </div>
          <FormError message={error || OAuthAccountNotLinkedErrorUrl} />
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
              "Log in"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

