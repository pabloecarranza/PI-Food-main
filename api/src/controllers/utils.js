require("dotenv").config();
const { default: axios } = require("axios");
const { Diet, Recipe } = require("../db");
const { API_KEY } = process.env;

const getRecipeAPI = async () => {
  const results = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`
  );

  const apiRecipes = await results.data.results.map((recipe) => {
    return {
      id: recipe.id,
      title: recipe.title,
      summary: recipe.summary,
      aggregateLikes: recipe.aggregateLikes,
      healthScore: recipe.healthScore,
      analyzedInstructions: recipe.analyzedInstructions,
      image: recipe.image,
      diets: recipe.diets.map((e) => {
        return { name: e };
      }),/* 
      steps: e.analyzedInstructions[0]?.steps.map((e) => {
        return e.step;
      }),
      dishTypes: e.dishTypes.map((e) => {
        return { name: e };
      }), */
    };
  });
  return apiRecipes;
};

const datainDB = async () => {
  let recipeDB = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return recipeDB;
};

const getAllRecipes = async () => {
  const apiInfo = await getRecipeAPI();
  const dbInfo = await datainDB();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};

module.exports = {
  getRecipeAPI,
  datainDB,
  getAllRecipes,
};
