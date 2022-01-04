module.exports.signUpErrors = (err) => {
    console.log(err);
    let errors = {pseudoClient: "", emailClient:"", passwordClient:""};

    if (err.message.includes("pseudoClient"))
        errors.pseudoClient = "Pseudo incorrect ou déjà pris";

    if (err.message.includes("emailClient"))
        errors.emailClient = "Email incorrect";

    if (err.message.includes("passwordClient"))
        errors.passwordClient = "Le mot de passe doit contenir 8 caractères minimum, 1 majuscule, 1 minuscule et 1 chiffre";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudoClient"))
        errors.pseudoClient = "Ce pseudo est déjà pris";

        if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("emailClient"))
        errors.emailClient = "Cet email est déjà utilisé";
    
    return errors;
    
};

module.exports.signInErrors = (err) => {
    console.log(err);
    let errors = {emailClient:"", passwordClient:""};
     if(err.message.includes("emailClient"))
        errors.emailClient = 'bah alors, ça marche pas';
    if (err.message.includes("passwordClient"))
        errors.passwordClient = "Le mot de passe est incorrect";
    
    return errors
};