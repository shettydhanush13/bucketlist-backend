const Users = require('../../db/mongo/models/userdetails');

module.exports = {
    getAllUsers : async (req, res, next) => {
        try {
            Users.find({}, (err, users) => err ? next({status : 500, message : err.stack }) : res.send(users));
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    getUserByUsername : async (req, res, next) => {
        try {
            const { username } = req.params
            Users.findOne({ username }, (err, response) => err ? next({status : 500, message : err.stack }) : res.send(response));
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    updateUser : async (req, res, next) => {
        try {
            const { username } = req.params
            Users.findOneAndUpdate({ username }, { $set: req.body }, (err, response) => err ? next({status : 500, message : err.stack }) : res.send({ message: `user : ${username} updated succesfully`}));
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    deleteUser : async (req, res, next) => {
        try {
            const { username } = req.params
            Users.findOneAndDelete({ username }, (err, response) => err ? next({status : 500, message : err.stack }) : res.send({ message: `user : ${username} deleted succesfully`}));
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    }
}