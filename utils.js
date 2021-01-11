import "./to-do.js"

export const render = (arr) => {
  let html = ``
  arr.map(
    (item, index) => (html += `<to-do item="${item}" index="${index}"></to-do>`)
  )
  document.getElementById("to-do-display").innerHTML = html
  document.getElementById("tasks-count").innerHTML = `${
    arr.length > 0 ? arr.length : "No"
  } ${arr.length === 1 ? "task left" : "tasks left"}`
}
