import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._steps = steps;
    this._value = value;
    this._render();
    this._init();
  }

  _render() {
    let currentStep = 100 / (this._steps - 1) * this._value;

    this._slider = createElement(`
      <div class="slider">
        <div class="slider__thumb" style="left: ${currentStep}%;">
          <span class="slider__value">${this._value}</span>
        </div>
        <div class="slider__progress" style="width: ${currentStep}%;"></div>
        <div class="slider__steps">${createSteps.call(this)}</div>
      </div>
    `);

    function createSteps() {
      let result = '';

      for (let i = 0; i < this._steps; i++) {
        if (i == this._value) result += '<span class="slider__step-active"></span>';
        else result += '<span></span>';
      }

      return result;
    }

    return this._slider;
  }

  _init() {
    this._sliderSteps = this._slider.querySelector('.slider__steps');
    this._thumb = this._slider.querySelector('.slider__thumb');
    this._progressBar = this._slider.querySelector('.slider__progress');
    this._sliderValue = this._slider.querySelector('.slider__value');
    this._currentValue = this._value;

    this._slider.addEventListener('click', (e) => {
      let clickCoord = e.clientX - this._slider.getBoundingClientRect().left;
      let clickRelative = clickCoord / this._slider.offsetWidth;
      
      this._segments = this._steps - 1;
      this._value = Math.round(clickRelative * this._segments);
      
      this._moveThumb();
      this._setStepState();
      this._sliderValue.textContent = this._value;

      this._slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: this._value,
        bubbles: true
      }));
    });
  }

  _setStepState() {
    this._sliderSteps.children[this._value].classList.add('slider__step-active');
    this._sliderSteps.children[this._currentValue].classList.remove('slider__step-active');
    this._currentValue = this._value;
  }

  _moveThumb() {
    let destination = this._value / this._segments * 100 + '%';

    this._progressBar.style.width = destination;
    this._thumb.style.left = destination;
  }

  get elem() {
    return this._slider;
  }
}
