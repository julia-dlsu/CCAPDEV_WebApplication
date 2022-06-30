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
            console.log(filename);
            const result = await Inventory.findOne({name,filename, owner}).exec()
            console.log(result);
            if (result) throw Error('ITEM ALREADY EXSISTS')


            var itemPath = 'public/images/items';

            console.log(filename);
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
        //res.redirect('/');
    },
    
    addFavorite: async (req,res) =>{
        const name = req.query.refno;
        const owner = req.session.uname;
        try {
            const result = await Inventory.findOne({name, owner}).exec()
            //console.log(name,owner);
            //

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
            console.log(favItemName,favOwner);
            const favorite = await Favorite.findOne( {name:{$eq: favItemName}, owner:{$eq:favOwner}} ).exec();
            console.log(favorite);
            //Problem, di na nagtthrow pag walang mahanap.
            if (favorite){
                db.deleteOne(Favorite, item, function(flag) {
                    res.send(flag);
                    console.log(item.name + " has been removed from Favorites.");
                    return;
                })

            } //throw Error('Item already in Favorites!');//alert('Item is already in favorites!');
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
            //console.log(name,owner);

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
            console.log(SLItemName,SLOwner);
            const shoppingList= await ShoppingList.findOne( {name:{$eq: SLItemName}, owner:{$eq:SLOwner}} ).exec();
            console.log(shoppingList);
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
    /*
    updateItem: async (req, res) => {
        const { img: image } = req.files
        var filename = req.session.uname + '-' + image.name;
        var itemPath = 'public/images/items';

        console.log(filename);
        await image.mv(path.resolve(itemPath, filename));

        const item = {
            image: filename,
            description: req.body.description,
            quantity: req.body.qty,
            category: req.body.category,
            owner: req.session.user
        }
    }*/

    deleteItem: async (req,res) => {
        db.deleteOne(Inventory, req.query, function(flag) {
            res.send(flag)
        })
    },
    /**Search. 
    findItems: async (req,res) => {
        const item = req.body.name;
        const owner = req.session.uname;
        db.findMany(Inventory,{item,owner},function(err){
            res.send(err);
        })

        
        MyModel.find({$text: {$search: searchString}})
       .skip(20)
       .limit(10)
       .exec(function(err, docs) { ... });
 
    } */

    getItem: async (req, res) => {
        // TODO: render the item here
        // const itemID = req.params.id;
        // console.log(itemID);
    }
}

module.exports = controller
