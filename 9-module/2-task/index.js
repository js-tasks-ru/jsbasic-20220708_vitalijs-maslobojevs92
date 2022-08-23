import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);

    let nutsCheckbox = document.querySelector('#nuts-checkbox');
    let vegCheckbox = document.querySelector('#vegeterian-checkbox');
  
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    await fetch('products.json').then(response => {
      if (response.status < 400) {
        return response.json();
      }
    })
    .then(data => {
      this.products = data;
    });

    this.productsGrid = new ProductsGrid(this.products);
    this._renderProductsGrid();

    document.body.addEventListener('product-add', (e) => {
      for (let product of this.products) {
        if (product.id == e.detail) {
          this.cart.addProduct(product);
        }
      }
    });

    document.body.addEventListener('slider-change', (e) => {
      this.productsGrid.updateFilter({
        maxSpiciness: e.detail
      });
    });

    document.body.addEventListener('ribbon-select', (e) => {
      this.productsGrid.updateFilter({
        category: e.detail
      });
    });

    nutsCheckbox.addEventListener('change', (e) => {
      this.productsGrid.updateFilter({
        noNuts: e.target.checked
      });
    });

    vegCheckbox.addEventListener('change', (e) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: e.target.checked
      });
    });
  }

  _renderProductsGrid() {
    let productGridContainer = document.querySelector('[data-products-grid-holder]');

    productGridContainer.innerHTML = '';
    productGridContainer.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider._value,
      category: this.ribbonMenu.productId
    });
  }
}
