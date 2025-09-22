import * as model from './model.js';
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
  }
}
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipies)
);
