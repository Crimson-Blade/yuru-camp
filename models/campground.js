const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});
// Delete all reviews associated with the campground
CampgroundSchema.post('findOneAndDelete', async (doc)=>{
    if(doc){
        console.log("Deleted!");
        await Review.deleteMany({
            _id:{
                $in:doc.reviews,
            }
        })
    }
})
module.exports = mongoose.model('Campground', CampgroundSchema);