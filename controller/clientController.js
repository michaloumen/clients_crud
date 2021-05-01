const express = require('express');

const mongoose = require('mongoose');

const Client = mongoose.model('Client');

const router = express.Router();

router.get("/",(req,res) => {
    res.render("client/addOrEdit",{
        viewTitle:"Insert Client"
    })
})

router.post("/",(req,res) => {
    if(req.body._id == "")
    {
    insertRecord(req,res);
    }
    else{
        updateRecord(req,res);
    }
})

function insertRecord(req,res)
{
   var client = new Client();

   client.fullName = req.body.fullName;

   client.email = req.body.email;

   client.cpf = req.body.cpf;

   client.save((err,doc) => {
       if(!err){
        res.redirect('client/list');
       }
       else{
           
          if(err.name == "ValidationError"){
              handleValidationError(err,req.body);
              res.render("client/addOrEdit",{
                  viewTitle:"Insert Client",
                  client:req.body
              })
          }

          console.log("Error occured during record insertion" + err);
       }
   })
}

function updateRecord(req,res)
{
    Client.findOneAndUpdate({_id:req.body._id,},req.body,{new:true},(err,doc) => {
        if(!err){
            res.redirect('client/list');
        }
        else{
            if(err.name == "ValidationError")
            {
                handleValidationError(err,req.body);
                res.render("client/addOrEdit",{
                    viewTitle:'Update Client',
                    client:req.body
                });
            }
            else{
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/list',(req,res) => {

    Client.find((err,docs) => {
        if(!err) {
            res.render("client/list",{
               list:docs
            })
        }
    })
})

router.get('/:id',(req,res) => {
    Client.findById(req.params.id,(err,doc) => {
        if(!err){
            res.render("client/addOrEdit",{
                viewTitle: "Update Client",
                client: doc
            })
        }
    })
})

router.get('/delete/:id',(req,res) => {
    Client.findByIdAndRemove(req.params.id,(err,doc) => {
        if(!err){
            res.redirect('/client/list');
        }
        else{
            console.log("An error occured during the Delete Process" + err);
        }
    })
})

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path){
        case 'fullName':
              body['fullNameError'] = err.errors[field].message;
              break;
        
        case 'email':
              body['emailError'] = err.errors[field].message;
              break;

        default:
           break;
        }
    }
}

module.exports = router;