import * as model from './model.js';
import recipeView from './views/recipe-view.js';
import RecipeView from './views/recipe-view.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

async function controlRecipies() {
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
    recipeView.renderError();
  }
}

// const controlSearchResult = async function () {
//   try {
//     model.loadSearchResult()
//   } catch (err) {
//     console.log(err);
//   }
// };

const init = function () {
  RecipeView._addHandlerRender(controlRecipies);
};
init();
