const mongoose = require('mongoose');
var validator = require("email-validator");

var clientSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: 'This field is required'
    },
    email:{
        type:String
    },
    cpf:{
        type:String,
    },
})

// custom validation for email
clientSchema.path('email').validate((val) => {
    return validator.validate(val);
},'Invalid Email');

mongoose.model('Client',clientSchema);