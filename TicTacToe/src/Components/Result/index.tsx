import { TBoard, Choice } from "../../helpers/types";
import { getWinner, hasEnded } from "../../helpers/utils";
import styles from "./style.module.scss";

interface ResultProps {
  board: TBoard;
  choice: Choice;
}

export default function Result({ board, choice }: ResultProps) {
  const getResultText = (): string => {
    const winner = getWinner(board);
    return winner ? `${winner} wins!` : "Tie!";
  };

  const resultText = hasEnded(board) ? getResultText() : `${choice} turn`;

  return (
    <div className={styles["result-container"]}>
      <div className={styles.result}>{resultText}</div>
    </div>
  );
}
