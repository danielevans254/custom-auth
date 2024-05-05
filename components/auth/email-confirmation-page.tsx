
'use client'

import { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { emailVerification } from "@/actions/email-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { RotatingLines } from 'react-loader-spinner'
import { useRouter } from 'next/navigation'

// TODO: Add conditionals to this
const EmailConfirmationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter()

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing token")
      return;
    }
    emailVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError("Something went wrong")
      })
  }, [token]);

  useEffect(() => {
    if (token) {
      onSubmit();
    }
  }, [token, onSubmit]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  // TODO: Add a resend link button
  return (
    <CardWrapper
      headerLabel="Confirming your email"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <div className="space-y-4 flex flex-col items-center justify-center">
        {success && (
          <p className="text-sm text-gray-900">
            Thank you for signing up for <span className="font-bold">{process.env.NEXT_PUBLIC_APP_NAME}</span>.<br /> We&apos;ll redirect you to the login page shortly.
          </p>
        )}
        {!success && !error && (
          <RotatingLines
            visible={true}
            height="48"
            width="48"
            color="#1f1f1f"
            strokeWidth="4"
            animationDuration="0.50"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
}

export default EmailConfirmationForm;