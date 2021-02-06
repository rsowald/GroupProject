var recipesresults = document.querySelector('#recipesResults');
var fetchButton = document.querySelector('#search-btn');
function getRecipe() {
  var ingredient = $('#user-search').val();
  console.log($('#user-search'));
  console.log(ingredient);
  var requestRecipe = 'https://themealdb.com/api/json/v1/1/search.php?s=' + ingredient + '';
//   i=ingredients, remember to separate with a comma and q=recipe title p=page (maybe we can do without this?)
  $.ajax({
    url: requestRecipe,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    });

};










        // function getRecipePuppy() {
        //   var requestPuppy = 'http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3';
        // //   i=ingredients, remember to separate with a comma and q=recipe title p=page (maybe we can do without this?)
        
        //   fetch(requestPuppy)
        //     .then(function (response) {
        //       return response.json();
        //     })
        //     .then(function (data) {
        //         console.log(data);
        //         for (var i = 0; i < data.length; i++) {
        //             var title = document.createElement('h2')
        //             var link = document.createElement('p')
        //             // for loop or forEach
        //             var ingredientList = document.createElement('ul')
        //             var ingredient = document.createElement('li')
        //             title.textContent = data.results[i].title;
        //             link.textContent = data.results[i].href;
        //             ingredient.textContent = data.results[i].ingredients
        //             recipesresults.append(title);
        //             recipesresults.append(link);
        //             recipesresults.append(ingredient);
        //             }
        //     });

fetchButton.addEventListener('click', getRecipe);
// fetchButton.addEventListener('click', getApi);


