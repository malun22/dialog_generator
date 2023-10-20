"use client";

import { Checkbox } from "@/app/_components/ui/checkbox";
import * as React from "react";
import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";

type CheckboxWithTextProps = {
  id: string;
  label: string;
  description?: string;
};

const CheckboxWithText = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
    CheckboxWithTextProps
>(({ id, label, description, ...props }, ref) => (
  <div className="items-top flex space-x-2">
    <Checkbox {...props} ref={ref} id={id} />
    <div className="grid gap-1.5 leading-none">
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  </div>
));

CheckboxWithText.displayName = "CheckboxWithText";

export { CheckboxWithText };
