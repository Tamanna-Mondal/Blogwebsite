const mongoose = require ('mongoose');
const review = require('./reviews');
const userSchema= new mongoose.Schema({
    image:{
            type:String,
            default:'https://i.pinimg.com/736x/a9/2e/9e/a92e9eb85da155412b9c061acf9d4748.jpg',
           set:(v) => v ==="" ? 'https://i.pinimg.com/736x/a9/2e/9e/a92e9eb85da155412b9c061acf9d4748.jpg' : v
    },
    username:{
        type:String,
        required:true
    } ,
    subject:String,
    content:{
        type:String,
        required:true
    },

    
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] 


})

const User = mongoose.model('User' , userSchema);
module.exports=User;