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
            })
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
    }
};

module.exports = controller
