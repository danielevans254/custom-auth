import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({
  message
}: FormErrorProps) => {
  if (!message) return null;
  return (
    <div>
      <div className="flex items-center space-x-2 bg-red-200/70 p-3">
        <ExclamationTriangleIcon className="size-4 text-red-600" />
        <span className="text-red-600 text-sm">{message}</span>
      </div>
    </div>
  )
}