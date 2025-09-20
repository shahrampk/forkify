class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;
  render(data) {
    return (this.#data = data);
  }
}
export default new RecipeView();
