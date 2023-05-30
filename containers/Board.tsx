import React from "react";
import styles from "../styles/tictactoe.module.css";
import { useState, useEffect } from "react";
import Square from "@/components/Square";
type Player = "X" | "O" | "Tie" | null;

function calculateWinner(squares: Player[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
}

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );



  const [winner, setWinner] = useState<Player>(null);

  function reset() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
    setPlayer1Name("");
    setPlayer2Name("");
  }

  function setSquareValue(index: number) {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  useEffect(() => {
    const w = calculateWinner(squares);
    if (w) {
      setWinner(w);
    }
    if (!w && !squares.filter((square) => !square).length) {
      setWinner("Tie");
    }
  }, [squares]);

  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");



  return (
    <>
      <div className={styles.board}>
        <div className={styles.top}>
          <h1 className={styles.h1}>Tic Tac Toe</h1>
          <h4 className={styles.h4}>
            Olá {currentPlayer === "X" ? player1Name : player2Name}, é a sua vez de jogar
          </h4>
          <div className={styles.players}>
            <label className={styles.label} htmlFor="player1">
              Player 1: {" "}
            </label>
            <input
              className={styles.input}
              id="player1"
              type="text"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
            />
            <label className={styles.label} htmlFor="player2">
              Player 2: {" "}
            </label>
            <input
              className={styles.input}
              id="player2"
              type="text"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.game}>
          <div className={styles.grid}>
            {squares.map((_, i) => {
              return (
                <Square
                  winner={winner}
                  key={1}
                  onClick={() => setSquareValue(i)}
                  value={squares[i]}
                />
              );
            })}
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.winner}>
            {winner && winner !== "Tie" && (
              <p className={styles.p}>Parabéns {winner === "X" ? player1Name : player2Name}, você venceu!</p>
            )}
            {winner && winner === "Tie" && (
              <p className={styles.p}>Houve um empate</p>
            )}
          </div>
          <button className={styles.reset} onClick={reset}>
            Reiniciar
          </button>
        </div>
      </div>
    </>
  );
};

export default Board;
