function highlight(table) {
  let rows = table.tBodies[0].rows;

  for (let row of rows) {
    let cells = row.cells;

    if (row.querySelectorAll("[data-available]").length === 0) {
      row.hidden = true;
    }

    for (let cell of cells) {
      if (cell.dataset.available && cell.dataset.available === "true")
        row.classList.add("available");

      if (cell.dataset.available && cell.dataset.available === "false")
        row.classList.add("unavailable");

      if (cell.textContent === "m") row.classList.add("male");

      if (cell.textContent === "f") row.classList.add("female");

      if (cell.textContent < 18) row.style.textDecoration = "line-through";
    }
  }
}
