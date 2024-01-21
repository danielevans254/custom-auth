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
      <div className="flex items-center space-x-2 bg-green-100 p-3 ">
        <CheckCircledIcon className="w-4 h-4 text-emerald-600" />
        <span className="flex flex-col items-center justify-center text-emerald-600 text-sm">{message}</span>
      </div>
    </div>
  )
}