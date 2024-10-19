import createElement from '../../assets/lib/create-element.js';
export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlide = 0;
    this.render();
    this.addEventListeners()
  }

  render() {
    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map(slide => this.renderSlide(slide)).join('')}
        </div>
      </div>
    `)

    this.updateArrowsShow()
  }

  renderSlide(slide) {
    return `
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
    `
  }

  addEventListeners() {
    this.elem.addEventListener('click', event => {
      const arrow = event.target.closest('.carousel__arrow');
      if (arrow) {
        arrow.classList.contains('carousel__arrow_right') ? this.rightSlide() : this.leftSlide()
      }

      const button = event.target.closest('.carousel__button')
      if (button) {
        const slideId = button.closest('.carousel__slide').dataset.id
        this.triggerProductAddEvent(slideId)
      }
    })
  }

  leftSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--
      this.basicSlide()
    }
  }


  rightSlide() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++
      this.basicSlide()
    }
  }

  basicSlide() {
    const inner = this.elem.querySelector('.carousel__inner')
    const slideWidth = this.elem.offsetWidth
    inner.style.transform = `translateX(-${this.currentSlide * slideWidth}px)`
    this.updateArrowsShow()
  }

  updateArrowsShow() {
    const arrows = this.elem.querySelectorAll('.carousel__arrow')
    arrows[0].style.display = this.currentSlide === this.slides.length - 1 ? 'none' : ''
    arrows[1].style.display = this.currentSlide === 0 ? 'none' : ''
  }

  triggerProductAddEvent(slideId) {
    const productAddEvent = new CustomEvent('product-add', {
      detail: slideId,
      bubbles: true
    })

    this.elem.dispatchEvent(productAddEvent);
  }
}

