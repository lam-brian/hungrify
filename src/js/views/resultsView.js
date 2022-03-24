import View from "./View";

class ResultsView extends View {
  _parentEl = document.querySelector(".recipe__results");
  _message = "";
  _errorMessage = "No recipes found for your query! Please try again!";

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    return `
    <ul class="recipe__results-list">
          ${this._data.searchResults.map(this._generateMarkupPreview).join("")}
        </ul>
        <div class="pagination">
        ${this._generateMarkupPagination(this._data.searchData)}
        </div>
`;
  }

  _generateMarkupPreview(result) {
    return `
      <li class="preview">
            <a class="preview__link preview__link--active" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
              </div>
            </a>
          </li>
      `;
  }

  _generateMarkupPagination(searchData) {
    const curPage = searchData.page;
    const numPages = Math.ceil(
      searchData.results.length / searchData.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return (this._pagination = `
      <button data-goto="${
        curPage + 1
      }" class="btn btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    `);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return (this._pagination = `
      <button data-goto="${
        curPage - 1
      }" class="btn btn--inline pagination__btn--prev">
         <i class="fa-solid fa-arrow-left"></i>
        <span>Page ${curPage - 1}</span>
      </button>
    `);
    }
    // other pages
    if (curPage < numPages) {
      return (this._pagination = `
      <button data-goto="${
        curPage - 1
      }" class="btn btn--inline pagination__btn--prev">
      <i class="fa-solid fa-arrow-left"></i>
        <span>Page ${curPage - 1}</span>
      </button>
      <button data-goto="${
        curPage + 1
      }" class="btn btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    `);
    }
    // Page 1, and there are NO other pages
    return (this._pagination = "");
  }
}

export default new ResultsView();
