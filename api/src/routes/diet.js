const { Router } = require("express");
const router = Router();
const { getDietsTypes } = require('../controllers/diet')

router.get("/", getDietsTypes);

router.get("/:id", );

router.post("/", );


module.exports = router;