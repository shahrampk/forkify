import View from './view';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMsg = 'No Recipe found for this query! Please try again';
  _message;
  _generateMarkUp() {
    console.log(this._data);
    return `
    ${this._data.map(this._generateMarkupCards).join('')}
    `;
  }
  _generateMarkupCards(cardData) {
    if (!cardData) return;

    return `
      <li class="preview">
        <a class="preview__link" href="#${cardData.id}">
          <figure class="preview__fig">
            <img src="${cardData.imageUrl}" alt="${cardData.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${cardData.title}</h4>
            <p class="preview__publisher">${cardData.publisher}</p>
            <div class="preview__user-generated hidden">
              <svg>
                <use href="src/img/icons.svg#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`;
  }
}

export default new ResultsView();
