const db = require('..//models/db.js');
const item = require('../models/item');
const Acct = require('../models/Acct');

const fileUpload = require('express-fileupload');
const express = require('express');
const mongoose = require('mongoose');


const bodyParser = require('body-parser');

const path = require('path');

const app= express();
app.use(express.static('public'));

app.use(fileUpload()); // for fileuploading
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

exports.addItem = (req, res) =>{
    var name = req.body.itemName
    console.log(req);
    item.findOne({$or : [{itemName : name}]}, async function(err,result){

        if(err){
            req.flash('errMessage',"Please try again.");
            res.redirect('/inventory');
        }
        if(!result){
            try{
                const{image} = req.files
                image.mv(path.resolve('public/images/inventory',image.name), function(err){
                    if(err){
                        req.flash('error_msg', 'Something happened! Please try again.');     
                        res.redirect('/inventory');
                    }
                    addItem.create({
                        ...req.body,        
                        image:'/images/'+image.name
                    })

                })
                res.redirect('/inventory');
            }
            catch{
                res.redirect('/inventory');
            }
        }
        else{
            req.flash('errMessage',"Item already exists!");
            res.redirect('/inventory');
        }
    })
    console.log("Haha");
}