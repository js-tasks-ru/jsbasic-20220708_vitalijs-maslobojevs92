/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  _table = null;

  constructor(rows) {
    this.data = rows;
  }

  _render() {
    let tableHead =
      "<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th></tr></thead>";
    let tableBodyRows = this.data.map(createRows).join("");
    let table = document.createElement("table");

    table.innerHTML = `${tableHead}<tbody>${tableBodyRows}</tbody>`;
    table.addEventListener("click", this._onClick);

    return table;

    function createRows(row) {
      return `<tr><td>${row.name}</td><td>${row.age}</td><td>${row.salary}</td><td>${row.city}</td><td><button>X</button></td></tr>`;
    }
  }

  _onClick(ev) {
    if (ev.target.tagName === "BUTTON") ev.target.closest("TR").remove();
  }

  get elem() {
    if (!this._table) this._table = this._render();
    return this._table;
  }
}
