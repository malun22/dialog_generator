import { create } from "zustand";
import { DialogElementProps } from "../_components/dialog-element";

type DialogState = {
  name: string;
  width: number;
  height: number;
  showDefaultButtons: boolean;
  setShowDefaultButtons: (to: boolean) => void;
  setName: (to: string) => void;
  elements: DialogElementProps[];
};

export const useDialogState = create<DialogState>((set) => ({
  name: "Dialog",
  width: 39,
  height: 1,
  showDefaultButtons: true,
  setShowDefaultButtons: (to) => set({ showDefaultButtons: to }),
  setName: (to) => set({ name: to }),
  elements: [
    {
      x: 20,
      y: 0,
    },
    {
      x: 4,
      y: 1,
    },
    {
      x: 4,
      y: 2,
    },
  ],
}));
