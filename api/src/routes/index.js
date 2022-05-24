const { Router } = require('express');
const router = Router();

router.use("/recipe", require("./recipe"))
router.use("/diet", require("./diet"))


module.exports = router;

//GET    http://localhost:3001/recipe
//GET    http://localhost:3001/recipe/name/?name=Nigerian
//GET   http://localhost:3001/recipe/716426
//POST  http://localhost:3001/recipe
//GET   http://localhost:3001/diet/