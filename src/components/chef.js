class Chef {
    static all = []
    static chefContainer = document.getElementById("chefs-container")
    static newChefName = document.getElementById("new-chef-name")
    static newChefForm = document.getElementById("chef-form")

    constructor(chefJSON) {
        this.id = chefJSON.id
        this.name = chefJSON.name 

        this.main = document.createElement('div')
        this.main.id = `chef-${this.id}`
        this.main.className = "grid-item"
        
        this.recipes = document.createElement('div')
        this.recipes.id = `chef-${this.id}-recipes`
        this.recipes.className = "back-card"
        
        this.newRecipeButton = document.createElement('button')
        this.newRecipeButton.innerText = `Add Recipe for ${this.name}`
        this.newRecipeButton.id = `chef-${this.id}-new-recipe`
        this.newRecipeButton.className = "new-recipe-button"
        this.newRecipeButton.addEventListener('click', this.renderNewRecipeForm)

        this.recipeForm = document.createElement('form')
        this.recipeForm.id = "recipe-form"
        this.recipeForm.addEventListener('submit', this.submitNewRecipe)

        Chef.all.push(this)
    }

    

    renderNewRecipeForm = () => {
        this.newRecipeButton.disabled = true 
        this.recipes.appendChild(this.recipeForm)
        this.recipeForm.innerHTML = 
        `
        <label>Name:</label><br>
        <input type="text" name="name" id="recipe-name">
        <br/>
        <label>Ingredients:</label><br>
        <textarea type="textarea" name="ingredients" id="recipe-ingredients"></textarea>
        <br/>
        <label>Directions:</label><br>
        <textarea type="text" name="directions" id="recipe-directions"></textarea>
        <br/>
        <input id="submit-recipe" type="submit" value="Submit">
        `
    }

    submitNewRecipe = (e) => {
        e.preventDefault()
        let recipeName = document.getElementById("recipe-name").value 
        let recipeIngredients = document.getElementById("recipe-ingredients").value 
        let recipeDirections = document.getElementById("recipe-directions").value 

        RecipesAdapter.submitNewRecipe(recipeName, recipeIngredients, recipeDirections, this.id)
        .then(recipe =>{
            new Recipe(recipe)
        })
        .then(Chef.renderAllChefs)
        this.newRecipeButton.disabled = false

    }

    findRecipes() {
        return Recipe.all.filter (recipe => recipe.chefsId == this.id)
    }

    renderRecipes() {
       this.recipes.innerHTML = this.findRecipes().map(recipe => recipe.renderRecipe()).join("")
       this.main.appendChild(this.recipes)
       this.recipes.appendChild(this.newRecipeButton)
    }

    renderName() {
        this.main.innerHTML = `
        <div class="front-card">
        <div class="front">
        <h2 id="book-label">${this.name}'s Cookbook</h2>
        <i class="fas fa-book-open fa-3x"></i>
        </div
        </div>
        `
    }
    static addEventListeners () {
        Chef.newChefForm.addEventListener('submit', Chef.createChef);
    }

    static renderAllChefs() {
        Chef.all.forEach((chef) => {
            chef.renderName()
            
            chef.renderRecipes()
     
            Chef.chefContainer.append(chef.main)
        })
    }

    static createChef = (e) => {
        e.preventDefault;
        let chefName = Chef.newChefName.value

        ChefsAdapter.createNewChef(chefName)
        .then(chef => {
            Chef.all.push(new Chef(chef))
            Chef.newChefName.value = ""
            
            
        })
        .then(Chef.renderAllChefs)
    }





}