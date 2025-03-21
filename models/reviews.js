const mongoose =  require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating:{
        type :String,
        
    },
        comment:String
    
});


module.exports = mongoose.model('Review' , reviewSchema);

