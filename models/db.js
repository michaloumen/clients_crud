const mongoose = require('mongoose');
require('dotenv').config();
require('./client.model');

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true, useFindAndModify: false},(err) => {
    if(!err){ console.log("MongoDB Connection Succeeded");}
    else{
        console.log("An Error Occured");
    } 
})

