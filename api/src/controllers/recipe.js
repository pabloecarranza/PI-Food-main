const { getAllRecipes } = require("./utils");
const { Recipe, Diet } = require("../db");

//GET http://localhost:3001/recipe
const getAllRecipe = async (req, res) => {
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

//http://localhost:3001/recipe/name/?name=Homemade
const getRecipeByName = async (req, res) => {
  const { name } = req.query;
  const recipesTotal = await getAllRecipes();
  if (name) {
    let recipeTitle = await recipesTotal.filter((r) =>
      r.title.toLowerCase().includes(name.toLowerCase())
    );
    recipeTitle.length
      ? res.status(200).json(recipeTitle)
      : res.status(404).send("This recipe doesn't exist -.-");
  } else {
    res.status(200).json(recipesTotal);
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
    "title": "Ravioles Duros",
    "summary": "revuelta de papa con arroz",
    "aggregateLikes": 4,
    "healthScore": 10,
    "analyzedInstructions": "que se yo",
    "image": "https://www.diariamenteali.com/medias/comida-divertida-para-tus-hijos-1900Wx500H?context=bWFzdGVyfGltYWdlc3wxOTA5NTh8aW1hZ2UvanBlZ3xoNjgvaDE5LzkwNzQyODkwNDk2MzAvY29taWRhLWRpdmVydGlkYS1wYXJhLXR1cy1oaWpvc18xOTAwV3g1MDBIfGM2NjhjZTUxZTUyZjdhYjczNTk0NTRhNmI3NjVjZmRkMTYyMTQ4MThlZGFlZTcyMjQ5ZWRlMTRiYWU4NmQyYTY",
    "diets": [
            {
                "name": "gluten free"
            },
            {
                "name": "dairy free"
            },
            {
                "name": "paleolithic"
            },
            {
                "name": "primal"
            },
            {
                "name": "whole 30"
            }
        ]
}

{
    "title": "Ravioles Duros",
    "summary": "revuelta de papa con arroz",
    "aggregateLikes": 4,
    "healthScore": 10,
    "analyzedInstructions": "que se yo",
    "image": "image.jpg",
    "diets": "gluten free, dairy free, paleolithic, lacto ovo vegetarian"
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
    diets
  } = req.body;
  let newRecipe = await Recipe.create({
    title,
    summary,
    aggregateLikes,
    healthScore,
    analyzedInstructions,
    image,
  });
  if (!title || !summary) {
    return res.json("Title and summary are required to create a recipe");
  }
  let dietDb = await Diet.findAll({ where: { name: diets } });
  
  newRecipe.addDiet(dietDb);


  res.send("Recipe created");
};

module.exports = {
  getAllRecipe,
  getRecipebyID,
  postNewRecipe,
  getRecipeByName,
};
