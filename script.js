// local document is loaded
$(document).ready(function () {

  // selects search recipe & random drink button
  var searchButton = document.querySelector('#search-btn');
  var randomButton = document.querySelector('#random-btn');

  // function to get recipe based on user input
  function getRecipe() {
    // variable to store value of user input
    var ingredient = $('#user-search').val();
    console.log(ingredient);
    // variable for recipe mealDB URL
    var requestRecipe = 'https://themealdb.com/api/json/v1/1/search.php?s=' + ingredient + '';

    // ajax call for recipe data
    $.ajax({
      url: requestRecipe,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      // run display recipe function
      displayResults(response)
    });
  }

  // function to display recipe to webpage
  function displayResults(response) {
    // selects recipe results section
    var recipeResults = $("#recipesResults");
    // empties recipe results
    recipeResults.empty();
    // response for searched recipes
    var recipes = response.meals;
    // if no recipes are found return "no results" message
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

      // function to add selected recipe link to calendar
      function addToCalendar(recipeLink) {
        return function () {
          var btn = $(this);
          saveRecipeToDay(recipeLink, btn.text());
        };
      }

      // searches the card to find anchor with class "button flat" & adds click handler
      card.find('a.btn-flat').click(addToCalendar(link))
      // append recipe card to recipe results section
      recipeResults.append(card);
    }
  }

  // function to save recipe link to day of week
  function saveRecipeToDay(recipeLink, dayOfWeek) {
    var newLine = "\n";
    var currentText = $("#" + dayOfWeek + "-links").html();
    currentText = currentText ? currentText + newLine : "";
    $("#" + dayOfWeek + "-links").html(currentText + "<a href='" + recipeLink + "' target='_blank'>" + recipeLink + "</a>");
  }

  // function to get random drink 
  function getCocktail() {
    // variable for cocktailDB URL
    var requestCocktail = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

    // ajax call for drink data
    $.ajax({
      url: requestCocktail,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      // run display drink function
      displayDrink(response);
    });
  }

  // function to display drink content
  function displayDrink(response) {
    // selects drink result section
    var drinkResults = $("#drinkResult");
    // empties drink result
    drinkResults.empty();

    // variable to hold drink data
    var drink = response.drinks[0]
    console.log(drink);

    // variable for drink information link
    var ctLink = `https://www.thecocktaildb.com/drink.php?c=${drink.idDrink}`;
    // variables for weekday & calendar buttons
    var weekdays = ['Sun', 'M', 'T', 'W', 'Th', 'F', 'S'];
    var calendarButtons = weekdays.map(day => '<a class="waves-effect waves-teal btn-flat">' + day + '</a>');

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
      <span class="center">Save to Calendar: <br>${calendarButtons.join(' • ')}</span>
    </div>
    </div>
  </div>`);

    // function to add selected drink link to calendar
    function addToCalendar(link) {
      return function () {
        var btn = $(this);
        saveRecipeToDay(link, btn.text());
      };
    }

    // searches the card to find anchor with class "button flat" & adds click handler
    card.find('a.btn-flat').click(addToCalendar(ctLink))
    // append drink card to drink result section
    drinkResults.append($(card));
  }

  // search button event listener
  searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    getRecipe();
  })

  // random button event listener
  randomButton.addEventListener('click', getCocktail);


  // variable array for all data in days of the week
  var variablesArray = [
    {
      day: Sun,
      linksDiv: $("#links-Sun"),
      textarea: $("#day-Sun")
    },
    {
      day: Mon,
      linksDiv: $("#links-M"),
      textarea: $("#day-M")
    },
    {
      day: Tues,
      linksDiv: $("#links-T"),
      textarea: $("#day-T")
    },
    {
      day: Wed,
      linksDiv: $("#links-W"),
      textarea: $("#day-W")
    },
    {
      day: Thurs,
      linksDiv: $("#links-Th"),
      textarea: $("#day-Th")
    },
    {
      day: Fri,
      linksDiv: $("#links-F"),
      textarea: $("#day-F")
    },
    {
      day: Sat,
      linksDiv: $("#links-S"),
      textarea: $("#day-S")
    }

  ]

  // close and save input from calendar to local storage
  $('#close-button').on('click', function (event) {
    event.preventDefault();
    localStorage.setItem("meal schedule", JSON.stringify(variablesArray));
  });

  $("#clear-button").on("click", function (event) {
    event.preventDefault();
    $("#links-S").empty();
    $("#day-S").text("");
  })

  // display saved calendar to user
  function displaySavedCalendar() {
    var localStorageContent = JSON.parse(localStorage.getItem("meal schedule"))
    console.log(localStorageContent);
    if (localStorageContent !== null) {
      for (var i = 0; i < localStorageContent.length; i++) {
        var textArea = $("#day-" + day[i]);
        var linkDiv = $("#link-" + day[i]);
        textArea.empty();
        linkDiv.empty();
        textArea.text(textarea[i]);
        linkDiv.html(linksDiv[i]);
      };

    };
  };

  // calls display saved calendar function
  displaySavedCalendar();

  // creates modal with modal method
  $('.modal').modal();
});