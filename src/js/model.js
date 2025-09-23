import { API_URL } from './config.js';
import { getJSON } from './helper.js';
export const state = {
  recipe: {},
};
export const loadRecipies = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    console.log(data);

    const { recipe } = data.data;
    state.recipe = {
      title: recipe.title,
      id: recipe.id,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      cookingTime: recipe.cooking_time,
    };
  } catch (error) {
    // ReThrowing the error...
    throw error
  }
};
