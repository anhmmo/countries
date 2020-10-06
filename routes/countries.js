const express = require("express");
const {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
  countryPhotoUpload,
} = require("../controllers/countries");

const Country = require("../models/Country");

const router = express.Router();

const customResults = require("../middleware/customResults");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/:id/photo")
  .put(protect, authorize("creator", "admin"), countryPhotoUpload);

router
  .route("/")
  .get(customResults(Country), getCountries)
  .post(protect, authorize("creator", "admin"), createCountry);

router
  .route("/:id")
  .get(getCountry)
  .put(protect, authorize("creator", "admin"), updateCountry)
  .delete(protect, authorize("creator", "admin"), deleteCountry);

module.exports = router;
