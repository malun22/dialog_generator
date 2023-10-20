"use client";

export type DialogElementProps = {
  x: number;
  y: number;
};

const DialogElement = (props: DialogElementProps) => {
  return (
    <div className="relative flex h-full w-full items-center overflow-visible">
      <p className="absolute">Text</p>
    </div>
  );
};

export default DialogElement;
