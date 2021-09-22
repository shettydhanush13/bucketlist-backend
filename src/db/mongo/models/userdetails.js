const mongoose = require('mongoose')
const schema = mongoose.Schema

const userdetailsSchema = new schema(
    {
        firstName: String,
        lastName : String,
        username : String,
        password : String,
        email : String,
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
