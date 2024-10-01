function camelize(str) {
  let strSp = str.split(`-`)
  let strMp = strSp.map((w, i) => i == 0 ? w : w[0].toUpperCase() + w.slice(1))
  let result = strMp.join('')
  return result
}
