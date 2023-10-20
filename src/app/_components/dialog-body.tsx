"use client";

import {
  type UniqueIdentifier,
  useDndMonitor,
  useDroppable,
} from "@dnd-kit/core";
import { useDialogState } from "../hooks/dialog-state";
import DialogElement, { type DialogElementProps } from "./dialog-element";
import { useMemo, useState } from "react";
import { cn } from "@/utils";

const DialogBody = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isOverId, setIsOverId] = useState<UniqueIdentifier | null>(null);
  const dialogState = useDialogState((state) => ({ elements: state.elements }));

  const rowColElements: DialogElementProps[][][] = useMemo(() => {
    // Get the max y and max x
    const maxY = Math.max(...dialogState.elements.map((element) => element.y));
    const maxX = Math.max(
      Math.max(...dialogState.elements.map((element) => element.x)),
      39,
    );
    // Create a 2D array of rows and columns
    const rowColElements = Array.from({ length: maxY + 1 }, () =>
      Array.from({ length: maxX + 1 }, () => [] as DialogElementProps[]),
    );
    // Loop through the elements
    dialogState.elements.forEach((element) => {
      // Get the row and column
      const row = rowColElements[element.y];
      if (!row) return;
      const col = row[element.x];
      if (row && col) {
        // Add the element to the specific row and column
        col.push(element);
      }
    });
    // Return the 2D array of rows and columns
    return rowColElements;
  }, [dialogState.elements]);

  useDndMonitor({
    onDragStart() {
      setIsDragging(true);
    },
    onDragOver(event) {
      // Tell column, that elemt is above
      setIsOverId(event.over?.id ?? null);
    },
    onDragEnd() {
      setIsDragging(false);
      setIsOverId(null);
    },
    onDragCancel() {
      setIsDragging(false);
      setIsOverId(null);
    },
  });

  return (
    <div className="flex h-fit w-full flex-col gap-[6px]">
      {rowColElements.map((element, rowIndex) => {
        return (
          <div
            className={cn("flex h-6 flex-row justify-start gap-0", {
              "bg-[#d6d6d6]": isDragging,
            })}
            key={rowIndex}
          >
            {element.map((element, colIndex) => {
              const id = `${colIndex}x${rowIndex}`;
              return (
                <Column
                  element={element}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  id={id}
                  key={colIndex}
                  isOver={isOverId === id}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

type ColumnProps = {
  element: DialogElementProps[];
  colIndex: number;
  rowIndex: number;
  isOver: boolean;
  id: string;
};

const Column = ({ colIndex, element, isOver, id }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn({
        "bg-lime-400": isOver,
      })}
      key={colIndex}
      style={{ width: 6.85 }}
    >
      {element.map(() => {
        return <DialogElement key={id} />;
      })}
    </div>
  );
};

export default DialogBody;
