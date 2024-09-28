function sumSalary(salaries) {
  let wages = 0
  for (let key in salaries){
    let s = salaries[key] 
    if (isFinite(s)) 
      wages += s
  }
  return wages
   
}
