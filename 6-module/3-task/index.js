import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  _carousel = null;

  constructor(slides) {
    this._slides = slides;
  }

  _render() {
    const carousel = createElement(`
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

    let leftArrowBtn = carousel.querySelector(".carousel__arrow_left");
    let rightArrowBtn = carousel.querySelector(".carousel__arrow_right");
    let slidesContainer = carousel.querySelector(".carousel__inner");
    let slideCoords = 0;
    let slidePos = 0;
    let timeout = null;

    changeButtonState();

    carousel.addEventListener("click", (e) => {
      if (e.target.closest(".carousel__button")) {
        this._createProductAddEvent(carousel, e.target.closest(".carousel__slide"));
      }
      
      runCarousel(e.target.closest(".carousel__arrow"));
    });

    window.addEventListener("resize", function () {
      clearTimeout(timeout);
      timeout = setTimeout(fixSlidePosition, 300);
    });

    return carousel;

    function runCarousel(button) {
      if (button === rightArrowBtn) {
        moveSlide({ direction: "right" });
        changeButtonState();
      }

      if (button === leftArrowBtn) {
        moveSlide({ direction: "left" });
        changeButtonState();
      }
    }

    function moveSlide({ direction }) {
      if (direction === "right") {
        slidePos++;
        slideCoords = slidePos * slidesContainer.offsetWidth;
        slidesContainer.style.transform = `translateX(${-slideCoords}px)`;
      } else {
        slidePos--;
        slideCoords = slidePos * slidesContainer.offsetWidth;
        slidesContainer.style.transform = `translateX(${-slideCoords}px)`;
      }
    }
        
    function changeButtonState() {
      rightArrowBtn.style.display =
        slidePos === slidesContainer.childElementCount - 1 ? "none" : "";
      leftArrowBtn.style.display = slidePos === 0 ? "none" : "";
    }

    function fixSlidePosition() {
      slideCoords = slidePos * slidesContainer.offsetWidth;
      slidesContainer.style.transform = `translateX(${-slideCoords}px)`;
    }

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

  _createProductAddEvent(element, slide) {
    let event = new CustomEvent("product-add", { 
      detail: slide.dataset.id, 
      bubbles: true
    });

    element.dispatchEvent(event);
  }

  get elem() {
    if (!this._carousel) this._carousel = this._render();
    return this._carousel;
  }

}
