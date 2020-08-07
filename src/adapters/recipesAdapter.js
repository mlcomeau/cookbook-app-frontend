class RecipesAdapter {

    static baseUrl = "http://127.0.0.1:3000/recipes"

    static fetchAndMakeRecipes(){
        return fetch(RecipesAdapter.baseUrl)
          .then((obj) => obj.json())
          .then(function(recipesArray){
            return recipesArray.forEach(function(recipe){
              return new Recipe(recipe)
            })
          })
    }

    static submitNewRecipe (name, ingredients, directions, chefId) {
      const recipe = {
        name: name,
        ingredients: ingredients,
        directions: directions,
        chef_id : chefId 
      }

      return fetch(RecipesAdapter.baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(recipe)
        }).then(res => res.json())
    }
  




}