// require packages
const express = require("express");
const exphbs = require("express-handlebars");

// create instance of express
const app = new express();

// to serve static files
app.use(express.static('public'));

const port = 3000;
app.listen(port, function(){
    console.log("listening to port " + port);
});

// set link to public folder
app.use(express.static(__dirname + "/public"));

// set handlebars as the apps view engine
app.set("view engine", "hbs");
app.engine("hbs", exphbs.engine({
    extname: "hbs", 
    defaultLayout: "main"
}));

// NECESSARY ROUTING METHODS
app.get("/", function(req, res){
    res.send("Rooster Bradshaw is the hottest person alive <3");
});

// loads inventory page
app.get("/inventory", function(req, res) {
    res.render("inventory", {
        title: "Inventory",
        style: "inventory.css",
        activeI: "active",
        item: [
            {
                image: "item-1.png",
                itemName: "Gardenia White Bread - Regular Size",
                itemCategory: "Breads & Pastries",
                itemQty: 3
            },
            {
                image: "item-2.png",
                itemName: "Coca Cola in Can",
                itemCategory: "Beverages",
                itemQty: 12
            }
        ]
    });
});

// loads favorites page
app.get("/favorites", function(req, res) {
    res.render("favorites", {
        title: "Favorites",
        style: "favorites.css",
        activeF: "active",
        favorite: [
            {
                image: "item-1.png",
                itemName: "Gardenia White Bread - Regular Size",
                itemCategory: "Breads & Pastries",
                itemQty: 3
            },
            {
                image: "item-2.png",
                itemName: "Coca Cola in Can",
                itemCategory: "Beverages",
                itemQty: 12
            }
        ]
    });
});

// loads shopping page
app.get("/shopping", function(req, res) {
    res.render("shopping", {
        title: "Shopping",
        style: "shopping.css",
        activeS: "active",
        shopping: [
            {
                image: "item-1.png",
                itemName: "Gardenia White Bread - Regular Size",
                itemCategory: "Breads & Pastries",
            },
            {
                image: "item-2.png",
                itemName: "Coca Cola in Can",
                itemCategory: "Beverages",
            }
        ]
    });
});

// loads an item page, "/item" has to be replaced with ID
app.get("/item", function(req, res) {
    res.render("item", {
        style: "items.css",
        activeI: "active",
        item:
            {
                image: "item-1.png",
                itemName: "Gardenia White Bread - Regular Size",
                itemCategory: "Breads & Pastries",
                itemDescription: "Gardenia white bread slices is a staple for breakfast and many more foods in a household. This is mostly used for tuna and nutella sandwiches.",
                itemQty: 3,
                itemMqty: 2
            }
    });
});

// loads an profile page, "/profile" has to be replaced with ID
app.get("/profile", function(req, res) {
    res.render("profile", {
        style: "profile.css",
        script: "profile.js",
        profile:
            {
                image: "profilepic.png",
                userName: "Taylor Alison Swift",
                userEmail: "taylorswift@gmail.com"
            }
    });
});