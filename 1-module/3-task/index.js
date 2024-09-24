function ucFirst(str) {
  if (str){
    let firstLetter = str[0].toUpperCase()
    let letters = str.slice(1)
    let result = firstLetter+letters
    
    return result
  }else{
    return str
  }

}
