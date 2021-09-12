const mongoose = require('mongoose')
const schema = mongoose.Schema

const adventuresSchema = new schema(
    {
        is_visible: Boolean,
        adventure_id : String,
        title : String,
        place : String,
        image : String
    }
);

module.exports = mongoose.model('adventures', adventuresSchema)
