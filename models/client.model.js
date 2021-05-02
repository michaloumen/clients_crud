const mongoose = require('mongoose');
const validator = require("email-validator");
const { isCpf } = require('iscpf')

const clientSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: 'This field is required'
    },
    email:{
        type:String,
        require: true
    },
    cpf:{
        type:String,
        require: true
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