import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  return (
    <div className="bg-red-400/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-400">
      <ExclamationTriangleIcon className="size-4" />
      <p> {message}</p>
    </div>
  );
};
