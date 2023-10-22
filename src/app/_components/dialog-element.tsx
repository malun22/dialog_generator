"use client";

import type { BlockType } from "../models/element";

export type DialogElementProps = {
  element: BlockType;
};

const DialogElement = ({ element }: DialogElementProps) => {
  return (
    <div className="relative flex h-full w-full items-center overflow-visible">
      {element.type === "Textbox" && <p className="absolute">{element.type}</p>}
    </div>
  );
};

export default DialogElement;
