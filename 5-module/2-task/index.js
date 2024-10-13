function toggleText() {
  let toggleButton = document.querySelector('.toggle-text-button')
  toggleButton.onclick = () => {
    let objText = document.getElementById('text')
    if (objText.hidden == true){
      objText.hidden = false
    }else{
      objText.hidden = true
    }
  }
}
