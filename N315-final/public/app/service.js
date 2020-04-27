var SERVICE = (function () {
  document.addEventListener("DOMContentLoaded", function () {
    try {
      let app = firebase.app();
      let features = ["auth", "database", "messaging", "storage"].filter(
        (feature) => typeof app[feature] === "function"
      );
      //document.getElementById("load");
    } catch (e) {
      console.error(e);
    }
  });

  var _db;

  var _getData = function (callback) {
    _db
      .collection("Recipes")
      .get()
      .then(function (querySnapshot) {
        // console.log(querySnapshot);
        callback(querySnapshot);
      });
  };

  var _addRecipe = function (
    recipeName,
    recipeDesc,
    recipeTime,
    recipeServs,
    ingred1,
    ingred2,
    ingred3,
    instr1,
    instr2,
    instr3
  ) {
    let recipe = {
      recipeName: recipeName,
      recipeDesc: recipeDesc,
      recipeTime: recipeTime,
      recipeServs: recipeServs,
      ingred1: ingred1,
      ingred2: ingred2,
      ingred3: ingred3,
      instr1: instr1,
      instr2: instr2,
      instr3: instr3,
    };

    _db
      .collection("Recipes")
      .add(recipe)
      .then(function (docRef) {
        callback("Recipe added");
      })
      .catch(function (error) {
        callback("There was an error adding the recipe ", error);
      });
  };

  var _deleteRecipe = function (id, callback) {
    _db
      .collection("Recipes")
      .doc(id)
      .delete()
      .then(function () {
        _getData(callback);
      });
  };

  var _checkRecipe = function (
    newName,
    newDesc,
    newTime,
    newServ,
    newIng1,
    newIns2,
    newIng3,
    newIns1,
    newIns2,
    newIns3,
    callback
  ) {
    var recipe = _db.collection("Recipes");
    recipe
      .where("recipeName", "==", newName)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.empty) {
          _addRecipe(
            newName,
            newDesc,
            newTime,
            newServ,
            newIng1,
            newIns2,
            newIng3,
            newIns1,
            newIns2,
            newIns3,
            callback
          );
        } else {
          callback("Already a recipe with this name");
        }
      })
      .catch(function (error) {
        callback("Error adding recipe ", error);
      });
  };

  var _updateRecipe = function (
    id,
    recipeName,
    recipeDesc,
    recipeTime,
    recipeServs,
    ingred1,
    ingred2,
    ingred3,
    instr1,
    instr2,
    instr3,
    callback
  ) {
    var newRecipe = {
      recipeName: recipeName,
      recipeDesc: recipeDesc,
      recipeTime: recipeTime,
      recipeServs: recipeServs,
      ingred1: ingred1,
      ingred2: ingred2,
      ingred3: ingred3,
      instr1: instr1,
      instr2: instr2,
      instr3: instr3,
    };
    _db
      .collection("Recipes")
      .doc(id)
      .update(newRecipe)
      .then(function () {
        _getData(callback);
      });
  };

  var _initFirebase = function () {
    firebase
      .auth()
      .signInAnonymously()
      .then(function (result) {
        console.log("connected");
        _db = firebase.firestore();
      });
  };

  var _getHomePage = function () {
    let homePage = `   <div class="home">
        <div class="hero">
          <div class="circles">
            <div class="yellow-circle">
              <h1>The Jungle Cook</h1>
              <p>
                The home to various recipes of your choice. Add your own recipe
                today and fill the world with joy!
              </p>
            </div>
            <div class="pink-circle">
              <p>Want to be a Jungle Cook? Go ahead and the kitchen is yours!</p>
            </div>
          </div>
        </div>
      </div>`;
    return homePage;
  };

  var _getRecipePage = function () {
    let recipePage = "";
    return recipePage;
  };

  var _getloginPage = function () {
    let loginPage = `  <div class="login">
        <div class="login-box">
          <h1>Login Here!</h1>
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Password" />
          <button class="login-button">Login</button>
        </div>
        <div class="sign-up">
          <p>don't have an account?</p>
          <h1>Sign Up!</h1>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Password" />
          <button class="sign-up-button">Sign Up</button>
        </div>
      </div>`;
    return loginPage;
  };

  var _getCreatePage = function () {
    let createPage = `<div class="create-edit" id="create">
        <div class="form">
          <h3 class="greeting">Hello, create your recipe!</h3>
          <input type="text" placeholder="Add Recipe Image" />
          <button class="add-image">Attach File</button>
          <input id='newName' type="text" placeholder="Recipe Name" />
          <input id='newDesc' type="text" placeholder="Recipe Description" />
          <input id='newTime' type="text" placeholder="Recipe Total Time" />
          <input id='newServ' type="text" placeholder="Recipe Serving Size" />
          <h3>Enter Ingredients:</h3>
          <input id='newIng1' type="text" placeholder="Ingredient #1" />
          <input id='newIng2' type="text" placeholder="Ingredient #2" />
          <input id='newIng3' type="text" placeholder="Ingredient #3" />
          <h3>Enter Instructions:</h3>
          <input id=' newIns1' type="text" placeholder="Instruction #1" />
          <input id=' newIns2' type="text" placeholder="Instruction #2" />
          <input id=' newIns3' type="text" placeholder="Instruction #3" />
        </div>
        <button id='create' class="create-edit-btn">Create Recipe</button>
      </div>`;

    return createPage;
  };

  var _getEditPage = function (id) {
    _db
      .collection("Recipes")
      .doc(id)
      .get()
      .then(function (doc) {
        console.log(doc.data());
      });
    var rawData = doc.data();
    let editPage = `<div class="create-edit" id="edit">
        <div class="form">
          <h3 class="greeting">Hello, edit your recipe!</h3>
          <input type="text" placeholder="Edit Recipe Image" />
          <button class="add-image">Attach File</button>
          <input id='name' type="text" placeholder="${rawData.recipeName}" />
          <input id='desc'type="text" placeholder="${rawData.recipeDesc}" />
          <input id='time' type="text" placeholder="${rawData.recipeTime}" />
          <input id='serv' type="text" placeholder="${rawData.recipeServs}" />
          <h3>Enter Ingredients:</h3>
          <input id='ing1' type="text" placeholder="${rawData.recipeIng1}" />
          <input id='ing2' type="text" placeholder="${rawData.recipeIng2}" />
          <input id='ing3' type="text" placeholder="${rawData.recipeIng3}" />
          <h3>Enter Instructions:</h3>
          <input id='ins1' type="text" placeholder="${rawData.recipeIns1}" />
          <input id='ins2' type="text" placeholder="${rawData.recipeIns2}" />
          <input id='ins3' type="text" placeholder="${rawData.recipeIns3}" />
        </div>
        <button id='edit' class="create-edit-btn">Submit Changes</button>
      </div>`;
    updateRecipe(id);
    return editPage;
  };

  var _getViewRecipe = function (
    id,
    recipeName,
    recipeDesc,
    recipeTime,
    recipeServs,
    ingred1,
    ingred2,
    ingred3,
    instr1,
    instr2,
    instr3
  ) {
    let viewRecipe = `<div class="view-recipe">
        <div class="image-text">
          <h3 class="vertical-text">${recipeName}</h3>
          <div class="dish-image"></div>
          <div class="recipe-desc">
            <h3>Description:</h3>
            <div class="description">
            ${recipeDesc}
            </div>
            <h4>Total Time:</h4>
            <div class="time">${recipeTime}</div>
            <h4>Servings:</h4>
            <div class="servings">${recipeServs}</div>
          </div>
        </div>
        <div class="text-cont">
          <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul style="list-style-type: none;">
              <li>${ingred1}</li>
              <li>${ingred2}</li>
              <li>${ingred3}</li>
            </ul>
          </div>
          <div class="instructions">
            <h3>Instructions:</h3>
            <ul>
              <li>
               ${instr1}
              </li>
              <li>
                ${instr2}
              </li>
              <li>${instr3}</li>
            </ul>
          </div>
          <button class="edit-btn">Edit Recipe</button>
        </div>
      </div>`;
    goToEdit(id);
    return viewRecipe;
  };

  return {
    getHomePage: _getHomePage,
    getRecipePage: _getRecipePage,
    getLoginPage: _getloginPage,
    getCreatePage: _getCreatePage,
    getEditPage: _getEditPage,
    getViewPage: _getViewRecipe,
    initFirebase: _initFirebase,
    getData: _getData,
    addRecipe: _addRecipe,
    deleteRecipe: _deleteRecipe,
    checkRecipe: _checkRecipe,
    updateRecipe: _updateRecipe,
  };
})();
