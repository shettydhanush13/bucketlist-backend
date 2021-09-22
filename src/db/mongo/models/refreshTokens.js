const mongoose = require('mongoose')
const schema = mongoose.Schema

const refreshTokensSchema = new schema(
    {
        token: String
    }
);

module.exports = mongoose.model('refreshTokens', refreshTokensSchema)
