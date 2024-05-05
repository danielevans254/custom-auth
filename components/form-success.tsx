import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({
  message
}: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div>
      <div className="flex items-center space-x-2 bg-emerald-200 p-3">
        <CheckCircledIcon className="size-4 text-emerald-900" />
        <span className="text-emerald-900 text-sm">{message}</span>
      </div>
    </div>
  )
}