import { MdOutlineErrorOutline } from "react-icons/md";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import BackButton from "./back-button";

interface ErrorMessageCardProps {
  errorMessage: string;
}

const ErrorMessageCard: React.FC<ErrorMessageCardProps> = ({
  errorMessage,
}) => {
  // TODO: Style the error message card
  return (
    <Card className="flex flex-col items-center h-[550px] w-[550px] shadow-lg rounded-xl py-12">
      <h1 className="font-semibold text-2xl">Something went wrong</h1>
      <CardHeader className="p-2 rounded-t-xl">
        <div className="flex flex-col items-center">
          <MdOutlineErrorOutline
            className="w-20 h-20 mb-2"
          />
        </div>
        <h1 className="pb-4">{errorMessage}</h1>
      </CardHeader>
      <CardFooter className="p-2 rounded-b-xl">
        <div className="flex space-x-8">
          <BackButton label="Back to login" href="/login" />
          <BackButton label="Back to home" href="/" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ErrorMessageCard;
