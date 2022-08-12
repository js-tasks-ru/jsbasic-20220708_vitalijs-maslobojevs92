import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this._categories = categories;
    this._render();
    this._init();
  }

  _render() {
    this._ribbon = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">${createRibbonCategories.call(this)}</nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    return this._ribbon;

    function createRibbonCategories() {
      let result = "";

      for (let category of this._categories) {
        result += `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`;
      }

      return result;
    }
  }

  _init() {
    this._leftButton = this._ribbon.querySelector(".ribbon__arrow_left");
    this._rightButton = this._ribbon.querySelector(".ribbon__arrow_right");
    this._ribonInner = this._ribbon.querySelector(".ribbon__inner");
    this._activeMenuItem = this._ribbon.querySelector(".ribbon__item");

    document.addEventListener("DOMContentLoaded", () => {
      this._setActiveItem(this._activeMenuItem);
      this._ribonInner.scrollTo(0, 0);
      this._changeButtonState();
    });

    this._ribbon.addEventListener("click", (e) => {
      if (e.target.closest(".ribbon__arrow_right")) this._ribonInner.scrollBy(350, 0);
      if (e.target.closest(".ribbon__arrow_left")) this._ribonInner.scrollBy(-350, 0);

      if (e.target.classList.contains("ribbon__item")) {
        e.preventDefault();
        this._setActiveItem(e.target);

        this._ribbon.dispatchEvent(
          new CustomEvent("ribbon-select", {
            detail: e.target.dataset.id,
            bubbles: true,
          })
        );
      }
    });

    this._ribonInner.addEventListener("scroll", (e) => {
      this._changeButtonState();
    });
  }

  _setActiveItem(menuItem) {
    menuItem.classList.add("ribbon__item_active");

    if (menuItem == this._activeMenuItem) return;

    this._activeMenuItem.classList.remove("ribbon__item_active");
    this._activeMenuItem = menuItem;
  }

  _changeButtonState() {
    let scrollRight = this._ribonInner.scrollWidth - this._ribonInner.scrollLeft - this._ribonInner.clientWidth;

    if (this._ribonInner.scrollLeft < 1) this._leftButton.classList.remove("ribbon__arrow_visible");
    else this._leftButton.classList.add("ribbon__arrow_visible");

    if (scrollRight < 1) this._rightButton.classList.remove("ribbon__arrow_visible");
    else this._rightButton.classList.add("ribbon__arrow_visible");
  }

  get elem() {
    return this._ribbon;
  }
}
