const db = require('../models/db.js');
const Acct = require('../models/Inventory');

const fileUpload = require('express-fileupload');
const express = require('express');
const mongoose = require('mongoose');

const fs = require('fs');

const path = require('path');
const app= express();
app.use(express.static('public'));

app.use(fileUpload()); // for fileuploading
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

exports.getInventory = function (req, res) {
  // TODO: load inventory items from DB

  res.render("inventory", {
    title: "Inventory",
    style: "inventory.css",
    script: ["pictureValidation.js"],
    activeI: "active"
    // TODO: inventory items to render here
  });
};

exports.addItem = async (req, res) => {
    console.log(req.body.name);
    // TODO: add item mechanisms here
};