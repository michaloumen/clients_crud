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
    const client = new Client();

    client.fullName = req.body.fullName;

    client.email = req.body.email;

    client.cpf = req.body.cpf;

    client.save((err) => {
        if(!err){
            res.redirect('client/list');
        }
        else{
            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req,res)
{
    Client.findOneAndUpdate({_id:req.body._id,},req.body,{new:true},(err) => {
        if(!err){
            res.redirect('client/list');
        }
        else{
                console.log("Error occured in Updating the records" + err);
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
    Client.findByIdAndRemove(req.params.id,(err) => {
        if(!err){
            res.redirect('/client/list');
        }
        else{
            console.log("An error occured during the Delete Process" + err);
        }
    })
})

module.exports = router;