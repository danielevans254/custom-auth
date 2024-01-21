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
      <div className="flex items-center space-x-2 bg-red-100 p-3">
        <ExclamationTriangleIcon className="w-4 h-4 text-red-600" />
        <span className="text-red-600 text-sm">{message}</span>
      </div>
    </div>
  )
}