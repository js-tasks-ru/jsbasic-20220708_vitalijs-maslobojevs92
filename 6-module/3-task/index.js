import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  constructor(slides) {
    this._slides = slides;
    this._render();
    this._init();
  }

  _render() {
    this._carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">${createSlides.call(this)}</div>
      </div>
    `);

    return this._carousel;

    function createSlides() {
      let result = '';

      for (let slide of this._slides) {
        let layout = `
          <div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
        `;

        result += layout;
      }

      return result;
    }
  }

  _init() {
    this._leftArrowBtn = this._carousel.querySelector(".carousel__arrow_left");
    this._rightArrowBtn = this._carousel.querySelector(".carousel__arrow_right");
    this._slidesContainer = this._carousel.querySelector(".carousel__inner");
    this._slideCoords = 0;
    this._slidePos = 0;
    let timeout = null;

    this._changeButtonState();

    this._carousel.addEventListener("click", (e) => {
      if (e.target.closest(".carousel__button")) {
        let slide = e.target.closest(".carousel__slide");

        this._carousel.dispatchEvent(new CustomEvent("product-add", { 
          detail: slide.dataset.id,
          bubbles: true
        }));
      }

      this._runCarousel(e.target.closest(".carousel__arrow"));
    });

    window.addEventListener("resize", () => {
      clearTimeout(timeout);
      timeout = setTimeout(this._fixSlidePosition.bind(this), 300);
    });
  }

  _runCarousel(button) {
    if (button === this._rightArrowBtn) {
      this._moveSlide({ direction: "right" });
      this._changeButtonState();
    }

    if (button === this._leftArrowBtn) {
      this._moveSlide({ direction: "left" });
      this._changeButtonState();
    }
  }

  _moveSlide({ direction }) {
    if (direction === "right") {
      this._slidePos++;
      this._slideCoords = this._slidePos * this._slidesContainer.offsetWidth;
      this._slidesContainer.style.transform = `translateX(${-this._slideCoords}px)`;
    } else {
      this._slidePos--;
      this._slideCoords = this._slidePos * this._slidesContainer.offsetWidth;
      this._slidesContainer.style.transform = `translateX(${-this._slideCoords}px)`;
    }
  }

  _changeButtonState() {
    this._rightArrowBtn.style.display = this._slidePos === this._slidesContainer.childElementCount - 1 ? "none" : "";
    this._leftArrowBtn.style.display = this._slidePos === 0 ? "none" : "";
  }

  _fixSlidePosition() {
    this._slideCoords = this._slidePos * this._slidesContainer.offsetWidth;
    this._slidesContainer.style.transform = `translateX(${-this._slideCoords}px)`;
  }
  
  get elem() {
    return this._carousel;
  }
}
