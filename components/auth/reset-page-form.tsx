'use client'
import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import * as z from "zod"
import { ResetPasswordSchema } from "@/schemas"
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPassword } from "@/actions/reset-password"
import { useState } from "react"
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
  FormField,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import Loader from "./loader"

// FIXME: I would rather want to use the error thrown from the callback on the form error message
export const ResetPageForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    await resetPassword(values)
    try {
      const data = await resetPassword(values);
      setError(data?.error);
      setSuccess(data?.success);
    } catch (error) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  // FIXME: Form errors not showing
  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/login"
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
              "Send reset link"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

