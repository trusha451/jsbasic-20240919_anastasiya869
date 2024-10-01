function showSalary(users, age) {
  
  let a = users.filter(u => u.age <= age)
  let b = a.map(u => `${u.name}, ${u.balance}`).join('\n')
  //console.log(b)
  //let c = b.slice(0, -1)
  return b
}
