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
  return { printBoard, boardFull, getMarketAt, setMarkerAt };
};

const temp = boardFactory();

const playerFactory = function (nick, marker) {
  const getNick = () => nick;
  const getMarker = () => marker;
  return { getNick, getMarker };
};

const ticTacToeFactory = function (player1, marker1, player2, marker2) {
  const board = boardFactory();
  const p1 = playerFactory(player1, marker1);
  const p2 = playerFactory(player2, marker2);
};

const newGame = ticTacToeFactory("Neo", "🚀", "Rusty", "🐶");
let counter = 0;
const squares = document.querySelectorAll(".board-square");
for (let square of squares) {
  square.addEventListener("click", function (e) {
    e.target.textContent = counter % 2 === 0 ? "🐉" : "🦄";
    counter++;
  });
}
