import { ReactNode } from "react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function CommandPalette({
  isOpen,
  onClose,
  children,
}: CommandPaletteProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-linear-to-br from-gray-900 via-gray-900 to-purple-900/20 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="absolute inset-0 bg-linear-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 pointer-events-none" />

        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
