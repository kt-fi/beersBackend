const beerController = require("../controllers/beerController");
const express = require("express");

const router = express.Router();

router.post("/createBeer", beerController.createBeer);
router.get("/getAllBeers", beerController.getAllBeers);
router.get("/getOneBeer/:beerId", beerController.getOneBeer);
router.delete("/deleteBeer", beerController.deleteBeer);
router.put("/editBeer/:beerId", beerController.editBeer);

router.get("/getBeers/filter", beerController.getBeersFilter)

module.exports = router;


