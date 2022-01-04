const mongoose = require('mongoose');


const produitSchema = new mongoose.Schema({

    categorie:{
        type: String,
        required: true,
        trim: true,
    },
    nomProduit:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    provenance:{
        type: String,
        required: true,
        trim: true,
    },
    annee:{
        type: Number,
        required: true,
        trim: true,
        maxlength: 4,
        minlength: 4,
    },
    volume:{
        type: Number,
        required: true,
        trim: true,
    },
    prix:{
        type: Number,
        required: true,
        trim: true,
    },
    imgProduit:{
        type: String,
        required: true,
        trim: true,

    }
},
{
    timestamps: true,
}

);

const produitModel = mongoose.model('produit', produitSchema);
module.exports = produitModel;