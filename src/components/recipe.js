class Recipe {
    static all = []
    constructor(recipeJSON) {
        this.id = recipeJSON.id;
        this.name = recipeJSON.name;
        this.ingredients = recipeJSON.ingredients;
        this.directions = recipeJSON.directions;
        this.chefsId = recipeJSON.chef_id;

        Recipe.all.push(this)
    }

    renderRecipe() {
        return `
        <div id="recipe-card">
        <h4><u>${this.name}</u></h4>
        <p><u>Ingredients:</u> ${this.ingredients}</p>
        <p><u>Directions:</u> ${this.directions}</p>
        <br>
        </div>
        `
    }
}