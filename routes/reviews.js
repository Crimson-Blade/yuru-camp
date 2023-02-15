
const {Router}  = require('express');
const router = Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review');
const Campground = require('../models/campground');
const ExpressError = require('../utils/ExpressError');
const { reviewValidationSchema} = require('../schemas');

//Validation Middleware
const validateReview = (req,res,next) => {
  const {error} = reviewValidationSchema.validate(req.body);
  if(error){
      const msg = "Joi: " + error.details.map(el => el.message).join(',');
      throw new ExpressError(msg,400)
  }
  else next();
}

// Review Routes
router.post('/',validateReview, catchAsync(async (req, res) => {
  console.log(req.params.id);
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    await review.save();
    campground.reviews.push(review);
    await campground.save();
    req.flash('success', 'Successfully made a new review!');
    res.redirect(`/campgrounds/${campground._id}`);
}))
router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;