"use client";

import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

type LinkType = { name: string; url: string; isLast?: boolean }[];

type PageHeaderProps = {
  links: LinkType;
  title?: string;
};

function PageHeader({
  links,
  className,
  title,
  ...props
}: PageHeaderProps & React.HTMLProps<HTMLDivElement>) {
  const [initialLinks] = useState<LinkType>([{ name: "หน้าแรก", url: "/" }]);
  return (
    <div className={cn(className, "m-4")} {...props}>
      <Breadcrumb>
        <BreadcrumbList>
          {[
            [...initialLinks, ...links].map((link, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={link.url}>{link.name}</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className={link.isLast ? "hidden" : ""} />
              </React.Fragment>
            )),
          ]}
        </BreadcrumbList>
      </Breadcrumb>
      {title ? (
        <h1 className="text-2xl font-bold text-gray-900 text-center mt-8">
          {title}
        </h1>
      ) : null}
    </div>
  );
}

export default PageHeader;
