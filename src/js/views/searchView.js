class SearchView {
  _searchEl = document.querySelector(".search__bar");

  getQuery() {
    const query = this._searchEl.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._searchEl.querySelector(".search__field").value = "";
  }

  addHandlerSearch(handler) {
    this._searchEl.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.hash = "#";
      handler();
    });
  }
}

export default new SearchView();
