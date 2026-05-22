"use client";

import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      richColors
      closeButton
      toastOptions={{
        style: {
          borderRadius: 14
        }
      }}
    />
  );
}

export const toast = {
  success: (m: string) => sonnerToast.success(m),
  error: (m: string) => sonnerToast.error(m),
  message: (m: string) => sonnerToast(m)
};

