import { Loader2 } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";

interface ButtonLoadingProps extends ButtonProps {
  isLoading: boolean;
}

export function ButtonLoading({ isLoading, ...props }: ButtonLoadingProps) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        props.children
      )}
    </Button>
  );
}
