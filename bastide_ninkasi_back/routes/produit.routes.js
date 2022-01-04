const router = require('express').Router();
const produitController = require("../controllers/produit.controller");


//Produit database
// Chemin pour tous les produits
router.get("/", produitController.getAllProduit);
//chemin pour 1 seul produit
router.get("/:id", produitController.produitInfo);
// Chemin pour fair une update produit
router.put("/:id", produitController.updateProduit);
//Chemin pour effacer un produit
router.delete("/:id", produitController.deleteProduit);
//Chemin pour ajouter un produit
router.post("/ajout", produitController.addProduit);

module.exports = router;