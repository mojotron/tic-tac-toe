"use strict";
const boardFactory = function () {
  const board = Array.from({ length: 9 }, () => null);

  const printBoard = () => board.forEach((ele) => console.log(ele));
  const boardFull = () => !board.includes(null);
  const getMarketAt = function (i) {
    if (i < 0 || i > 9) return;
    return board[i];
  };
  const setMarkerAt = function (i, marker) {
    if (i < 0 || i > 9) return;
    board[i] = marker;
  };
  const checkWinCondition = function (marker) {
    const winnerLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of winnerLines) {
      if (line.every((i) => getMarketAt(i) === marker)) return true;
    }
    return false;
  };
  return { printBoard, boardFull, getMarketAt, setMarkerAt, checkWinCondition };
};

const playerFactory = function (nick, marker) {
  const getNick = () => nick;
  const getMarker = () => marker;
  return { getNick, getMarker };
};

const ticTacToeFactory = function (player1, marker1, player2, marker2) {
  const board = boardFactory();
  const p1 = playerFactory(player1, marker1);
  const p2 = playerFactory(player2, marker2);
  //Decide who goes first for round 2 then alternate between rounds
  let currentPlayer = p1;
  const squares = document.querySelectorAll(".board-square");
  for (let square of squares) {
    square.addEventListener("click", function (e) {
      const square = e.target.dataset.square;
      if (board.getMarketAt(square)) return;
      e.target.textContent = currentPlayer.getMarker();
      board.setMarkerAt(square, currentPlayer.getMarker());
      //Check win condition or
      if (board.checkWinCondition(currentPlayer.getMarker()))
        alert(`WINNER IS ${currentPlayer.getNick()}`);
      //If board is full and no win condition its draw
      if (board.boardFull()) alert("DRAW");
      currentPlayer = currentPlayer === p1 ? p2 : p1;
    });
  }
};

const newGame = ticTacToeFactory("Neo", "🚀", "Rusty", "🐶");
