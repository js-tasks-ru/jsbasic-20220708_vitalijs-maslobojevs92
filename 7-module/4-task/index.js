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
    this._prevValue = this._value;

    this._thumb.ondragstart = () => false;

    this._thumb.onpointerdown = (e) => {
      e.preventDefault();

      this._slider.classList.add('slider_dragging');

      document.onpointermove = (e) => {
        e.preventDefault();

        this._moveThumb(e, 'smooth');
        this._setStepState();
      };

      document.onpointerup = (e) => {
        e.preventDefault();

        this._slider.classList.remove('slider_dragging');
        this._moveThumb(e, 'abrupt');
 
        this._slider.dispatchEvent(new CustomEvent('slider-change', {
          detail: this._value,
          bubbles: true
        }));

        document.onpointermove = null;
        document.onpointerup = null;
      };
    };

    this._slider.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.closest('.slider__thumb')) return;

      this._moveThumb(e, 'abrupt');
      this._setStepState();

      this._slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: this._value,
        bubbles: true
      }));
    });
  }

  _setStepState() {
    if (this._value != this._prevValue) {
      this._sliderSteps.children[this._value].classList.add('slider__step-active');
      this._sliderSteps.children[this._prevValue].classList.remove('slider__step-active');
      this._prevValue = this._value;
    } else return;
  }

  //behavior = 'smooth' || 'abrupt';
  _moveThumb(e, behavior) {
    let percentProgress;

    if (behavior === 'smooth') percentProgress = this._getPercentProgress(e, behavior);
    if (behavior === 'abrupt') percentProgress = this._getPercentProgress(e, behavior);

    this._progressBar.style.width = `${percentProgress}%`;
    this._thumb.style.left = `${percentProgress}%`;
    this._sliderValue.textContent = this._value;
  }

  _getPercentProgress(e, type) {
    let clickCoord = e.clientX - this._slider.getBoundingClientRect().left;
    let clickRelative = clickCoord / this._slider.offsetWidth;
    let segments = this._steps - 1;

    if (clickRelative >= 1) clickRelative = 1;
    if (clickRelative <= 0) clickRelative = 0;

    this._value = Math.round(clickRelative * segments);

    if (type === 'smooth') return clickRelative * 100;
    if (type === 'abrupt') return this._value / segments * 100;
  }

  get elem() {
    return this._slider;
  }
}
