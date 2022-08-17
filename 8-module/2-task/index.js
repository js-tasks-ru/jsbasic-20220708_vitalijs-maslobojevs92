import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this._products = products;
    this._filters = {};
    this._render();
  }

  _render() {
    this._productGrid = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `);

    this._productGridInner = this._productGrid.querySelector('.products-grid__inner');
    this.updateFilter();

    return this._productGrid;
  }

  updateFilter(filters) {
    Object.assign(this._filters, filters);
    this._productGridInner.innerHTML = "";

    this._products.forEach(product => {
      if (product['nuts'] && this._filters['noNuts']) return;
      if (!product['vegeterian'] && this._filters['vegeterianOnly']) return;
      if (product['spiciness'] > this._filters['maxSpiciness']) return;

      if (this._filters['category']) {
       if (product['category'] != this._filters['category']) return;
      }

      this._productGridInner.append(new ProductCard(product).elem);
    });
  }

  get elem() {
    return this._productGrid;
  }

}
