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
      <div className="flex items-center space-x-2 bg-green-100 px-1 py-3">
        <CheckCircledIcon className="w-4 h-4 text-emerald-600" />
        <span className="text-emerald-600 text-sm">{message}</span>
      </div>
    </div>
  )
}