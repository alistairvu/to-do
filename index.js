// imports
import { render } from "./utils.js"

// elements
const todaysDate = document.getElementById("todays-date")
const searchBar = document.getElementById("search-bar")
const toDoInput = document.getElementById("to-do-add")
const clearBtn = document.getElementById("clear-btn")

// functions
const displayDate = () => {
  const date = new Date()
  todaysDate.innerHTML = date.toLocaleDateString("en-uk", {
    month: "long",
    year: "numeric",
    day: "numeric",
  })
}

const addToDo = (e) => {
  if (e.key === "Enter") {
    const { value } = e.target
    if (value.trim().length > 0) {
      const currArr = JSON.parse(window.localStorage.getItem("to-do") || "[]")
      const newArr = [...currArr, value]
      window.localStorage.setItem("to-do", JSON.stringify(newArr))
      render(newArr)
      toDoInput.value = ""
    }
  }
}

const doSearch = (e) => {
  const { value } = e.target
  const arr = JSON.parse(window.localStorage.getItem("to-do"))
  if (value.trim().length > 0) {
    const filtered = arr.filter((x) => x.includes(value))
    if (filtered.length > 0) {
      render(filtered)
    } else {
      document.getElementById("to-do-display").innerHTML = `<p>No results.</p>`
    }
  } else {
    render(arr)
  }
}

const clearToDo = (e) => {
  window.localStorage.setItem("to-do", JSON.stringify([]))
  render([])
}

// first render
displayDate()
render(JSON.parse(window.localStorage.getItem("to-do")) || [])

// event listeners
searchBar.addEventListener("keyup", doSearch)
toDoInput.addEventListener("keyup", addToDo)
clearBtn.addEventListener("click", clearToDo)
