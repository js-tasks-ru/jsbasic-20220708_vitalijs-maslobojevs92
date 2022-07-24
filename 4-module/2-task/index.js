function makeDiagonalRed(table) {
  let rows = table.rows;
  let i = 0;

  for (let row of rows) {
    let cells = row.cells;

    cells[i].style.backgroundColor = "red";
    i++;

    continue;
  }
}
