const ShoppingList = require('../models/ShoppingList');
const Inventory = require('../models/Inventory')
const db = require('../models/db');

const controller={

    getShopping: async function(req,res){
        const owner = req.session.uname;
            try {
                const shopping = await ShoppingList.find({owner}).lean().exec()
                res.render("shopping", {
                    title: "Shopping List",
                    style: "shopping.css",
                    script: ["pictureValidation.js", "shopping.js"],
                    activeS: "active",
                
                    shopping         
                
                })
            } catch (err) {
                console.error(err)
                res.status(500)
            }
    
    },

    deleteShop: function (req, res) {
        toDelete = {
            name: req.query.name,
            owner: req.session.uname
        };
        console.log(req.query.name);
        // delete the item 
        Inventory.findOneAndUpdate(toDelete, {shopping: false}).exec()
        db.deleteOne(ShoppingList, toDelete, function() {
            res.redirect('/shopping');
        });
    },

    searchList:  async (req, res) => {
        const search = req.body.search; // get the keyword
        const shopping = await ShoppingList.find({
            $or: [
                { name: {$regex: search, $options: 'i'} },
                { category: {$regex: search, $options: 'i'} }
            ]
        }).lean().exec();

        if (search){ // if search bar is not empty
            res.render("shopping", {
                title: search + " | Shopping List",
                style: "shopping.css",
                script: ["pictureValidation.js", "shopping.js"],
                activeS: "active",
                shopping
            });
        }
        else { // if search bar is empty
            res.redirect('/shopping');
        }
    },

    clearList:  function(req,res){
        const owner = req.session.uname;
        Inventory.updateMany({owner}, {shopping: false}).exec()
        db.deleteMany(ShoppingList,{owner}, function(){
         res.redirect('/shopping')
        })
    },

    //not sure why console.log says document modified is undefined. works on mongoDB 
    //every click of minus/plus updates needed quantity in the db
    updateNeedQuan:  function(req,res){
        
        const newQty= req.query.neededQty;
        var toUp={name:req.query.name, owner: req.session.uname}
        db.updateOne(ShoppingList, toUp, {$set: {neededQty:newQty}}, function(){
            res.redirect('/shopping');
        })
        
        
    },

    renderQuans: function(req,res){
        var name =req.query.name;
        var owner = req.session.uname;
        
        var find = {name:name, owner:owner};
        try{
            db.findOne(ShoppingList,find,'neededQty',function(result){
                res.send(String(result.neededQty));
            })
        }catch{
            res.redirect('/shopping')
        }
   
    }
    
}

module.exports = controller;
