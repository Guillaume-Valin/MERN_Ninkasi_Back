const UserModel = require ('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;


// Sélectionner tous les users
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-passwordClient -statutUser');
    res.status(200).json(users);
};

// Sélectionner un user par ID

module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(404).send('Invalid ID :' + req.params.id);

    UserModel.findById(req.params.id, (err, docs) =>
    {
        if(!err) res.send(docs);
        else console.log ('Invalid ID :' + err);
    }).select('-passwordClient -statutUser');
};

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(404).send('Invalid ID :' + req.params.id);

    try {
        const newUpdate = await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: req.body
            },
            {new: true , upsert : true, setDefaultsOnInsert: true},
        ).select('-passwordClient -statutUser');
        return res.status(200).json(newUpdate)
    }
    catch(err){
        return res.status(404).json({ message : err });
    }
};

module.exports.deleteUser= async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(404).send('Invalid ID :' + req.params.id);

    try {
        await UserModel.remove({ _id: req.params.id}).exec();
        return res.status(200).json({message :'Successfuly deleted.'});
    }
    catch(err){
        return res.status(404).json({ message : err });
    }
}