import React from "react";
import styles from "../styles/tictactoe.module.css";

type Player = "X" | "O" | "Tie" | null;

interface SquareProps {
  value: Player;
  onClick: () => void;
  winner: Player;
}

const Square = ({ value, onClick, winner }: SquareProps) => {
  if (!value) {
    return (
      <button
        className={styles.square}
        onClick={onClick}
        disabled={Boolean(winner)}
      />
    );
  }

  return (
    <>
      <button 
        className={styles.square} 
        disabled>
        {value}
      </button>
    </>
  );
};

export default Square;
