const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Country = require("../models/Country");

// @desc      Get all countries
// @route     GET /api/v1/countries
// @access    Public
exports.getCountries = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.customResults);
});

// @desc      Get single country
// @route     GET /api/v1/countries/:id
// @access    Public
exports.getCountry = asyncHandler(async (req, res, next) => {
  const country = await Country.findById(req.params.id);

  if (!country) {
    return next(
      new ErrorResponse(`country not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: country });
});

// @desc      Create new country
// @route     POST /api/v1/countries
// @access    Private
exports.createCountry = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  // Check for published country
  const publishedCountry = await Country.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one country
  if (publishedCountry && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already published a country`,
        400
      )
    );
  }

  const country = await Country.create(req.body);

  res.status(201).json({
    success: true,
    data: country,
  });
});

// @desc      Update country
// @route     PUT /api/v1/countries/:id
// @access    Private
exports.updateCountry = asyncHandler(async (req, res, next) => {
  let country = await Country.findById(req.params.id);

  if (!country) {
    return next(
      new ErrorResponse(`country not found with id of ${req.params.id}`, 404)
    );
  }

  if (!country.user) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this country`,
        401
      )
    );
  }

  // Make sure user is country owner
  if (country.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this country`,
        401
      )
    );
  }

  country = await Country.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: country });
});

// @desc      Delete country
// @route     DELETE /api/v1/countries/:id
// @access    Private
exports.deleteCountry = asyncHandler(async (req, res, next) => {
  const country = await Country.findById(req.params.id);

  if (!country) {
    return next(
      new ErrorResponse(`country not found with id of ${req.params.id}`, 404)
    );
  }
  if (!country.user) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this country`,
        401
      )
    );
  }
  // Make sure user is country owner
  if (country.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this country`,
        401
      )
    );
  }

  await country.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc      Upload photo for country
// @route     PUT /api/v1/countries/:id/photo
// @access    Private
exports.countryPhotoUpload = asyncHandler(async (req, res, next) => {
  const country = await Country.findById(req.params.id);

  if (!country) {
    return next(
      new ErrorResponse(`country not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is country owner
  if (
    (!country.user || country.user.toString() !== req.user.id) &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this country`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Country.findByIdAndUpdate(req.params.id, { flag: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
