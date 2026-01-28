export default function KeyboardHints() {
  return (
    <div className="px-4 py-3 border-t border-purple-500/20 bg-purple-500/5">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-gray-800 rounded border border-gray-700">
              ↑
            </kbd>
            <kbd className="px-2 py-1 bg-gray-800 rounded border border-gray-700">
              ↓
            </kbd>
            <span className="ml-1">Navigate</span>
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-gray-800 rounded border border-gray-700">
              Enter
            </kbd>
            <span className="ml-1">Select</span>
          </span>
        </div>
        <span className="flex items-center gap-1">
          <kbd className="px-2 py-1 bg-gray-800 rounded border border-gray-700">
            Esc
          </kbd>
          <span className="ml-1">Close</span>
        </span>
      </div>
    </div>
  );
}
