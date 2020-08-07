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
        this.recipes = document.createElement('div')
        this.recipes.id = `chef-${this.id}-recipes`
        this.newRecipeButton = document.createElement('button')
        this.newRecipeButton.innerText = `Add Recipe for ${this.name}`
        this.newRecipeButton.id = `chef-${this.id}-new-recipe`
        this.newRecipeButton.addEventListener('click', this.renderNewRecipeForm)

        this.recipeForm = document.createElement('form')
        this.recipeForm.addEventListener('submit', this.submitNewRecipe)


       // this.main.append(this.recipes)

        Chef.all.push(this)
    }

    renderNewRecipeForm = () => {
        this.newRecipeButton.disabled = true 
        this.recipes.appendChild(this.recipeForm)
        this.recipeForm.innerHTML = 
        `
        <label>Name:</label>
        <input type="text" name="name" id="recipe-name">
        <br/>
        <label>Ingredients:</label>
        <input type="textarea" name="ingredients" id="recipe-ingredients" >
        <br/>
        <label>Directions:</label>
        <input type="textarea" name="directions" id="recipe-directions">
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
    }

    renderName() {
        this.main.innerHTML = `
        <h3>${this.name}</h3>
        `
    }


    static renderAllChefs() {
        Chef.all.forEach((chef) => {
            chef.renderName()
            
            chef.renderRecipes()
     
            Chef.chefContainer.append(chef.main, chef.newRecipeButton)
        })
    }

    static addEventListeners () {
        Chef.newChefForm.addEventListener('submit', Chef.createChef);
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