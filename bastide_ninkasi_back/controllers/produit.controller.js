const ProduitModel = require ('../models/produit.model');
const ObjectID = require('mongoose').Types.ObjectId;

// Ajouter un produit
module.exports.addProduit = async (req, res) =>
{
    console.log(req.body)
    const {body} = req

    try
    {
        const user = await ProduitModel.create(body);
        res.status(201).json({user: user._id});
    }
    catch(err)
    {
        const errors = addProduitErrors(err);
        res.status(200).send({errors})
    }
}

// Sélectionner tous les produits

module.exports.getAllProduit = async (req, res) => {
    const produits = await ProduitModel.find();
    res.status(200).json(produits)
};

// Afficher un seul ID

module.exports.produitInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(404).send('Invalid ID :' + req.params.id)

    ProduitModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('Invalid ID :' + err);
    })
};

// Modifier les infos d'un ID

module.exports.updateProduit = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(404).send('Invalid ID :' + req.params.id)

    try {
        const newUpdate = await ProduitModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: req.body
            },
            {new: true, upsert: true, setDefaultOnInsert: true},
        );
        return res.status(200).json(newUpdate)
    }
    catch(err){
        return res.status(404).json({message: err});
    }
};

// Supprimer un ID

module.exports.deleteProduit= async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(404).send('Invalid ID :' + req.params.id);

    try {
        await ProduitModel.remove({ _id: req.params.id}).exec();
        return res.status(200).json({message :'Successfuly deleted.'});
    }
    catch(err){
        return res.status(404).json({ message : err });
    }
}