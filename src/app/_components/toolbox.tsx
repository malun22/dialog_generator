"use client";

import { useDraggable } from "@dnd-kit/core";
import { Label } from "./ui/label";
import { CSS } from "@dnd-kit/utilities";

const ToolTypes = {
  Textbox: "Textbox",
  Input: "Input",
  Image: "Image",
  Button: "Button",
  RadioButton: "RadioButton",
  Checkbox: "Checkbox",
  DropDownList: "DropDownList",
  ListBox: "ListBox",
  ListView: "ListView",
  TabControl: "TabControl",
  TabPage: "TabPage",
  GroupBox: "GroupBox",
  MenuItem: "MenuItem",
} as const;

type ToolKeys = (typeof ToolTypes)[keyof typeof ToolTypes];

const Toolbox = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {
        // Loop through the ToolKeys
        Object.keys(ToolTypes).map((key) => {
          // Get the ToolType
          const toolType = ToolTypes[key as ToolKeys];
          // Return the Tool
          return <Tool key={key} toolType={toolType} />;
        })
      }
    </div>
  );
};

type ToolProps = {
  toolType: ToolKeys;
};

const Tool = (props: ToolProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.toolType,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
    opacity: transform ? 0.5 : undefined,
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Label
        htmlFor="card"
        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="mb-3 h-6 w-6"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
        {props.toolType}
      </Label>
    </button>
  );
};

export default Toolbox;
