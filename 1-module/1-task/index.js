function factorial(n) {
  let result = 1
  if(n==0)
    return result
  else{
    for(let i = n-1; i>0; i--){
      result *= i
    }
  }
}
