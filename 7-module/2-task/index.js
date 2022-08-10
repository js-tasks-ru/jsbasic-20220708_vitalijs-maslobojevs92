import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this._init();
  }

  render() {
    this.modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);


    return this.modal;
  }

  _init() {
    let self = this;

    this.modal.addEventListener('click', (e) => {
      if (e.target.closest('.modal__close')) this.close();
    });

    document.addEventListener('keydown', closeModal);

    function closeModal(e) {
      if (e.code === 'Escape') {
        self.close();
        document.removeEventListener('keydown', closeModal);
      }
    }
  }

  setTitle(title) {
    this.modal.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    this.modal.querySelector('.modal__body').append(node);
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.modal);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.modal.remove();
  }
  
}
