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

    $("#home").removeClass("active");
    $("#browse").removeClass("active");
    $("#create-recipe").removeClass("active");
    $("#login").removeClass("active");
    if (id == "browse") {
      $(".showPage").html(SERVICE.getData(displayRecipes));
      $("#" + id).addClass("active");
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

function deleteRecipe(id) {
  $("#delete").click(function (e) {
    // var id = e.currentTarget.id;
    SERVICE.deleteRecipe(id, displayRecipes);
  });
}

function goToEdit(id) {
  $("#goToEdit").click(function (e) {
    SERVICE.getEditPage(id);
    console.log("trying to edit");
  });
}

function updateRecipe(id) {
  $("#edit").click(function (e) {
    // var id = e.currentTarget.id;
    var newName = $("#name").val().toLowerCase.trim();
    var newDesc = $("#desc").val().toLowerCase.trim();
    var newTime = $("#time").val().toLowerCase.trim();
    var newServ = $("#serv").val().toLowerCase.trim();
    var newIng1 = $("#ing1").val().toLowerCase.trim();
    var newIng2 = $("#ing2").val().toLowerCase.trim();
    var newIng3 = $("#ing3").val().toLowerCase.trim();
    var newIns1 = $("#ins1").val().toLowerCase.trim();
    var newIns2 = $("#ins2").val().toLowerCase.trim();
    var newIns3 = $("#ins3").val().toLowerCase.trim();

    SERVICE.updateRecipe(
      id,
      newName,
      newDesc,
      newTime,
      newServ,
      newIng1,
      newIng2,
      newIng3,
      newIns1,
      newIns2,
      newIns3,
      displayView
    );
  });
}

function displayRecipes(recipeData) {
  var recipeOverView = `<div class="recipes">
    <div class="recipe-hero">
      <h1>Recipes: Try some today!</h1>
      <div class="recipe-list">`;
  recipeData.forEach(function (doc) {
    var rawdata = doc.data();
    var id = doc.id;
    recipeOverView += `<div class="recipe" id='${id}'>
    <div class="picture"></div>
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
      </div></div><div class= 'button-container'>
      <button class="browse-btn view" id='${id}'>View</button>
      <button class="browse-btn goToEdit" id='${id}'>Edit</button>
      <button class="browse-btn delete" id='${id}'>Delete</button></div></div>`;
    deleteRecipe(id);
    goToEdit(id);
    displayView(id);
    console.log(id);
  });
  recipeOverView += `</div>
    </div>
  </div>`;
  $(".showPage").html(recipeOverView);
}

function displayView(id) {
  $("#view").click(function (e) {
    SERVICE.getViewPage(id);
    console.log("trying to view");
    console.log(id);
  });
}

$(document).ready(function () {
  init();
  SERVICE.initFirebase();
  $(".showPage").html(SERVICE.getHomePage());
});
