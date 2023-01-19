const express = require("express");
const path = require("path");
const app = express();
var mongoose= require('mongoose');
const bodyParser = require("body-parser")
mongoose.connect('mongodb+srv://saurabh:pass@cluster0.ehxpi65.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true});



//Define mongoose schema
var contactschema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    address: String,
    desc: String
});

//model compile kra hai
var Contact = mongoose.model('contact',contactschema);





// in views we will store our tempelated
// in static folder we will store all static files


//it is a express specific stuff
//code to serve static files
app.use('/static',express.static('static')) // for serving static files
app.use(express.urlencoded({extended:true}))


//pug specific stuff
//it is for using template
app.set('view engine','pug') // Set the template engine as pug // is code ka matlab hai ki app kon sa view engine use krna chahte hai
app.set('views',path.join(__dirname,'views')) // Set the views directory // is code ka matlab hai ki ap kon si directory se template read krna chahte hai

//EndPoints
app.get('/',(req,res)=>{
    
    const params= {}
    res.status(200).render('Home.pug',params);
})
app.get('/contact',(req,res)=>{
    
    const params= {}
    res.status(200).render('Contact.pug',params);
})

//post request aane pr saare post parameters ko lekar unhe database me store kr dena
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);// jab bhi koi post request aati hai then us req ki body se content extract krke ek naya contact object banalo aur fir us myData ko krdo save
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")   
    });// jab ham myData ko save krte hai to usse promise bhi krte hai vo promise then me likha hai and catch jab execute hota hai jab koi error hua ho
   // const params= {} ye wala method app.post ka tha but if you want to use express then upar wala method
    // res.status(200).render('Contact.pug');
})
//agar post request ko express se handle krwana chahte hai aur app.post ka use nhi krna chahte then aapko body parser install krna padega
let port=process.env.PORT;
if(port==null || port==""){
    port=8000;
}
//Start the server
app.listen(port, ()=>{
    console.log('App listening');
})




//tips and tricks
//to run server: in terminal nodemon .\app.js