import { TBoard, Mode } from "../../helpers/types";
import { getEmptyBoard } from "../../helpers/utils";

interface VsFriendButtonProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  setBoard: (board: TBoard) => void;
  setWinningLine: (winningLine: [number, number, number] | null) => void;
  started: boolean;
}

export default function VsFriendButton({
  mode,
  setMode,
  setBoard,
  setWinningLine,
  started,
}: VsFriendButtonProps) {
  return (
    <button
      onClick={() => {
        setWinningLine(null);
        setMode("vsFriend");
        setBoard(getEmptyBoard());
      }}
      className={mode === "vsFriend" ? "green" : started ? "red" : "orange"}
      disabled={started}
    >
      Play vs friend
    </button>
  );
}
