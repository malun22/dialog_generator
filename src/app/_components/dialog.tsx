"use client";

import Image from "next/image";
import { useState } from "react";

const MIN_WIDTH = 308;

const Dialog = () => {
  const [maxWidth, setMaxWidth] = useState(MIN_WIDTH);
  const [maxHeight, setMaxHeight] = useState(0);

  return (
    <div
      className={
        "border-dark h-fit overflow-hidden rounded-lg border text-sm font-light"
      }
      style={{ width: `${maxWidth}px`, minWidth: `${MIN_WIDTH}px` }}
    >
      <div className="bg-navbar flex h-[31px] w-full items-center justify-between px-2">
        <div className="flex w-fit flex-row items-center justify-start gap-[10px]">
          <div className="relative h-[13px] w-[13px]">
            <Image
              alt="dialogIcon"
              src={"/dialogIcon.jpg"}
              sizes="100%"
              fill
              priority
            />
          </div>
          <span>Dialog</span>
        </div>
        <button className="hover:bg-navbar-hover">&#10006;</button>
      </div>
    </div>
  );
};

export default Dialog;
