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
        if (started) {
          return;
        }
        setWinningLine(null);
        setMode("vsFriend");
        setBoard(getEmptyBoard());
      }}
      className={mode === "vsFriend" ? "active" : started ? "red" : "inactive"}
    >
      Play vs friend
    </button>
  );
}
