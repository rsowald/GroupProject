//JavaScript
var issueContainer = document.getElementById('issues');
var fetchButton = document.getElementById('fetch-button');

function getRecipePuppy() {
  var requestUrl = 'http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3';
//   i=ingredients, remember to separate with a comma and q=recipe title p=page (maybe we can do without this?)

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var title = document.createElement('h1')
            var link = document.createElement('p')
            // for loop or forEach
            var ingredientList = document.createElement('ul')
            var ingredient = document.createElement('li')

            title.textContent = data.results[i].title;
            link.textContent = data.results[i].href;
            ingredient.textContent = data.results[i].ingredients



     
     
     
     
     



        var userName = document.createElement('h3');
        var issueTitle = document.createElement('h4');
        var issueBody = document.createElement('p');

        issueContainer.append(userName);
        issueContainer.append(issueTitle);
        issueContainer.append(issueBody);
      }
    });
}
fetchButton.addEventListener('click', getApi);
