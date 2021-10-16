const { compare, generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("./helper")
const { validateSignupPayload, validateLoginPayload, validateTokenPayload } = require("./validation")
const Users = require('../../db/mongo/models/userdetails');
const Tokens = require('../../db/mongo/models/refreshTokens');
const { encode } = require('../auth/helper');

module.exports = {
    signup : async (req, res, next) => {
        try {
            const generateReferalCode = name => name.substr(0,3).toUpperCase()+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4).toUpperCase()
            const validation = validateSignupPayload(req.body)
            if(validation.error) return next({status : 500, message : validation.message })
            const { username, email, password } = req.body
            const users = new Users();
            users.firstName = req.body.firstName || ''
            users.lastName = req.body.lastName || ''
            users.username = username
            users.password = await encode(password)
            users.email = email
            users.bio = req.body.bio || ''
            users.profileImage = req.body.profileImage || ''
            users.website = req.body.website || ''
            users.youtube = req.body.youtube || ''
            users.instagram = req.body.instagram || ''
            users.phone = req.body.phone || ''
            users.country = req.body.country || ''
            users.city = req.body.city || ''
            users.interests = req.body.interests || []
            users.badges = req.body.badges || []
            users.credits = req.body.credits || 0
            users.referalCode = generateReferalCode(username)
            users.activities = req.body.activities || []
            users.bucketList = req.body.bucketList || []
            users.forums = req.body.forums || []
            users.save((err) => {
                if(err) {
                    let errorMessage = err.toString();
                    if(err.toString().indexOf("MongoServerError") > -1){
                        if(err.toString().indexOf("username_1 dup key") > -1) errorMessage = "Account with this username already exists";
                        if(err.toString().indexOf("email_1 dup key") > -1) errorMessage = "Account with this email already exists";
                    }
                    next({status : 500, message : errorMessage })
                }
                else res.json({ message: `user : ${username} created succesfully` })
            })
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    login: async (req, res, next) => {
        try {
            const validation = validateLoginPayload(req.body)
            if(validation.error) return next({status : 500, message : validation.message })
            const { email, password } = req.body
            const user = await Users.findOne({ email })
            if(!user) return next({status : 404, message : "no account found with this email" })
            const validPassword = await compare(password, user.password)
            if(!validPassword) return next({status : 401, message : "incorrect password" })
            const accessToken = generateAccessToken({ email, password });
            const refreshToken = generateRefreshToken({ email, password });
            const tokens = new Tokens();
            tokens.token = refreshToken
            tokens.save((err) => err ? next({status : 500, message : err.stack }) : res.status(200).json({ accessToken, refreshToken }))
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    logout: async (req, res, next) => {
        try {
            const validation = validateTokenPayload(req.body)
            if(validation.error) return next({status : 500, message : validation.message })
            const { token } = req.body;
            await Tokens.findOneAndDelete({ token })
            res.json({ message: "logout successful" });
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    token : async (req, res, next) => {
        try {
            const validation = validateTokenPayload(req.body)
            if(validation.error) return next({status : 500, message : validation.message })
            const { token } = req.body;
            if(!token) return next({status : 401, message : "invalid token" })
            const response = await Tokens.findOne({ token })
            if(!response) return next({status : 403, message : "not authenticated" })
            else{
                verifyRefreshToken(token)
                .then(response => res.status(200).json(response))
                .catch(err => next({status : 403, message : err.message }))
            }
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    }
}