const mongoose = require('mongoose');
const validator = require("email-validator");
const { isCpf } = require('iscpf');

const clientSchema = new mongoose.Schema({
    fullName:{
        type:String
    },
    email:{
        type:String
    },
    cpf:{
        type:String,
        required: true
    },
})

// custom validation for email
clientSchema.path('email').validate((val) => {
    return validator.validate(val);
},'Invalid Email');

// custom validation for cpf
clientSchema.path('cpf').validate((val) => {
    return isCpf(val);
});

mongoose.model('Client',clientSchema);