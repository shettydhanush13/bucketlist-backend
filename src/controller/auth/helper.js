const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../../config")
const { accessTokenSecret, refreshTokenSecret } = config

const encode = async (password) => await bcrypt.hash(password, 10)

const compare = async (password, hash) => await bcrypt.compare(password, hash)

const generateAccessToken = user => jwt.sign(user, accessTokenSecret, { expiresIn : "3000s" })

const generateRefreshToken = user => jwt.sign(user, refreshTokenSecret)

const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, config.refreshTokenSecret, (err, user) => {
            if(err) reject({ message: "not authenticated" })
            else{
                const {id, user_name, password, email} = user
                const accessToken = generateAccessToken({id, user_name, password, email});
                resolve({accessToken})
            }
        })
    })
}

const verifyAccessToken = accessToken => {
    return new Promise((resolve) => {
        jwt.verify(accessToken, config.accessTokenSecret, (err, user) => {
            if(err) resolve({ error : true, message: err })
            else resolve({error : false, user})
        })
    })
}

module.exports = { encode, compare, generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken }