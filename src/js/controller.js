import * as model from './model.js';
import RecipeView from './views/recipe-view.js';
import searchView from './views/search-view.js';
import resultViews from './views/result-views.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}
export async function controlRecipies() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Showing Loader...
    RecipeView.renderLoader();

    // Loading Recipies...
    await model.loadRecipies(id);

    // rendring recipes
    RecipeView.render(model.state.recipe);
  } catch (error) {
    // Catching the error comming from model.js...
    RecipeView.renderError();
  }
}

const controlSearchResult = async function () {
  try {
    // 1) Get Search Quey
    const query = searchView.getQuery();
    if (!query) return;
    // Showing Loader...
    resultViews.renderLoader();
    // Loading Search Results...
    await model.loadSearchResult(query);
    // Rendering Recipies...
    resultViews.render(model.state.search.results);
  } catch (err) {
    resultViews.renderError();
  }
};
const init = function () {
  RecipeView._addHandlerRender(controlRecipies);
  searchView.addHandlerSearch(controlSearchResult);
};
init();
