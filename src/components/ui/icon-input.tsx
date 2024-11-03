import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

type IconInputProps = {
  icon?: React.ReactNode;
  containerClassName?: string;
};

export default function IconInput({
  className,
  containerClassName,
  icon = <Search className="h-4 w-4" />,
  ...props
}: IconInputProps & React.HTMLProps<HTMLInputElement>) {
  return (
    <div className={cn("relative", containerClassName)}>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <Input className={cn("pl-10", className)} {...props} />
    </div>
  );
}
