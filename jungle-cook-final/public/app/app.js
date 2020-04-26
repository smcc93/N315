function init() {
  let navOpen = false;
  $(".bars").click(function (e) {
    if (navOpen) {
      $(".nav-holder").css("display", "none");
      navOpen = false;
    } else {
      $(".nav-holder").css("display", "flex");
      navOpen = true;
    }
  });

  $("div a").click(function (e) {
    var id = e.currentTarget.id;
    console.log(id);
    $("#home").removeClass("active");
    $("#browse").removeClass("active");
    $("#create-recipe").removeClass("active");
    $("#login").removeClass("active");
    if (id == "browse") {
      $(".showPage").html(SERVICE.getRecipePage());
      $("#" + id).addClass("active");
      displayRecipes();
    } else if (id == "create-recipe") {
      $(".showPage").html(SERVICE.getCreatePage());
      $("#" + id).addClass("active");
    } else if (id == "login") {
      $(".showPage").html(SERVICE.getLoginPage());
      $("#" + id).addClass("active");
    } else if (id == "home") {
      $(".showPage").html(SERVICE.getHomePage());
      $("#" + id).addClass("active");
    }
  });
}

// function deleteRecipe(){
//   $(")
// }

function displayRecipes(recipeData) {
  let data = recipeData.data();
  var recipeOverView = `<div class="recipe">`;
  data.forEach(function (doc) {
    var rawdata = doc.data();
    recipeOverView += `<div class="picture"></div>
    <div class="recipe-instructions">
      <h3>${rawdata.recipeName}</h3>
      <p>
        ${rawdata.recipeDesc}
      </p>
      <div class="time">
        <div class="time-img"></div>
        <p>${rawdata.recipeTime}</p>
      </div>
      <div class="servings">
        <div class="serving-img"></div>
        <p>${rawdata.recipeServs}</p>
      </div>
    </div>`;
  });
  recipeOverView += `</div>`;
  $(".recipe-list").html(recipeOverView);
}

$(document).ready(function () {
  init();
  SERVICE.initFirebase();
  $(".showPage").html(SERVICE.getHomePage());
});
