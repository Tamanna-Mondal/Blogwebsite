const mongoose = require ('mongoose');
const User = require("../models/users");
const initData = require('./data');
const mongo_URL='mongodb://127.0.0.1:27017/blogweb';
main().then(()=>{
    console.log('database connected')
}).catch((err) =>{
    console.log(err);
})
async function main() {
    mongoose.connect(mongo_URL);
}

const init = async() =>{
    // await User.deleteMany({});
    console.log("Data being inserted:", initData);
    await User.insertMany(initData);
    
}

init();