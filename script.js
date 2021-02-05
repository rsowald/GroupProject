var recipesresults = document.querySelector('#recipesResults');
var userSearch = document.querySelector('#user-Search');

function getRecipePuppy() {
  var requestPuppy = 'http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3';
//   i=ingredients, remember to separate with a comma and q=recipe title p=page (maybe we can do without this?)

  fetch(requestPuppy)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var title = document.createElement('h2')
            var link = document.createElement('p')
            // for loop or forEach
            var ingredientList = document.createElement('ul')
            var ingredient = document.createElement('li')
            title.textContent = data.results[i].title;
            link.textContent = data.results[i].href;
            ingredient.textContent = data.results[i].ingredients
            recipesresults.append(title);
            recipesresults.append(link);
            recipesresults.append(ingredient);
            }
    });











    function getMealIDB() {
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
}
fetchButton.addEventListener('click', getMealIDB);
fetchButton.addEventListener('click', getApi);
