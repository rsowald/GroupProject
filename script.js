// loads local document
$(document).ready(function () {

  // selects search recipe & random drink button
  var searchButton = document.querySelector('#search-btn');
  var randomButton = document.querySelector('#random-btn');

  // function to get recipe based on user input
  function getRecipe() {
    // variable to store value of user input
    var ingredient = $('#user-search').val();
    console.log(ingredient);
    // variable for the recipe mealDB
    var requestRecipe = 'https://themealdb.com/api/json/v1/1/search.php?s=' + ingredient + '';

    // ajax call for recipe data, then console log response
    $.ajax({
      url: requestRecipe,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      // run display recipe function
      displayResults(response)
    });
  }

  // displays recipe to webpage
  function displayResults(response) {
    // variable selects recipe results section
    var recipeResults = $("#recipesResults");
    // empties recipe results
    recipeResults.empty();
    // variable response meals
    var recipes = response.meals;
    if (!recipes) {
      Materialize.toast("Looks like there are no results for that search!", 4000, "blue lighten-2 rounded");
      return;
    }

    // for loop to go through recipe data
    for (var i = 0; i < recipes.length; i++) {
      var recipe = recipes[i];

      // variables for recipe link, youtube, weekdays, calendar buttons
      var link = recipe.strSource || `https://www.themealdb.com/meal.php?c=${recipe.idMeal}`;
      var youtube = recipe.strYoutube ? ` • <a href="${recipe.strYoutube}" target="_blank">Video</a>` : '';
      var weekdays = ['Sun', 'M', 'T', 'W', 'Th', 'F', 'S'];
      var calendarButtons = weekdays.map(day => '<a class="waves-effect waves-teal btn-flat">' + day + '</a>');

      // variable to create card & display recipe information
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

      // function to add selected recipe to calender
      function addToCalendar(recipeLink) {
        return function () {
          var btn = $(this);
          saveRecipeToDay(recipeLink, btn.text());
        };
      }

      // searches the card to find anchor with class button flat & adds click handler
      card.find('a.btn-flat').click(addToCalendar(link))
      // append recipe card to recipe results section
      recipeResults.append(card);
    }


  }

  // function to save recipe link to day of week
  function saveRecipeToDay(recipeLink, dayOfWeek) {
    var newLine = "\n";
    var currentText = $("#day-" + dayOfWeek).val();
    currentText = currentText ? currentText + newLine : "";
    $("#day-" + dayOfWeek).val(currentText + recipeLink);
  }

  // cocktailDB API call for Random Drink
  function getCocktail() {
    var requestCocktail = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

    // ajax call for requesting Drink Information
    $.ajax({
      url: requestCocktail,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      // run display drink function
      displayDrink(response);
    });
  }

  // Function to display Drink content
  function displayDrink(response) {
    var drinkResults = $("#drinkResult");
    drinkResults.empty();

    // Variable to hold Drink Info
    var drink = response.drinks[0]
    console.log(drink);

    // Drink Link
    var ctLink = `https://www.thecocktaildb.com/drink.php?c=${drink.idDrink}`;

    // sets drink name to local storage
    localStorage.setItem("drink", drink.strDrink);
    console.log(localStorage.getItem("drink"));

    // variable to create card & display drink information
    var card = $(`<div class="card-panel grey lighten-5 z-depth-1">
  <div class="row valign-wrapper">
    <div class="col s3">
      <img src="${drink.strDrinkThumb}" alt="image of ${drink.strDrink}" class="circle responsive-img">
    </div>
    <div class="col s9">
      <span class="black-text flow-text">${drink.strDrink}</span>
      <br>
      <a href="${ctLink}" target="_blank">Drink</a>
      <br>
      <p>Drink type: ${drink.strCategory}</p>

    </div>
  </div>
</div>`);
    // append drink card to drink results section
    drinkResults.append($(card));

  }

  // search button event listener
  searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    getRecipe();
  })

  // random button event listener
  randomButton.addEventListener('click', getCocktail);

  // variable array for days of the week
  var variablesArray = ['day-Sun', 'day-M', 'day-T', 'day-W', 'day-Th', 'day-F', 'day-S'];

  // close and save input to related textarea in calender modal
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
      localStorage.setItem(id, JSON.stringify(userInput));
    };
  });

  // display saved calendar to user
  function displaySavedCalendar() {
    for (var i = 0; i < variablesArray.length; i++) {
      // var localStorageContent = localStorage.getItem(JSON.parse(variablesArray[i]));
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

// let myObject = {
//   property: "someValue"
// }

// // turn that object to a string so it can be put in local storage
// localStorage.setItem('label', JSON.stringify(myObject));

// JSON.parse(localStorage.getitem('label'))