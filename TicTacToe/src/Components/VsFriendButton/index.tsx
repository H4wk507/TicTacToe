import { Board, Mode } from "../../helpers/types";
import { getEmptyBoard } from "../../helpers/utils";

interface VsFriendButtonProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  setBoard: (board: Board) => void;
}

export default function VsFriendButton({
  mode,
  setMode,
  setBoard,
}: VsFriendButtonProps) {
  return (
    <button
      onClick={() => {
        setMode("vsFriend");
        setBoard(getEmptyBoard());
      }}
      className={`${mode === "vsFriend" ? "active" : "inactive"}`}
    >
      Play vs friend
    </button>
  );
}
