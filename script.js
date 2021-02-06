$(document).ready(function () {

  // var recipeResults = document.querySelector('#recipesResults');
  var searchButton = document.querySelector('#search-btn');
  var randomButton = document.querySelector('#random-btn');

  function getRecipe() {
    var ingredient = $('#user-search').val();
    console.log(ingredient);
    var requestRecipe = 'https://themealdb.com/api/json/v1/1/search.php?s=' + ingredient + '';

    $.ajax({
      url: requestRecipe,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      displayResults(response)
    });
  }

  function displayResults(response) {
    var recipeResults = $("#recipesResults");
    recipeResults.empty();
    var recipes = response.meals;
    if (!recipes) {
      //TODO: nothing found
      return;
    }

    for (var i = 0; i < recipes.length; i++) {
      var recipe = recipes[i];
      var result = $("<div class='result'></div>");
      var thumbnail = $("<img src='" + recipe.strMealThumb + "' class='thumbnail'></img>");
      var title = $("<h5>" + recipe.strMeal + "</h5>");
      var link = $("<a href= '" + recipe.strSource + "'>" + recipe.strSource + "</a>");
      result.append(thumbnail, title, link);
      recipeResults.append(result);

    }

  }

  function getCocktail() {
  var requestCocktail = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  $.ajax({
    url: requestCocktail,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    var cocktailTitle = document.createElement('h5')

    cocktailTitle.textContent = response.drinks[0].strDrink;

    var cocktailThumb = new Image();
    cocktailThumb.src = response.drinks[0].strDrinkThumb

    recipesresults.append(cocktailTitle);
    recipesresults.append(cocktailThumb);
    $('img').addClass('thumbnail');

    console.log(cocktailTitle);
    console.log(cocktailThumb);


  });
}

  searchButton.addEventListener('click', getRecipe);
  randomButton.addEventListener('click', getRandomMeal);


});