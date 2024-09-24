function checkSpam(str) {
  let minStr = str.toLowerCase()
  if (minStr.includes(`1xbet`) || minStr.includes(`xxx`) || minStr.includes(`free xxxxx`)) 
    return true
  else
    return false
  
}
