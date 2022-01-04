const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require ('../controllers/user.controller');

// router pour enregistrement client
router.post("/register", authController.signUp);
//Pour connection user
router.post("/login", authController.signIn);
//pour déconnexion user
router.get("/logout", authController.logOut);


//user database
// Chemin pour tous les utilisateur
router.get("/", userController.getAllUsers);
//chemin pour 1 seul utlisateur
router.get("/:id", userController.userInfo);
// Chemin pour fair une update user
router.put("/:id", userController.updateUser);
//Chemin pour effacer un user
router.delete("/:id", userController.deleteUser);


module.exports = router;