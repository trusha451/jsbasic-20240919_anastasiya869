function getMinMax(str) {

  let strSplit = str.split(` `)
  let result = strSplit.filter((num) => isFinite(num) == true)
  let numbers = result.map((n) => parseFloat(n))
  let sorted = numbers.sort(function(a, b) { return a - b })
  let min = sorted[0]
  let max = sorted[sorted.length - 1]
  return{ min: min, max: max }

}
