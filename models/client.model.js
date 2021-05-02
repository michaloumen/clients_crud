const mongoose = require('mongoose');
var validator = require("email-validator");
const { isCpf } = require('iscpf')

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

clientSchema.path('cpf').validate((val) => {
    return isCpf(val);
});

mongoose.model('Client',clientSchema);