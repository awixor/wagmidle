import { MatchType, getMatchColor } from "@/utils/gameLogic";
import { ReactNode } from "react";

interface AttributeBoxProps {
  label: string;
  value: ReactNode;
  matchType: MatchType;
}

export default function AttributeBox({
  label,
  value,
  matchType,
}: AttributeBoxProps) {
  return (
    <div
      className={`px-3 py-2 rounded-lg border-2 text-center transition-all ${getMatchColor(
        matchType,
      )}`}
    >
      <div className="text-xs font-medium opacity-90">{label}</div>
      <div className="text-sm font-semibold flex items-center justify-center gap-1">
        {value}
      </div>
    </div>
  );
}
