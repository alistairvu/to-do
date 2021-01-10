import "./to-do.js"

export const render = (arr) => {
  let html = ``
  arr.map(
    (item, index) => (html += `<to-do item="${item}" index="${index}"></to-do>`)
  )
  document.getElementById("to-do-display").innerHTML = html
}
