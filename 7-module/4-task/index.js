export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    this.steps = steps;
    this.render();
    this.addEventListeners()
  }

  render() {
    let slider = document.createElement('DIV');
    slider.classList.add('slider');
    slider.insertAdjacentHTML("beforeend", `  
    <div class="slider__thumb" style="left: 75%;">
      <span class="slider__value">${this.value}</span>
    </div>    
    <div class="slider__progress" style="width: 75%;"></div>    
    <div class="slider__steps">
      <span class="slider__step-active"></span>  
      ${"<span></span>".repeat(this.steps - 1)}    
    </div>
  `)
    this.elem = slider
  }


  addEventListeners() {
    this.elem.addEventListener('click', (event) => {
      this.sliderByClick(event)
    })

    let thumb  = this.elem.querySelector('.slider__thumb')
    let progress = this.elem.querySelector('.slider__progress')
    let spanList = this.elem.querySelectorAll('.slider__steps span')

    globalThis.thumb = thumb 
    globalThis.progress = progress
    globalThis.spanList = spanList

    thumb.ondragstart = () => false

    thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault()
      this.elem.classList.add('slider_dragging')
      document.addEventListener('pointermove', this.mouseMove)
      document.addEventListener('pointerup', this.mouseUp)
    })
  }

  mouseMove = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left
    let leftRelative = left / this.elem.offsetWidth
    if (leftRelative < 0) { leftRelative = 0 }
    if (leftRelative > 1) { leftRelative = 1 }

    let approxValue = leftRelative * (this.steps - 1)
    let value = Math.round(approxValue);

    let leftPercents = 100 * leftRelative;
    globalThis.progress.style.width = `${leftPercents}%`
    globalThis.thumb.style.left = `${leftPercents}%`
    this.updateSlider(value);
  }

  mouseUp = (event) => {
    let finalPercents = (100 / (this.steps - 1)) * this.value
    globalThis.thumb.style.left = `${finalPercents}%`
    globalThis.progress.style.width = `${finalPercents}%`
    this.updateSlider(this.value);

    let customEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(customEvent)

    this.elem.classList.remove('slider_dragging')
    document.removeEventListener('pointermove', this.mouseMove)
    document.removeEventListener('pointerup', this.mouseUp)
  }

  updateSlider(value) {
    let afterSlider = this.elem.querySelector('.slider__step-active')
    if (afterSlider) { afterSlider.classList.remove('slider__step-active') }

    spanList[value].classList.add('slider__step-active')
    let currentValue = this.elem.querySelector('.slider__value')
    currentValue.textContent = value
    this.value = value
  }

  sliderByClick(event) {
    let baseSlider = event.target.closest('.slider')
    if (baseSlider) {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / baseSlider.offsetWidth;
      let approxValue = leftRelative * (this.steps - 1);
      let value = Math.round(approxValue);

      let leftPercents = (100 / (this.steps - 1)) * value;
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      this.updateSlider(value)
      let customEvent = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true,
      });
      this.elem.dispatchEvent(customEvent);
    }
  }
}
