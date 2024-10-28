import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render()
    this.addEventListeners()

  }

  render() {
    let container = createElement(`<div class="ribbon">
<button class="ribbon__arrow ribbon__arrow_left">
  <img src="/assets/images/icons/angle-icon.svg" alt="icon">
</button>
<nav class="ribbon__inner"></nav>
<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
  <img src="/assets/images/icons/angle-icon.svg" alt="icon">
</button>
</div>`)


    let inner = container.querySelector('.ribbon__inner')

    inner.insertAdjacentHTML('beforeend', this.categories
      .map(({ id, name }) => `<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`)
      .join(''))
    let ribbonItemAll = inner.querySelector('.ribbon__item');
    if (ribbonItemAll.textContent === 'All') { ribbonItemAll.classList.add('ribbon__item_active') }
    this.elem = container
  }

  addEventListeners() {
    let inner = this.elem.querySelector('.ribbon__inner')
    let ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right')
    let ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left')
    

    inner.addEventListener('scroll', (event) => {
      event.preventDefault()
      let scrollLeft = inner.scrollLeft;
      let scrollRight = (inner.scrollWidth) - (inner.scrollLeft) - (inner.clientWidth);
      if (scrollLeft === 0) 
        { ribbonArrowLeft.classList.remove('ribbon__arrow_visible') 
        }else{ 
          ribbonArrowLeft.classList.add('ribbon__arrow_visible') 
        }

      if (scrollRight < 1) { 
        ribbonArrowRight.classList.remove('ribbon__arrow_visible') 
      }else{ 
        ribbonArrowRight.classList.add('ribbon__arrow_visible') 
      }
    })

    ribbonArrowLeft.addEventListener("click", () => {
      inner.scrollBy(-350, 0)
    })

    ribbonArrowRight.addEventListener("click", () => {
      inner.scrollBy(350, 0)
    })

    this.elem.addEventListener('click', (event) => {
      event.preventDefault()
      let activeTarget = this.elem.querySelectorAll('.ribbon__item')
      let previousTarget = this.elem.querySelector('.ribbon__item_active')
      
      if (activeTarget) {
        (previousTarget) ? (previousTarget.classList.remove('ribbon__item_active')
          , event.target.classList.add('ribbon__item_active'))
          : event.target.classList.add('ribbon__item_active')

        let chooseEvent = new CustomEvent('ribbon-select', {
          detail: event.target.dataset.id,
          bubbles: true,
        })
        this.elem.dispatchEvent(chooseEvent);
      }
    })
  }
}
