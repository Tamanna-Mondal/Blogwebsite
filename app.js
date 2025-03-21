const express = require("express");
const app = express();

const methodOverride = require('method-override');
const Review = require('./models/reviews');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
const path = require('path');
app.use(methodOverride("_method"));

app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const Users = require ('./models/users');
const ejeMate = require('ejs-mate')
app.engine('ejs' , ejeMate);
//database ..>
const mongoose = require ('mongoose');
const User = require("./models/users");
const mongo_URL='mongodb://127.0.0.1:27017/blogweb';
main().then(()=>{
    console.log('database connected');
}).catch((err) =>{
    console.log(err);
})
async function main() {
    mongoose.connect(mongo_URL);
}

//create 

app.get('/byteblog/new', (req , res) =>{
    res.render('blogs/new.ejs')
})
app.post('/byteblog' , async(req,res) =>{
    // console.log(req.body)
    try{
        const newblog = new Users(req.body);
        await newblog.save();
        res.redirect('/byteblog');
    }catch(err){
        next(err);
    }
    
})

//delete...
app.delete('/byteblog/:id' , async(req,res) =>{
    let {id} = req.params;
    // console.log(``)
    await Users.deleteOne({_id: id});
    res.redirect('/byteblog');
})

//update patch..>
app.get('/byteblog/:id/update' , async(req,res)=>{
    let {id} = req.params;
    let user = await Users.findById(id);
    res.render('blogs/edit.ejs', {user})
})
//updatins..>
app.patch('/byteblog/:id' , async(req,res) =>{
    let {id} = req.params;
    let {username , subject , content ,image} = req.body;
    console.log(req.body);
    await Users.findByIdAndUpdate(id, {username , subject , content ,image});
    console.log(username);
    res.redirect('/byteblog');
})


//show indiv ... get
app.get('/byteblog/:id/show',async (req,res) =>{
    let {id} = req.params;
    let blog = await Users.findById(id);
    res.render('blogs/show.ejs' , {blog});
   
})

//show all data --- get method . 
app.get('/byteblog' ,async(req,res)=>{
   let users= await Users.find({})
    res.render('blogs/index.ejs' , {users})
} );

//testing
app.get('/testing' ,async (req,res) => {
    let sample = {
        image:'https://th.bing.com/th/id/OIP.7FsDgas0kcH0W1ajb1rZEgHaHa?rs=1&pid=ImgDetMain',
        username:'tamanna',
        subject:'coding',
        content: ' I love coding !'
    }
    let testData = new User(sample)
    await testData.save();
    res.send('done');
})

//review page
app.get(('/listing/:id/reviews/:reviewid') , async(req,res)=>{
   let users = await Users.findById(req.params.id);
   let newreview =await new Review(req.body.reviews);
   console.log(newreview);
    res.send('hello' , {newreview});
    // let listing = await Listing.findById(req.params.id);
    // let newReview = new Review(req.body.review);
    // listing.reviews.push(newReview);

    // await newReview.save();
    // await listing.save();

    // res.redirect(`/listings/${listing.id}`); 

})
//error handelor..>
// app.all('*' , (err , req ,res ,next)=>{
//     let {statusCode = 500 , message = 'something wrong'} = err;
//     res.status(statusCode).send(err);
// });
// app.use((err , req, res , next)=>{
//     res.send('somethign went wrong !');
// })

//SERVER....>
app.listen( 8080 , ()=>{
    console.log("Server Working Properly");
})

