export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value
    this.steps = steps
    this.render()
    this.addEventListeners()
  }
  
  render() {
    let slider = document.createElement('DIV')
    slider.classList.add('slider')
    slider.insertAdjacentHTML("beforeend", `  
    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">2</span>
    </div>
    <div class="slider__progress" style="width: 50%;"></div>
    <div class="slider__steps">
      <span class="slider__step-active"></span>      
    </div>
  `)

    let sliderSteps = slider.querySelector('.slider__steps')
    for (let index = 0; index < this.steps - 1; index++) {
      sliderSteps.insertAdjacentHTML('beforeEnd', `<span></span>`)
    }
    this.elem = slider
  }

  addEventListeners() {
    this.elem.addEventListener('click', (event) => {
      
      let afterSlider = this.elem.querySelector('.slider__step-active')
      let baseSlider = event.target.closest('.slider')
      if (baseSlider) {
        if (afterSlider) { afterSlider.classList.remove('slider__step-active') }
        let left = event.clientX - this.elem.getBoundingClientRect().left       
        let leftRelative = left / baseSlider.offsetWidth      
        let approxValue= leftRelative * (this.steps-1)        
        let value = Math.round(approxValue)
        this.value = value

        let spanList = this.elem.querySelectorAll('.slider__steps span')
        spanList[this.value].classList.add('slider__step-active')
        let currentValue = this.elem.querySelector('.slider__value')
        currentValue.textContent = this.value

        let thumb = this.elem.querySelector('.slider__thumb')
        let progress = this.elem.querySelector('.slider__progress')
        let leftPercents = (100 / (this.steps - 1)) * this.value;
        thumb.style.left = `${leftPercents}%`
        progress.style.width = `${leftPercents}%`

        let customEvent = new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true,
        })
        this.elem.dispatchEvent(customEvent)
      }
    })
  }
}