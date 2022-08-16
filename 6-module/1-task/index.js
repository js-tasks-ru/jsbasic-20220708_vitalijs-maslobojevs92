export default class UserTable {

  constructor(rows) {
    this.data = rows;
    this._render();
    this._init();
  }

  _render() {
    this._table = document.createElement("table");

    let tableHead =
      "<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th></tr></thead>";
    let tableBodyRows = this.data.map(createRows).join("");

    this._table.innerHTML = `${tableHead}<tbody>${tableBodyRows}</tbody>`;
    
    return this._table;

    function createRows(row) {
      return `<tr><td>${row.name}</td><td>${row.age}</td><td>${row.salary}</td><td>${row.city}</td><td><button>X</button></td></tr>`;
    }
  }

  _init() {
    this._table.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") e.target.closest("TR").remove();
    });
  }

  get elem() {
    return this._table;
  }
}
