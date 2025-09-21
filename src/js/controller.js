import * as model from './model.js';
import RecipeView from './views/recipeview.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

async function controlRecipies(hash) {
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
