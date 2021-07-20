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
  const winCheck = function (marker) {
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
  return { printBoard, boardFull, getMarketAt, setMarkerAt, winCheck };
};

const playerFactory = function (nick, marker) {
  const getNick = () => nick;
  const getMarker = () => marker;
  return { getNick, getMarker };
};

const TicTacToe = (function () {
  const modal = document.querySelector(".new-game-select");
  const newGameBtn = document.querySelector(".btn-new-game");
  const newRoundBtn = document.querySelector(".btn-new-round");
  const squares = document.querySelectorAll(".board-square");
  let board = boardFactory();
  const p1 = playerFactory("player1", "x");
  const p2 = playerFactory("player2", "o");
  let p1Score = 0;
  let p2Score = 0;
  const gameEngine = function (event) {
    const targetSquare = event.target.dataset.square;
    if (board.getMarketAt(targetSquare)) return; //Guard clause when square already selected
    event.target.textContent = currentPlayer.getMarker(); //Display marker on the DOM board
    board.setMarkerAt(targetSquare, currentPlayer.getMarker()); //Set marker to js board object
    //Check for win
    if (board.winCheck(currentPlayer.getMarker())) {
      displayMsg(`${currentPlayer.getMarker().toUpperCase()} won the round!`);
      newRoundBtn.classList.remove("none");
      modal.classList.remove("hidden");
      return;
    }
    //Check for draw (map is full)
    if (board.boardFull()) {
      alert("DRAW");
      return;
    }
    //No win solution swap current player
    currentPlayer = currentPlayer === p1 ? p2 : p1;
  };
  //Decide who goes first for round 2 then alternate between rounds
  let currentPlayer = p1;

  for (let square of squares) {
    square.addEventListener("click", (e) => gameEngine(e));
  }

  const newBoard = function () {
    board = boardFactory();
    for (let square of squares) square.textContent = "";
  };

  const displayMsg = function (msg) {
    const element = document.querySelector(".option-msg");
    element.textContent = msg;
  };
  //ON NEW GAME RESET ALL
  newGameBtn.addEventListener("click", function (e) {
    modal.classList.add("hidden");
    newBoard();
  });
  //ON NEW ROUND RESET BOARD
})();
