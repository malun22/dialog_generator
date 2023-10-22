"use client";

import { create } from "zustand";
import type { BlockType } from "../models/element";

type DialogState = {
  name: string;
  width: number;
  height: number;
  showDefaultButtons: boolean;
  setShowDefaultButtons: (to: boolean) => void;
  setName: (to: string) => void;
  elements: BlockType[];
  addElement: (to: BlockType) => void;
  removeElement: (to: BlockType) => void;
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
      type: "Textbox",
    },
    {
      x: 4,
      y: 1,
      type: "Button",
    },
    {
      x: 4,
      y: 2,
      type: "Input",
    },
  ],
  addElement: (to) => set((state) => ({ elements: [...state.elements, to] })),
  removeElement: (to) =>
    set((state) => ({
      elements: state.elements.filter((el) => el !== to),
    })),
}));
