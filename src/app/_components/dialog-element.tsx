"use client";

import { TextBox, type PositionedElement, Input } from "../models/element";
import { cn } from "@/utils";
import { useDialogState } from "../hooks/dialog-state";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { AiOutlineDrag } from "react-icons/ai";
import { useState } from "react";
import { applyFactor } from "./dialog";

export type DialogElementProps = {
  element: PositionedElement;
};

const DialogElement = ({ element }: DialogElementProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const dialogState = useDialogState((state) => ({
    selectedElement: state.selectedElement,
    setSelectedElement: state.setSelectedElement,
  }));

  const onClick = () => {
    if (element.id === dialogState.selectedElement?.id) {
      dialogState.setSelectedElement(null);
    } else {
      dialogState.setSelectedElement(element);
    }
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    data: { element },
  });

  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
    opacity: transform ? 0.5 : undefined,
  };

  return (
    <button
      className={cn(
        "absolute z-10 flex h-full w-full items-center overflow-visible",
      )}
      onClick={() => onClick()}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={cn("relative h-full w-fit", {
          "group before:absolute before:-inset-1 before:block before:border before:border-dashed before:border-primary before:bg-slate-100":
            dialogState.selectedElement?.id === element.id,
        })}
      >
        <div className="relative h-full w-fit">
          {element instanceof TextBox && <TextBoxUI element={element} />}
          {element instanceof Input && <InputUI element={element} />}
        </div>
        {isHovering && (
          <div
            className="absolute -right-2 -top-1 cursor-move"
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
          >
            <AiOutlineDrag />
          </div>
        )}
      </div>
    </button>
  );
};

type TextBoxUIProps = {
  element: TextBox;
};

const TextBoxUI = ({ element }: TextBoxUIProps) => {
  return (
    <div
      className={cn("flex h-full w-max items-center justify-start break-keep", {
        "opacity-50": !element.enable,
      })}
    >
      {element.caption}
    </div>
  );
};

type InputUIProps = {
  element: Input;
};

const InputUI = ({ element }: InputUIProps) => {
  return (
    <div
      className={cn("flex h-full w-max items-center justify-start break-keep", {
        "opacity-50": !element.enable,
      })}
    >
      <div
        className={"h-full border-b border-slate-600 bg-white"}
        style={{
          width: applyFactor(element.width) + 1,
        }}
      ></div>
    </div>
  );
};

export default DialogElement;
