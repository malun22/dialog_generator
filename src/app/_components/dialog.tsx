"use client";

import Image from "next/image";
import { useDialogState } from "../hooks/dialog-state";
import DialogBody from "./dialog-body";

const MIN_WIDTH = 39;
const FACTOR = 6.85;

const applyFactor = (value: number) => {
  return value * FACTOR;
};

const Dialog = () => {
  const dialogState = useDialogState();

  const minWidth = applyFactor(MIN_WIDTH) + 17 * 2 + 1 * 2 - 0.4 + FACTOR;
  const width = applyFactor(dialogState.width) + 17 * 2 + 1 * 2 - 0.4 + FACTOR;

  return (
    <div
      className={"h-fit overflow-hidden rounded-lg border border-dark text-sm"}
      style={{ width: `${width}px`, minWidth: `${minWidth}px` }}
    >
      <div className="flex h-[31px] w-full items-center justify-between bg-navbar px-2">
        <div className="flex w-fit flex-row items-center justify-start gap-[10px] overflow-x-clip">
          <div className="relative h-[13px] w-[13px]">
            <Image
              alt="dialogIcon"
              src={"/dialogIcon.jpg"}
              sizes="100%"
              fill
              priority
            />
          </div>
          <span>{dialogState.name}</span>
        </div>
        <button className="hover:bg-navbar-hover">&#10006;</button>
      </div>
      <div className="flex w-full flex-col justify-start gap-4 px-[17px] py-[18px] text-xs">
        <DialogBody />
        {dialogState.showDefaultButtons && (
          <div className="flex flex-row justify-end gap-2">
            <button
              className="h-7 w-[88px] border border-navbar hover:bg-button-hover"
              type="button"
            >
              OK
            </button>
            <button
              className="h-7 w-[88px] border border-navbar hover:bg-button-hover"
              type="button"
            >
              Cancel
            </button>
            <button
              className="h-7 w-[88px] border border-navbar hover:bg-button-hover"
              type="button"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialog;
