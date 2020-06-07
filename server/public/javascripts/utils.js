function randomInt() {
  var rand = Math.random().toString(32).split('.')
  return rand[rand.length - 1]
}

module.exports = {randomInt}
