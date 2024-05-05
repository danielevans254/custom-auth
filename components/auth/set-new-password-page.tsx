
'use client'
import { useForm } from "react-hook-form"
import { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { emailVerification } from "@/actions/email-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import * as z from "zod"
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
import Loader from "./loader"
import Link from "next/link"
import { zodResolver } from '@hookform/resolvers/zod';
import { setNewPassword } from "@/actions/new-password"
import { SetNewPasswordSchema } from "@/schemas"


// TODO: Add conditionals to this
const SetNewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false);


  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (values: z.infer<typeof SetNewPasswordSchema>) => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = await setNewPassword(values, token);
      setError(data?.error);
      setSuccess(data?.success);
    } catch (error) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof SetNewPasswordSchema>>({
    resolver: zodResolver(SetNewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  // TODO: Add a resend link button
  return (
    <CardWrapper
      headerLabel="Set a new password"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <div className="space-y-4 flex flex-col items-center justify-center w-full">
        {success && (
          <p className="text-sm text-gray-900">
            Password updated successfully
          </p>
        )}
        <Form {...form} >
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 "
          >
            <div className="space-y-4">
              <>
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
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
                    </FormItem>
                  )}
                />
              </>
            </div>
            <Button
              disabled={isLoading}
              type="submit"
              className={`w-full bg-indigo-800/90 shadow-xl hover:bg-indigo-900 ${isLoading ? "cursor-not-allowed	" : ""
                }`}
            >
              {isLoading ? (
                <Loader />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
}

export default SetNewPasswordForm;