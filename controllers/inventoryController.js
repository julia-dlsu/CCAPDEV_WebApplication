const Inventory = require('../models/Inventory')
const Favorite = require('../models/Favorites')
const ShoppingList = require('../models/ShoppingList')
const db = require('../models/db')
const path = require('path')

const controller = {
    getInventory: async function (req, res) {
        const owner = req.session.uname;
        try {
            const items = await Inventory.find({owner}).lean().exec()
            
            res.render("inventory", {
                title: "Inventory",
                style: "inventory.css",
                script: ["pictureValidation.js", 'inventory.js'],
                activeI: "active",
                items,
            })
        } catch (err) {
            console.error(err)
            res.status(500)
        }
    },
    /**Change: added session to addItem findOne. */
    addItem: async (req, res) => {
        const name = req.body.name
        const owner = req.session.uname;
        try {
            const { img: image } = req.files
            var filename = req.session.uname + '-' + image.name;
            const owner = req.session.uname;
            
            const result = await Inventory.findOne({name,filename, owner}).exec()
            
            if (result) throw Error('ITEM ALREADY EXSISTS')


            var itemPath = 'public/images/items';

            
            await image.mv(path.resolve(itemPath, filename));

            const item = {
                name: req.body.name,
                image: filename,
                description: req.body.description,
                quantity: req.body.qty,
                category: req.body.category,
                owner: req.session.uname
            }

            await Inventory.create(item)

            res.render('partials/card', {
                layout: false,
                ...item
            });


        } catch (err) {
            console.error(err);
            res.status(500)
        }
    },
    
    addFavorite: async (req,res) =>{
        const name = req.query.refno;
        const owner = req.session.uname;
        try {
            const result = await Inventory.findOne({name, owner}).exec()

            const item = {
                name: result.name,
                image: result.image,
                description: result.description,
                quantity: result.quantity,
                category: result.category,
                owner: req.session.uname
            }
            
            const favItemName = item.name;
            const favOwner = item.owner;
           
            const favorite = await Favorite.findOne( {name:{$eq: favItemName}, owner:{$eq:favOwner}} ).exec();
           
            if (favorite){
                db.deleteOne(Favorite, item, function(flag) {
                    res.send(flag);
                    console.log(item.name + " has been removed from Favorites.");
                    return;
                })

            } 
            else
                await Favorite.create(item)


        } catch (err) {
            console.error(err);
            res.status(500)
        }
    },

    addShoppingList: async(req,res) =>{
        const name = req.query.refno;
        const owner = req.session.uname;
        try {
            const result = await Inventory.findOne({name, owner}).exec()
            
            const item = {
                name: result.name,
                image: result.image,
                description: result.description,
                quantity: result.quantity,
                category: result.category,
                owner: req.session.uname
            }
            
            const SLOwner = item.owner;
            const SLItemName = item.name;
            const shoppingList= await ShoppingList.findOne( {name:{$eq: SLItemName}, owner:{$eq:SLOwner}} ).exec();
            //Problem, di na nagtthrow pag walang mahanap.
            if (shoppingList){
                db.deleteOne(ShoppingList, item, function(flag) {
                    res.send(flag);
                    console.log(item.name + " has been removed from Shopping List.");
                    return;
                })
            } 
            else
                await ShoppingList.create(item)


        } catch (err) {
            console.error(err);
            res.status(500)
        }
    },

    deleteItem: async (req,res) => {
        db.deleteOne(Inventory, req.query, function(flag) {
            db.deleteOne(Favorite, req.query,function(flag){
                db.deleteOne(ShoppingList, req.query, function(flag){
                    res.send(flag);
                })
            })
        })
        
    },

    findItems: async (req,res) => {

        const item = req.body.search;
        
        const items = await Inventory.find({
            $or: [
                { name: {$regex: item, $options: 'i'} },
                { category: {$regex: item, $options: 'i'} }
                ]
        }).lean().exec();
        if (item){ // if search bar is not empty
            res.render("inventory", {
                title: "Inventory",
                style: "inventory.css",
                script: ["pictureValidation.js", 'inventory.js'],
                activeI: "active",
                items
            })
        }
        else { // if search bar is empty
            res.redirect('/');
        }
        
    }, 
    
    getItem: async (req, res) => {
        // TODO: render the item here
        const itemID = req.params.id;
        const owner= req.session.uname;

        const result= await Inventory.findOne( {_id:{$eq: itemID}, owner:{$eq: owner}} ).exec();
        
        const item = {
            name: result.name,
            image: result.image,
            description: result.description,
            quantity: result.quantity,
            category: result.category,
        }

        res.render("item", {
            title: item.name+" item-page",
            style: "items.css",
            script: ["pictureValidation.js", 'inventory.js'],
            activeI: "active",
            item
        })
    },

    updateItem: async (req, res) => {
        
        const { img: image } = req.files
        var filename = req.session.uname + '-' + image.name;
        var itemPath = 'public/images/items';
        const name = req.body.name;
        const owner = req.session.uname

        if(image != undefined)
        await image.mv(path.resolve(itemPath, filename));

        var item={};
        if(req.body.description != undefined)
            item.description = req.body.description;
        if(req.body.quantity != "")
            item.quantity = req.body.qty;
        if(req.body.category != undefined)
            item.category = req.body.category;
        
        item.owner = owner;
        Inventory.findOneAndUpdate({name,owner},item,function(flag){
            res.send(flag)
        })
    }
    
}

module.exports = controller
