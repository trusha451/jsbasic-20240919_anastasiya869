function initCarousel() {
  let carouselInner = document.querySelector('.carousel__inner')
  let slideWidth = carouselInner.offsetWidth

  let leftButton = document.querySelector('.carousel__arrow_left')
  let rightButton = document.querySelector('.carousel__arrow_right')
  let basicSlide = 0;

  function toggleButtons() {
    leftButton.style.display = basicSlide === 0 ? 'none' : ''
    rightButton.style.display = basicSlide === 3 ? 'none' : ''
  }

  toggleButtons()

  
  leftButton.addEventListener('click', () => {
    if (basicSlide > 0) {
      basicSlide--;
      let translateX = -basicSlide * slideWidth;
      carouselInner.style.transform = `translateX(${translateX}px)`
      toggleButtons();
    }
  })


  rightButton.addEventListener('click', () => {
    if (basicSlide < 3) {
      basicSlide++;
      let translateX = -basicSlide * slideWidth;
      carouselInner.style.transform = `translateX(${translateX}px)`
      toggleButtons();
    }
  })

}
