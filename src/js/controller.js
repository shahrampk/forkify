
import * as model from './model.js';
import RecipeView from './views/recipe-view.js';
import searchView from './views/search-view.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export async function controlRecipies() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    RecipeView.renderLoader();
    await model.loadRecipies(id);
    // rendring recipes

    RecipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
    // Catching the error comming from model.js...
    RecipeView.renderError();
  }
}

const controlSearchResult = async function () {
  try {
    // 1) Get Search Quey
    const query = searchView.getQuery();
    if (!query) return;
    // Loading Search Results...
    await model.loadSearchResult(query);
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
controlSearchResult();
const init = function () {
  RecipeView._addHandlerRender(controlRecipies);
  searchView.addHandlerSearch(controlSearchResult);
};
init();
