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

  function getRandomMeal() {
    var requestMealIDB = 'https://www.themealdb.com/api/json/v1/1/random.php';

    fetch(requestMealIDB)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          // var title = document.createElement('h1')
          // var link = document.createElement('p')
          // var ingredientList = document.createElement('ul')
          // var ingredient = document.createElement('li')

          // title.textContent = data.results[i].title;
          // link.textContent = data.results[i].href;
          // ingredient.textContent = data.results[i].ingredients

          // issueContainer.append(title);
          // issueContainer.append(link);
          // issueContainer.append(ingredient);
        }
      });
  }

  searchButton.addEventListener('click', getRecipe);
  randomButton.addEventListener('click', getRandomMeal);

});