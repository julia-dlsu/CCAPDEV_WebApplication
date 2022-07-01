const Favorites = require('../models/Favorites')
const db = require('../models/db')

const controller = {
    // renders the favorite items of user
    getFavorites: async (req, res) => {
        const owner = req.session.uname;

        try {
            const faves = await Favorites.find({owner}).lean().exec();
            
            res.render("favorites", {
                title: "Favorites",
                style: "favorites.css",
                script: ["pictureValidation.js", "favorites.js"],
                activeF: "active",
                faves
            });
        } catch (err) {
            console.error(err)
            res.status(500)
        }
    },

    // deletes an item in favorites
    deleteFave: function (req, res) {
        toDelete = {
            name: req.query.name,
            owner: req.session.uname
        };
        
        // delete the item in favorites DB
        db.deleteOne(Favorites, toDelete, function() {
            res.redirect('/favorites');
        });
    },

    // searches for an item in favorites using name or category
    searchFave: async (req, res) => {
        const search = req.body.search; // get the keyword
        const faves = await Favorites.find({
            $or: [
                { name: {$regex: search, $options: 'i'} },
                { category: {$regex: search, $options: 'i'} }
            ]
        }).lean().exec();

        if (search){ // if search bar is not empty
            res.render("favorites", {
                title: search + " | Favorites",
                style: "favorites.css",
                script: ["pictureValidation.js", "favorites.js"],
                activeF: "active",
                faves
            });
        }
        else { // if search bar is empty
            res.redirect('/favorites');
        }
   }
};

module.exports = controller