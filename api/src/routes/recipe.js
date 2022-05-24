const { Router } = require("express");
const { getAllRecipe, getRecipebyID, postNewRecipe, getRecipeByName } = require("../controllers/recipe");

const router = Router();



router.get("/", getAllRecipe);

router.get("/name", getRecipeByName);

router.get("/:id", getRecipebyID);

router.post("/", postNewRecipe);


module.exports = router;