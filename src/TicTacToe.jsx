import React, { useState } from "react";

function checkWinner(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }

  return null;
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [error, setError] = useState("");

  const currentPlayer = xIsNext ? "X" : "O";

  const handleClick = (index) => {
    if (gameOver) return;
    if (board[index] !== null) {
      setError("Invalid move! This square is already taken.");
      return;
    }

    setError("");
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winningPlayer = checkWinner(newBoard);
    if (winningPlayer) {
      setWinner(winningPlayer);
      setGameOver(true);
      return;
    }

    if (newBoard.every((square) => square !== null)) {
      setWinner(null);
      setGameOver(true);
      return;
    }

    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
    setWinner(null);
    setError("");
  };

  let statusMessage;
  if (gameOver) {
    if (winner) {
      statusMessage = `Game Over! Player ${winner} wins!`;
    } else {
      statusMessage = "Game Over! It's a tie!";
    }
  } else {
    statusMessage = `Current Player: ${currentPlayer}`;
  }

  return (
    <div className="game-container">
      <h1>React Tic-Tac-Toe</h1>
      <div className="status">{statusMessage}</div>
      {error && <div className="error">{error}</div>}
      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      <button onClick={resetGame} className="reset-button">
        Reset Game
      </button>
    </div>
  );
}
