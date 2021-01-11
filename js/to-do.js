import { render } from "./utils.js"

const styles = `
<style>
* {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  color: white;
}

.container {
  margin: 15px 30px;
  width: calc(100% - 60px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>`

class ToDo extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: "open" })
    this.item = this.getAttribute("item")
    this.index = this.getAttribute("index")
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = `
    ${styles}
    <div class="container">
      <p>${this.item}</p>
      <button id="del-btn"><b>X</b></button>
    </div>`

    this._shadowRoot
      .getElementById("del-btn")
      .addEventListener("click", (e) => this.delete(e))
  }

  delete(e) {
    const oldArr = JSON.parse(window.localStorage.getItem("to-do"))
    const newArr = oldArr.filter(
      (item, index) => item !== this.item && index !== parseInt(this.index)
    )
    window.localStorage.setItem("to-do", JSON.stringify(newArr))
    render(newArr)
  }
}

window.customElements.define("to-do", ToDo)
