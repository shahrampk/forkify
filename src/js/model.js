import { API_URL, SER_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: SER_PER_PAGE,
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
    state.search.results = data.data.recipes.map(res => {
      return {
        title: res.title,
        id: res.id,
        imageUrl: res.image_url,
        publisher: res.publisher,
      };
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const searchPerPage = function (page = state.search.page) {
  start.search.page = page;
  const start = (page - 1) * 10;
  const end = page * 10;
  return state.search.results.slice(start, end);
};
