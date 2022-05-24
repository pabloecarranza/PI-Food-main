const { getAllRecipes } = require("./utils");
const { Recipe, Diet } = require("../db");

//GET http://localhost:3001/recipe
const getAllRecipe = async (req, res) => {
  console.log("aaaaaaaaaa");
  const title = req.body.title;
  let fullRecipes = await getAllRecipes();
  if (title) {
    let recipeTitle = await fullRecipes.filter((recipe) => {
      recipe.title.toLowerCase().incluides(title.toLowerCase());
    });
    recipeTitle.length
      ? res.status(200).send(recipeTitle)
      : res.status(404).send("recipe dont exists");
  } else {
    res.status(200).send(fullRecipes);
  }
};


//http://localhost:3001/recipe/name/?name=Nigerian
const getRecipeByName = async (req, res) => {
  console.log("bbbbbbbbbbbbbbb");
  const { name } = req.query;
  let fullRecipes = await getAllRecipes();

  if (name) {
    let recipeTitle = await fullRecipes.filter((r) =>
      r.title.toLowerCase().includes(name.toLowerCase())
    );

    console.log(recipeTitle);
    recipeTitle.length
      ? res.status(200).json(recipeTitle)
      : res.status(404).send("this recipe doesn't exist");
  } else {
    res.status(200).json(fullRecipes);
  }
};

// GET  http://localhost:3001/recipe/716426
const getRecipebyID = async (req, res) => {
  const { id } = req.params;
  let fullRecipes = await getAllRecipes();
  let recipeID = fullRecipes.find((recipe) => recipe.id == id);
  if (recipeID) {
    if (recipeID.id == id) {
      res.status(200).send(recipeID);
    }
  } else {
    res.status(404).send("recipe dont Exists");
  }
};

// POST http://localhost:3001/recipe
/* 
  body => raw => JSON 
{
    "title": "Arroz con Papa",
    "summary": "revuelta de papa con arroz",
    "aggregateLikes": 4,
    "healthScore": 10,
    "analyzedInstructions": "que se yo",
    "image": "image.jpg"
}

*/
const postNewRecipe = async (req, res) => {
  let {
    title,
    summary,
    aggregateLikes,
    healthScore,
    analyzedInstructions,
    image,
  } = req.body;
  let newRecipe = await Recipe.create({
    title,
    summary,
    aggregateLikes,
    healthScore,
    analyzedInstructions,
    image,
  });

  console.log("Recipe inserted in DB", newRecipe);

  res.send("Recipe created");
};

module.exports = {
  getAllRecipe,
  getRecipebyID,
  postNewRecipe,
  getRecipeByName,
};
