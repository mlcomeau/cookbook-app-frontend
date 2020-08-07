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
        <li>${this.name}</li>
        <p>${this.ingredients}</p>
        <p>${this.directions}</p>
        <br>
        </div>
        `
    }
}