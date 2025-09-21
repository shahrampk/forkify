export const state = {
  recipe: {},
};
export const loadRecipies = async function (id) {
  try {
    
    const respones = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`
    );
    if (!respones.ok) throw new Error(`${data.message} - ${respones.status}`);

    const data = await respones.json();
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
    console.error(error);
    
  }
};
