export default class View {
  _data;
  _recipeContainer = document.querySelector(".recipes");
  _introEl = document.querySelector(".recipes__intro");
  _recipeEl = document.querySelector(".recipe__container");
  _resultsEl = document.querySelector(".recipe__results");

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    this._clear();

    this._parentEl.innerHTML = "";
    this._parentEl.classList.remove("hidden");
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderBookmarks(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderBookmarkError();

    this._data = data;
    const markup = this._generateMarkup();

    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentEl.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    // this._parentEl.innerHTML = "";
    this._introEl.innerHTML = "";
    this._recipeEl.innerHTML = "";
    this._recipeEl.classList.add("hidden");
    this._resultsEl.innerHTML = "";
    this._resultsEl.classList.add("hidden");

    const errorEl = document.querySelector(".error");
    if (errorEl) errorEl.classList.add("hidden");
  }

  renderSpinner() {
    const markup = `<div class='spinner'>
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
      `;

    this._clear();
    this._introEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
     <div class="error">
         <i class="fa-solid fa-triangle-exclamation"></i>
         <p>${message}</p>
     </div> 
      `;
    this._clear();
    this._recipeContainer.insertAdjacentHTML("afterbegin", markup);
  }

  renderBookmarkError(message = this._errorMessage) {
    const markup = `
     <div class="bookmarks__error">
         <p>${message}</p>
     </div> 
      `;
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="${message}">
    <div>
    </div>
    <p>Start by searching for a recipe or an ingredient. Have fun!</p>
  </div>
      `;
    this._clear();
    this._introEl.insertAdjacentHTML("afterbegin", markup);
  }
}
