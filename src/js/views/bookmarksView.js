import View from "./View";

class BookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__recipes");
  _message = "";
  _errorMessage = "No bookmarks found :(";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return `
          ${this._data.map(this._generateMarkupPreview).join("")}
        `;
  }

  _generateMarkupPreview(result) {
    return `
      <li class="bookmark__item">
            <a class="bookmark__link" href="#${result.id}">
              <figure class="bookmark__img">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="bookmark__data">
                <h4 class="bookmark__title">${result.title}</h4>
              </div>
            </a>
          </li>
      `;
  }
}

export default new BookmarksView();
