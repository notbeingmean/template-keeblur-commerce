import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export default function IconInput({
  className,
  icon = <Search className="h-4 w-4" />,
  ...props
}: IconInputProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <Input className={cn("pl-10", className)} {...props} />
    </div>
  );
}
