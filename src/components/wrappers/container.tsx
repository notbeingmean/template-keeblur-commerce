import { cn } from "@/lib/utils";
import React from "react";

type ContainerWrapperProps = {
  children: React.ReactNode;
};

function ContainerWrapper({
  children,
  className,
  ...props
}: ContainerWrapperProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className, "container")} {...props}>
      {children}
    </div>
  );
}

export default ContainerWrapper;
