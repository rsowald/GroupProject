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
      Materialize.toast("Looks like there are no results for that search!", 4000, "blue lighten-2 rounded");
      return;
    }

    for (var i = 0; i < recipes.length; i++) {
      var recipe = recipes[i];

      var link = recipe.strSource || `https://www.themealdb.com/meal.php?c=${recipe.idMeal}`;
      var youtube = recipe.strYoutube ? ` • <a href="${recipe.strYoutube}" target="_blank">Video</a>` : '';
      var weekdays = ['Sun', 'M', 'T', 'W', 'Th', 'F', 'S'];
      var calendarButtons = weekdays.map(day => '<a class="waves-effect waves-teal btn-flat">' + day + '</a>');


      var card = $(`<div class="card-panel grey lighten-5 z-depth-1">
  <div class="row valign-wrapper">
    <div class="col s3">
      <img src="${recipe.strMealThumb}" alt="image of ${recipe.strMeal}" class="circle responsive-img">
    </div>
    <div class="col s9">
      <span class="black-text flow-text">${recipe.strMeal}</span>
      <br>
      <a href="${link}" target="_blank">Recipe</a>
      ${youtube}
      <br>
      <span class="center">Save to Calendar: <br>${calendarButtons.join(' • ')}</span>
    </div>
  </div>
</div>`);

      function addToCalendar(recipeLink) {
        return function () {
          var btn = $(this);
          saveRecipeToDay(recipeLink, btn.text());
        };
      }

      card.find('a.btn-flat').click(addToCalendar(link))

      recipeResults.append(card);
    }


  }

  function saveRecipeToDay(recipeLink, dayOfWeek) {
    var newLine = "\n";
    var currentText = $("#day-" + dayOfWeek).val();
    currentText = currentText ? currentText + newLine : "";
    $("#day-" + dayOfWeek).val(currentText + recipeLink);
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




  searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    getRecipe();
  })

  randomButton.addEventListener('click', getCocktail);

  var variablesArray = ['day-Sun', 'day-M', 'day-T', 'day-W', 'day-Th', 'day-F', 'day-S'];

  $('#close-button').on('click', function (event) {
    event.preventDefault();
    for (var i = 0; i < variablesArray.length; i++) {
      var text = $('.materialize-textarea')[i];
      var userInput = text.value;
      console.log(userInput);
      if (text === null) {
        continue
      }
      console.log(userInput);
      var id = variablesArray[i];
      localStorage.setItem(id, userInput);
    };
  });

  function displaySavedCalendar() {
    for (var i = 0; i < variablesArray.length; i++) {
      var localStorageContent = localStorage.getItem(variablesArray[i]);

      if (localStorageContent === null) {
        continue
      };
      var text = localStorageContent
      console.log(localStorageContent);
      $('#' + variablesArray[i]).val(text);
    };
  };

  displaySavedCalendar();
  $('.modal').modal();
});