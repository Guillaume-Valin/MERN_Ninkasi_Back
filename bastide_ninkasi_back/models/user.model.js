const mongoose = require('mongoose');
const { isEmail, isAlpha, isStrongPassword, isMobilePhone, isPostalCode } = require('validator');
const bcrypt = require('bcrypt');
const {signInErrors} = require('../utils/errors.utils')

const userSchema = new mongoose.Schema(
    {
        // civiliteClient:{
        //     type: String,
        //     required: true,
        // },
        nomClient:{
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 30,
            validate:[isAlpha],
        },
        prenomClient:{
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 30,
            validate:[isAlpha],
        },
        pseudoClient:{
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true
        },
        emailClient:{
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            validate:[isEmail],
        },
        passwordClient:{
            type:String,
            required: true,
            trim: true,
            maxlength: 1024,
            validate:[isStrongPassword]
        },
        telephoneClient:{
            type: String,
            required: true,
            trim: true,
            validate:[isMobilePhone, 'fr-FR']
        },
        statutUser:{
            type: String,
            default:'user'
        },
        adresseClient:{
            type: String,
            required: true,
            maxlength: 200,
            minlength: 3
        },
        codePostalClient:{
            type: String,
            required: true,
            // validate:[isPostalCode, 'EE'],
        },
        villeClient:{
            type: String,
            required:true,
            validate:[isAlpha],
            minlength: 2,
            maxlength:30,
        },
        // checkmail:{
        //     type: Boolean,
        //     required: true,
        // }

    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.passwordClient = await bcrypt.hash(this.passwordClient, salt);
    next();
});

userSchema.statics.login = async function (emailClient, passwordClient){
    const user = await this.findOne({emailClient});
  
        const auth = await bcrypt.compare(passwordClient, user.passwordClient);
        if(auth){
            return user;
        }
        throw Error('Mot de passe incorrect')
    }

    
    


const userModel = mongoose.model('user', userSchema);
module.exports = userModel;