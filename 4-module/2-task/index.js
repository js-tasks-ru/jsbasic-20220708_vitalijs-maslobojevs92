function makeDiagonalRed(table) {
  let rows = table.querySelectorAll("TR"); //table.firstElementChild.children;
  let i = 0;

  for (let row of rows) {
    let cells = row.children;

    cells[i].style.backgroundColor = "red";
    i++;

    continue;
  }
}
