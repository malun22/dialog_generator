"use client";

import {
  type UniqueIdentifier,
  useDndMonitor,
  useDroppable,
  type DragEndEvent,
  DndContext,
} from "@dnd-kit/core";
import { useDialogState } from "../hooks/dialog-state";
import DialogElement from "./dialog-element";
import { useMemo, useState } from "react";
import { cn } from "@/utils";
import {
  BlockTypes,
  TextBox,
  PositionedElement,
  Input,
  UIElement,
} from "../models/element";

const DialogBody = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isOverId, setIsOverId] = useState<UniqueIdentifier | null>(null);
  const dialogState = useDialogState((state) => ({
    elements: state.elements,
    addElement: state.addElement,
    setSelectedElement: state.setSelectedElement,
    updateElement: state.updateElement,
    height: state.height,
    width: state.width,
  }));
  const [maxRow, setMaxRow] = useState(0);
  const [maxCol, setMaxCol] = useState(39);

  const positionedElements: PositionedElement[][][] = useMemo(() => {
    // Filter out elements, which have no positioning property
    const filteredElements = dialogState.elements.filter(
      (element): element is PositionedElement => {
        return (
          (element as PositionedElement).x !== undefined &&
          (element as PositionedElement).y !== undefined
        );
      },
    );

    // Get the max y and max x
    const maxY = Math.max(
      Math.max(...filteredElements.map((element) => element.y), maxRow),
    );
    const maxX = Math.max(
      Math.max(...filteredElements.map((element) => element.x)),
      maxCol,
    );

    console.log(maxY, maxX);

    // Set the max row and max col
    setMaxRow(maxY);
    setMaxCol(maxX);

    // Create a 2D array of rows and columns
    const rowColElements = Array.from({ length: maxY + 1 }, () =>
      Array.from({ length: maxX + 1 }, () => [] as PositionedElement[]),
    );
    // Loop through the elements
    filteredElements.forEach((element) => {
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
      dialogState.setSelectedElement(null);
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
    const active = event.active;
    const activeId = active.id as string;

    if (!id || !activeId) {
      return;
    }

    // Get the x and y coordinates from the id. The id is in the style of "1x13"
    const [x, y] = id.split("x").map((coord) => parseInt(coord));

    if (x === undefined || y === undefined) {
      return;
    }

    // Check if event.active.id is a BlockTypeKeys
    if (!Object.keys(BlockTypes).includes(activeId)) {
      // Element has been moved
      const element = active.data.current?.element as PositionedElement;
      element.x = x;
      element.y = y;
      dialogState.updateElement(element);
    }

    // Create the element
    let element: UIElement | null;
    switch (activeId) {
      case "Textbox":
        element = new TextBox("", x, y, "Enter text", true);
        break;
      case "Input":
        element = new Input("", x, y, 20, "callback", true, "", false);
        break;
      default:
        element = null;
        break;
    }

    if (element === null) {
      return;
    }
    dialogState.addElement(element);
    dialogState.setSelectedElement(element);
  };

  return (
    <div className="flex h-fit w-full flex-col gap-[6px]">
      {Array.from(Array(maxRow + 1), (_, rowIndex) => {
        return (
          <div
            className={cn("flex h-6 flex-row justify-start gap-0 text-[9px]", {
              "border border-dashed border-primary bg-[#d6d6d6]": isDragging,
            })}
            key={rowIndex}
          >
            {Array.from(Array(maxCol + 1), (_, colIndex) => {
              const id = `${colIndex}x${rowIndex}`;
              return (
                <Column
                  elements={positionedElements[rowIndex]?.[colIndex]}
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
      {(true || isDragging) && (
        <div
          className="h-1 w-full bg-[#d6d6d6]"
          id="add-row-indicator"
          onMouseOver={() => {
            console.log("enter");
            setMaxRow(maxRow + 1);
          }}
        ></div>
      )}
    </div>
  );
};

type ColumnProps = {
  elements: PositionedElement[] | undefined;
  colIndex: number;
  rowIndex: number;
  isOver: boolean;
  id: string;
};

const Column = ({ colIndex, elements, isOver, id }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn("relative h-full", {
        "bg-lime-400": isOver,
      })}
      key={colIndex}
      style={{ width: 6.85 }}
    >
      {elements?.map((element) => {
        return <DialogElement key={id} element={element} />;
      })}
    </div>
  );
};

export default DialogBody;
