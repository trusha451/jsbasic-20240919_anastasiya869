import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render()
    this.addEventListeners()
  }

  render() {
    let modal = createElement(`<div class="modal"> 
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"></h3>
      </div><div class="modal__body">
      </div>
    </div>

  </div>`)
    this.elem = modal
  }

  open() {
    document.body.append(this.elem)
    document.body.classList.add(`is-modal-open`)
  }

  setTitle(string) {
    this.string = string
    let modalTitle = this.elem.querySelector('.modal__title')
    modalTitle.textContent = this.string
  }

  setBody(element) {
    
    let modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = "";
    modalBody.append(element);
  }

  close() {
    document.body.classList.remove(`is-modal-open`)
    this.elem.remove()
  }

  addEventListeners() {
    this.elem.addEventListener('click', (event) => {
      let buttonClose = event.target.closest('.modal__close');
      if (buttonClose) {
        this.close()
      }
    })

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') { this.close() }
    })
  }
}
