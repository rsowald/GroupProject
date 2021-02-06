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

