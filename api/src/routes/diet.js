const { Router } = require("express");
const router = Router();
const { getDietsTypes,  getRecipesbyDiets} = require('../controllers/diet')


router.get("/", getDietsTypes);

router.get("/types", getRecipesbyDiets);


router.get("/:id", );

router.post("/", );


module.exports = router;