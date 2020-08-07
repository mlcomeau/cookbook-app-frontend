//This page kicks off everything - the first dominoe 


// 1. Recipe adapter fetches recipes from the API, JSONifies it, uses each individual json object to create an instance of the JS Recipe class 
//    - now we have a collection of Recipe instances (Recipe.all)
RecipesAdapter.fetchAndMakeRecipes()
// 2. Chef adapter follows same pattern - now we have a collection of Chef instances (Chef.all)
.then(ChefsAdapter.fetchAndMakeChefs)
.then(Chef.renderAllChefs)
// 3. Alters the DOM - will create DIV for each chef that contains chef name and associated recipes ()
Chef.addEventListeners()