var recipesresults = document.querySelector('#recipesResults');
var searchButton = document.querySelector('#search-btn');
var randomButton = document.querySelector('#random-btn');

function getRecipe() {
  var ingredient = $('#user-search').val();
  console.log($('#user-search'));
  console.log(ingredient);
  var requestRecipe = 'https://themealdb.com/api/json/v1/1/search.php?s=' + ingredient + '';

  $.ajax({
    url: requestRecipe,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
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
randomButton.addEventListener('click', getCocktail);

