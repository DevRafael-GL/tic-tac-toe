const board = document.getElementById("board");
const tableX = document.getElementById("tableX");
const tableO = document.getElementById("tableO");
const player = document.getElementById("player");

let turn = "X";
let winner = null;
let cells = Array.from(board.getElementsByTagName("td"));
let X = 0;
let O = 0;

board.addEventListener("click", handleClick);

function handleClick(event) {
  if (event.target.tagName === "TD") {
    let index = cells.indexOf(event.target);

    if (!cells[index].textContent && !winner) {
      cells[index].textContent = turn;
      checkWinner();
      switchTurn();
    }
  }
}

function switchTurn() {
  turn = turn === "X" ? "O" : "X";
  player.textContent = turn;
}

function reset() {
  turn = "X";
  player.textContent = turn;
  winner = null;
  cells.map((cell) => (cell.textContent = ""));
}

function winnersScore() {
  if (winner === "X") {
    X++;
    tableX.textContent = X;
  } else {
    O++;
    tableO.textContent = O;
  }
}

function checkWinner() {
  const combinations = [
    [0, 1, 2], // linha 1
    [3, 4, 5], // linha 2
    [6, 7, 8], // linha 3
    [0, 3, 6], // coluna 1
    [1, 4, 7], // coluna 2
    [2, 5, 8], // coluna 3
    [0, 4, 8], // diagonal esqueda direita
    [2, 4, 6], // diagonal direita esquerda
  ];

  combinations.map((combination) => {
    let [a, b, c] = combination;

    if (
      cells[a].textContent === turn &&
      cells[b].textContent === turn &&
      cells[c].textContent === turn
    ) {
      winner = turn;
      winnersScore();
      alert(`O jogador: ${winner} venceu!`);

      reset();
    }
  });
}
