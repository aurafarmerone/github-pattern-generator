const ROWS = 7;
const COLS = 53;
const grid = document.getElementById("grid");

let data = Array.from({ length: ROWS }, () =>
  Array(COLS).fill(" ")
);

let cells = [];

// Build grid
for (let r = 0; r < ROWS; r++) {
  cells[r] = [];
  for (let c = 0; c < COLS; c++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    cell.onclick = () => toggleCell(r, c);
    cell.oncontextmenu = e => {
      e.preventDefault();
      setCell(r, c, false);
    };

    grid.appendChild(cell);
    cells[r][c] = cell;
  }
}

function setCell(r, c, active) {
  cells[r][c].classList.toggle("active", active);
  data[r][c] = active ? "3" : " ";
}

function toggleCell(r, c) {
  setCell(r, c, data[r][c] === " ");
}

/* RESET */
document.getElementById("reset").onclick = () => {
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      setCell(r, c, false);
};

/* DOWNLOAD */
document.getElementById("download").onclick = () => {
  const rows = data.map(row => row.join(""));
  const blob = new Blob(
    [JSON.stringify(rows, null, 2)],
    { type: "application/json" }
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "pattern.json";
  a.click();
};
