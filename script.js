$(document).ready(function () {

  var recipeResults = document.querySelector('#recipesResults');
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
      displayDrink(response);
    });
  }

  function displayDrink(response) {
    var drinkResults = $("#drinkResult");
    drinkResults.empty();

    var drink = response.drinks[0]
    console.log(drink);

    var ctResult = $("<div class='result'></div>");
    var ctTitle = $("<h5>" + drink.strDrink + "</h5>");
    var ctThumb = $("<img src='" + drink.strDrinkThumb + "'class='thumbnail'></img>");
    var ctType = $("<p>" + drink.strCategory + "</p>");
    var ctLink = $("<a href='https://www.thecocktaildb.com/drink/ " + drink.idDrink + "'>LINK</a>");

    ctResult.append(ctThumb, ctTitle, ctType, ctLink);
    drinkResults.append(ctResult);

    console.log(ctResult);
    console.log(ctTitle);
    console.log(ctThumb);
    console.log(ctType);
    console.log(ctLink);
  }

  searchButton.addEventListener('click', getRecipe);
  randomButton.addEventListener('click', getCocktail);

});
