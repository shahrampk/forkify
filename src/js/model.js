import { API_URL } from './config.js';
import { getJSON } from './helper.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};
export const loadRecipies = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
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
    throw error;
  }
};
export const loadSearchResult = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
    state.search.results = data.data.recipes.map(res => {
      return {
        title: res.title,
        id: res.id,
        imageUrl: res.image_url,
        publisher: res.publisher,
      };
    });
    console.log(state.search.results);
  } catch (err) {
    console.log(err);
    throw err;
  }
};