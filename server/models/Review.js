// user reviews , user name 
const { Schema, model} = require('mongoose')

const reviewSchema = new Schema(
    {
        userReview: {
            type: String,
            required: true,
        
        },
        username: {
          type: String,
          required: true,
          unique: true,
        }
    },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

const Review = model('review', reviewSchema);

module.exports = Review;