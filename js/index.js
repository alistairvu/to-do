// imports
import { render } from "./utils.js"

// elements
const todaysDate = document.getElementById("todays-date")
const searchBar = document.getElementById("search-bar")
const toDoInput = document.getElementById("to-do-add")
const addBtn = document.getElementById("add-btn")
const mantraDisplay = document.getElementById("mantra")

// functions
const displayDate = () => {
  const date = new Date()
  todaysDate.innerHTML = date.toLocaleDateString("en-uk", {
    month: "long",
    year: "numeric",
    day: "numeric",
  })
}

const displayMantra = async () => {
  try {
    const mantraId = Math.floor(Math.random() * 35)
    const res = await fetch(
      `https://calm-journey-64194.herokuapp.com/${mantraId}`
    )
    const mantra = await res.json()
    mantraDisplay.innerHTML = mantra
  } catch (e) {
    mantraDisplay.innerHTML = "Your life is about to be incredible."
  }
}

const addToDo = (value) => {
  if (value.trim().length > 0) {
    const currArr = JSON.parse(window.localStorage.getItem("to-do") || "[]")
    const newArr = [...currArr, value]
    window.localStorage.setItem("to-do", JSON.stringify(newArr))
    render(newArr)
    toDoInput.value = ""
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

// first render
displayDate()
displayMantra()
render(JSON.parse(window.localStorage.getItem("to-do")) || [])

// event listeners
searchBar.addEventListener("keyup", doSearch)

toDoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const { value } = e.target
    addToDo(value)
  }
})

addBtn.addEventListener("click", (e) => {
  e.preventDefault()
  addToDo(toDoInput.value)
})
