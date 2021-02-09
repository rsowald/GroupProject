$(document).ready(function () {

  var recipesresults = document.querySelector('#recipesResults');
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

      var link = recipe.strSource || `https://www.themealdb.com/meal.php?c=${recipe.idMeal}`;
      var youtube = recipe.strYoutube ? ` • <a href="${recipe.strYoutube}" target="_blank">Video</a>` : '';

      var card = `<div class="card-panel grey lighten-5 z-depth-1">
<div class="row valign-wrapper">
  <div class="col s3">
    <img src="${recipe.strMealThumb}" alt="image of ${recipe.strMeal}" class="circle responsive-img">
  </div>
  <div class="col s9">
    <span class="black-text flow-text">${recipe.strMeal}</span>
    <br>
    <a href="${link}" target="_blank">Recipe</a>
    ${youtube}
  </div>
</div>
</div>`;

      recipeResults.append($(card));
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


      console.log(cocktailTitle);
      console.log(cocktailThumb);

    });
  }

  $('#modal-main-content').on('click', 'a', function (event) {
    event.preventDefault();
    var text = $(this).children('textarea').val();
    var userInput = text;
    console.log(userInput);
    var id = $(this).attr('id');
    localStorage.setItem(id, userInput);
  })

  $('.modal').modal();

  searchButton.addEventListener('click', getRecipe);
  randomButton.addEventListener('click', getCocktail);
});
