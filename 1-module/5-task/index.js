function truncate(str, maxlength) {
  
  if (str.length > maxlength){
    let cut = maxlength - 1
    let cutStr = str.slice(0, cut) + `…`

    return cutStr
  }else{
    return str
  }
}

