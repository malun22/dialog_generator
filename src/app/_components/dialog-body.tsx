"use client";

import {
  type UniqueIdentifier,
  useDndMonitor,
  useDroppable,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useDialogState } from "../hooks/dialog-state";
import DialogElement from "./dialog-element";
import { useMemo, useState } from "react";
import { cn } from "@/utils";
import {
  type BlockType,
  type BlockTypeKeys,
  BlockTypes,
} from "../models/element";

const DialogBody = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isOverId, setIsOverId] = useState<UniqueIdentifier | null>(null);
  const dialogState = useDialogState((state) => ({
    elements: state.elements,
    addElement: state.addElement,
  }));

  const rowColElements: BlockType[][][] = useMemo(() => {
    // Get the max y and max x
    const maxY = Math.max(...dialogState.elements.map((element) => element.y));
    const maxX = Math.max(
      Math.max(...dialogState.elements.map((element) => element.x)),
      39,
    );
    // Create a 2D array of rows and columns
    const rowColElements = Array.from({ length: maxY + 1 }, () =>
      Array.from({ length: maxX + 1 }, () => [] as BlockType[]),
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
    onDragEnd(event) {
      setIsDragging(false);
      setIsOverId(null);
      addElement(event);
    },
    onDragCancel() {
      setIsDragging(false);
      setIsOverId(null);
    },
  });

  const addElement = (event: DragEndEvent) => {
    const id = event.over?.id as string;

    if (!id) {
      return;
    }

    // Get the x and y coordinates from the id. The id is in the style of "1x13"
    const [x, y] = id.split("x").map((coord) => parseInt(coord));

    if (x === undefined || y === undefined) {
      return;
    }

    // Check if event.active.id is a BlockTypeKeys
    if (!Object.keys(BlockTypes).includes(event.active.id as string)) {
      return;
    }

    // Create the element
    dialogState.addElement({
      x,
      y,
      type: event.active.id as BlockTypeKeys,
    });
  };

  return (
    <div className="flex h-fit w-full flex-col gap-[6px]">
      {rowColElements.map((element, rowIndex) => {
        return (
          <div
            className={cn("flex h-6 flex-row justify-start gap-0", {
              "border border-dashed border-primary bg-[#d6d6d6]": isDragging,
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
  element: BlockType[];
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
      {element.map((element) => {
        return <DialogElement key={id} element={element} />;
      })}
    </div>
  );
};

export default DialogBody;
