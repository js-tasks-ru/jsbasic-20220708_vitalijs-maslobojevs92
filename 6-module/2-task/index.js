import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  _card = null;

  constructor(product) {
    this._product = product;
  }

  _render() {
    const card = createElement(`
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${this._product.image}" class="card__image" alt="product">
          <span class="card__price">€${this._product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this._product.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);

    card.addEventListener('click', (e) => {
      if (e.target.closest(".card__button")) this._createProductAddEvent(card);
    });

    return card;
  }

  _createProductAddEvent(element) {
    let event = new CustomEvent("product-add", { 
      detail: this._product.id, 
      bubbles: true
    });

    element.dispatchEvent(event);
  }

  get elem() {
    if (!this._card) this._card = this._render();
    return this._card;
  }
}
