const express = require('express');
const router = express.Router({mergeParams :  true});
const Listing = require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const Review = require('../models/review.js');
const { validateReview } = require('../middleware.js');
const { isLoggedIn, isReviewAuthor } = require('../middleware.js');
const reviewController = require('../controllers/reviews.js');
const review = require('../models/review.js');

//Reviews (POST Route)
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.postReview));

//Delete Review Route
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;