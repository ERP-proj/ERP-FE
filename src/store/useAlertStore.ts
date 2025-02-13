"use client";

import { create } from "zustand";

interface AlertState {
  message: string | null;
  onConfirm?: () => void;
  showAlert: (message: string, onConfirm?: () => void) => void;
  closeAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  message: null,
  onConfirm: undefined,
  showAlert: (message, onConfirm) => set({ message, onConfirm }),
  closeAlert: () => set({ message: null, onConfirm: undefined }),
}));
