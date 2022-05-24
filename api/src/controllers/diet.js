const { default: axios } = require("axios");
require("dotenv").config();
const { API_URL } = process.env;
const { Diet } = require("../db");

const getDietsTypes = async (req, res) => {
  const allDiets = await axios.get(
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=3acfcb58bb1d44ba86ca5af2eec7566f&addRecipeInformation=true"
  );
  const diets = allDiets.data?.results.map((diet) => diet.diets);
  const flatDiets = diets.flat().concat("vegetarian");
  const finalList = [...new Set(flatDiets)];

  finalList.forEach((e) => {
    Diet.findOrCreate({
      where: { name: e },
    });
  });

  const allDietready = await Diet.findAll();
  
  res.json(allDietready);
};

module.exports = {
  getDietsTypes,
};
