const Inventory = require('../models/Inventory')
const path = require('path')
const fs = require('fs');

const controller = {
    getInventory: async function (req, res) {
        try {
            const items = await Inventory.find().lean().exec()
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

    addItem: async (req, res) => {
        const name = req.body.name

        try {
            const result = await Inventory.findOne({ name }).exec()
            console.log(result);
            if (result) throw Error('ITEM ALREADY EXSISTS')

            const { img: image } = req.files
            var filename= req.session.uname+'-'+image.name;
            var itemPath = 'public/images/items';

            console.log(filename);
            await image.mv(path.resolve(itemPath,filename));
            
            const item = {
                name: req.body.name,
                image: filename,
                description: req.body.description,
                quantity: req.body.qty,
                category: req.body.category,
                owner: req.session.user
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
    }
}

module.exports = controller
