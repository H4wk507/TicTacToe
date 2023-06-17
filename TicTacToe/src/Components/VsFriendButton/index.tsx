import { TBoard, Mode } from "../../helpers/types";
import { getEmptyBoard } from "../../helpers/utils";

interface VsFriendButtonProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  setBoard: (board: TBoard) => void;
  setWinningLine: (winningLine: [number, number, number] | null) => void;
}

export default function VsFriendButton({
  mode,
  setMode,
  setBoard,
  setWinningLine,
}: VsFriendButtonProps) {
  return (
    <button
      onClick={() => {
        setWinningLine(null);
        setMode("vsFriend");
        setBoard(getEmptyBoard());
      }}
      className={`${mode === "vsFriend" ? "active" : "inactive"}`}
    >
      Play vs friend
    </button>
  );
}
