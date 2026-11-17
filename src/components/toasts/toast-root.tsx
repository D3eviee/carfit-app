"use client";
import { useToastStore } from "@/lib/store";
import { cn } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";

export const ToastRoot = () => {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  return (
    <div className="fixed bottom-6 right-6 space-y-3 z-[9999]">
      {/* <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2 pointer-events-none"> */}
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "pointer-events-auto max-w-[90vw] rounded-2xl px-4 py-1 inset-shadow-glass text-[13px] tracking-tight font-semibold text-center",
              toast.type === "success" && "bg-[#52B66E] text-white",
              toast.type === "error" && "bg-[#FF453A] text-white",
              toast.type === "warning" && "bg-yellow-500",
              toast.type === "info" && "bg-blue-500 text-white"
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <span>{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} aria-label="Close">✕</button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}