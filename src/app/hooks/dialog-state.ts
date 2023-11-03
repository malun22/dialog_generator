"use client";

import { create } from "zustand";
import type { UIElement } from "../models/element";

type DialogState = {
  name: string;
  width: number;
  height: number;
  showDefaultButtons: boolean;
  setShowDefaultButtons: (to: boolean) => void;
  setName: (to: string) => void;
  elements: UIElement[];
  addElement: (to: UIElement) => void;
  removeElement: (to: UIElement) => void;
  selectedElement: UIElement | null;
  setSelectedElement: (to: UIElement | null) => void;
  updateElement: (to: UIElement) => void;
  isNameUnique: (name: string, id: string) => boolean;
};

export const useDialogState = create<DialogState>((set, get) => ({
  name: "Dialog",
  width: 39,
  height: 1,
  showDefaultButtons: true,
  setShowDefaultButtons: (to) => set({ showDefaultButtons: to }),
  setName: (to) => set({ name: to }),
  elements: [],
  addElement: (to) => set((state) => ({ elements: [...state.elements, to] })),
  removeElement: (to) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== to.id),
    })),
  selectedElement: null,
  setSelectedElement: (to) => set({ selectedElement: to }),
  updateElement: (to) => {
    set((state) => ({
      elements: state.elements.map((el) => (el.id === to.id ? to : el)),
    }));
  },
  isNameUnique: (name, id) => {
    const state = get();

    if (state.elements.find((el) => el.name === name && el.id !== id)) {
      return false;
    }

    return true;
  },
}));
