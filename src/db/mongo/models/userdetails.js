const mongoose = require('mongoose')
const schema = mongoose.Schema

const userdetailsSchema = new schema(
    {
        firstName: String,
        lastName : String,
        username : {
            type: String,
            unique: true
        },
        password : String,
        email : {
            type: String,
            unique: true
        },
        profileImage: String,
        bio: String,
        website : String,
        youtube : String,
        instagram : String,
        phone : String,
        country : String,
        city : String,
        interests: Array,
        badges: Array,
        activities : Array,
        credits : Number,
        referalCode : String
    }
);

module.exports = mongoose.model('userdetails', userdetailsSchema)
