import View from "./View";

import cookingImg from "url:../../images/cooking.svg";

class HomeView extends View {
  _parentEl = document.querySelector(".recipes__intro");
  _homeBtn = document.querySelector(".header__logo");

  addHandlerRender(handler) {
    this._homeBtn.addEventListener("click", handler);
  }

  renderHomePage() {
    window.location.hash = "#";

    const markup = `<div class="recipe__message">
        <h2 class="recipe__message-heading">Ready to Cook?</h2>
        <p class="recipe__message-text">Start searching for a recipe!</p>
        </div>
        <div class="recipe__intro-img">
        <img src="${cookingImg}" alt="person cooking" />
        </div>`;
    this._clear();
    this._introEl.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new HomeView();
