var recipesresults = document.querySelector('#recipesResults');
// var userSearch = document.querySelector('#user-search');
var searchBtn = document.querySelector('#search-btn');
var randomBtn = document.querySelector('#random-btn');

var userSearch = "s=" + $("#user-search").val()

function getRecipeByName(userSearch) {
  var requestRecipeByName = 'https://www.themealdb.com/api/json/v1/1/search.php?';

  console.log(userSearch)
  $.get(requestRecipeByName, userSearch)
    .done(console.log(data))
    .fail(console.log("error"));

}




function getMealDB() {
  var requestMealDB = 'https://www.themealdb.com/api/json/v1/1/random.php';

  fetch(requestMealDB)
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

randomBtn.addEventListener('click', getMealDB);
searchBtn.addEventListener('click', getRecipeByName);
