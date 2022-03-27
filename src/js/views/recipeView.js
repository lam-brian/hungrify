import View from "./View.js";

import { numberToFraction } from "../helpers.js";

class RecipeView extends View {
  _parentEl = document.querySelector(".recipe__container");
  _message = "";
  _errorMessage = "We could not find that recipe. Please try another one!";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;

      const { updateTo } = btn.dataset;

      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-bookmark");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
    <div class="recipe__fig">
    <div class="recipe__img-box">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
      </div>
      <div class="recipe__details">
        <div class="recipe__info">
          <i class="fa-solid fa-clock"></i>
          <span class="recipe__info-data recipe__info-data--minutes"
            >${this._data.cookingTime}
          </span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <i class="fa-solid fa-user-group"></i>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings
          }</span>
          <span class="recipe__info-text">${
            this._data.servings === 1 ? "serving" : "servings"
          }</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings btn" data-update-to="${
              this._data.servings - 1
            }">
              <i class="fa-solid fa-circle-minus"></i>
            </button>
            <button class="btn--tiny btn--update-servings btn" data-update-to="${
              this._data.servings + 1
            }">
              <i class="fa-solid fa-circle-plus"></i>
            </button>
          </div>
        </div>

        <button class="btn--round btn-bookmark btn ${
          this._data.bookmarked ? "btn-bookmark--active" : ""
        }">
          <i class="fa-solid fa-bookmark"></i>
        </button>
      </div>
    </div>

    <div class="recipe__content">
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}

        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was created by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Refer to their website 
          for detailed instructions on how to prepare this dish!
        </p>
        <a
          class="btn--small recipe__btn btn"
          href="${this._data.sourceUrl}"
          target="_blank" 
          rel="noreferrer"
        >
          <span>Directions</span>
          <i class="fa-solid fa-arrow-right-long"></i>
        </a>
      </div>
    </div>
`;
  }

  _generateMarkupIngredient(ing) {
    return `
      <li class="recipe__ingredient">
        <i class="fa-solid fa-check icon-check"></i>
        <div class="recipe__quantity">${
          ing.quantity ? numberToFraction(ing.quantity).toString() : ""
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
      `;
  }
}

export default new RecipeView();
