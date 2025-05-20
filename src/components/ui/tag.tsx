
import React from "react";
import { cn } from "@/lib/utils";

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-md px-2 py-1 text-sm font-medium",
          size === "sm" && "px-1.5 py-0.5 text-xs",
          size === "lg" && "px-3 py-1.5 text-base",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Tag.displayName = "Tag";

export { Tag };
