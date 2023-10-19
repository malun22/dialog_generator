import { create } from "zustand";

type DialogState = {
  maxWidth: number;
  showDefaultButtons: boolean;
  // Takes a boolean return nothing
  setShowDefaultButtons: (to: boolean) => void;
};

export const useDialogState = create<DialogState>((set) => ({
  maxWidth: 500,
  showDefaultButtons: true,
  setShowDefaultButtons: (to) => set({ showDefaultButtons: to }),
}));
