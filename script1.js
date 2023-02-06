const board = document.getElementById("board");
const player = document.getElementById("player");
const tableX = document.getElementById("tableX");
const tableO = document.getElementById("tableO");

let turn = "X";
let winner = null;
let scoreX = 0;
let scoreO = 0;
let cells = Array.from(board.getElementsByTagName("td"));

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
  winner = null;
  cells.map((cell) => (cell.textContent = ""));
}

function resetScore() {
  const confirmReset = confirm(
    "Está acão irá resetar os pontos!\nDeseja continuar?"
  );

  if (confirmReset) {
    scoreX = 0;
    scoreO = 0;
    score();
    reset();
  }
}

function score() {
  tableX.textContent = scoreX;
  tableO.textContent = scoreO;
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

  for (combination of combinations) {
    let [a, b, c] = combination;

    if (
      cells[a].textContent === turn &&
      cells[b].textContent === turn &&
      cells[c].textContent === turn
    ) {
      winner = turn;
      if (winner === "X") scoreX++;
      if (winner === "O") scoreO++;

      score();
      setTimeout(() => {
        alert(`O '${winner}' é o vencedor! 🏆`);
        reset();
      }, 100);
    }
  }
}
