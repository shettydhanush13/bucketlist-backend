const mongoose = require('mongoose')
const schema = mongoose.Schema

const activitiesSchema = new schema(
    {
        is_visible: Boolean,
        activity_id : String,
        type : Array,
        icon : String,
        booking_info : {
            organizer : String,
            organizer_id : String
        },
        title : String,
        where : String,
        map_link : String,
        co_ordinates : {
            latitude : Number,
            longitude : Number
        },
        image : String,
        short_description : String,
        what : {
            image : String,
            info : String
        },
        forumTopics : Array,
        why : [{
            image : String,
            image_source : String,
            title : String,
            info : String
        }],
        safety : {
            image : String,
            info : String
        },
        best_time : {
            image : String,
            info : String,
            months : Array
        },
        stay : [{
            name : String,
            image : String,
            link : String,
            info : String,
            map : String,
            price_range : String,
            phone : Array,
            email : String,
            website : String,
            trippo_code : String,
            reward_points : Number
        }],
        food : [{
            where : String,
            image : String,
            link : String,
            trippo_code : String,
            reward_points : Number
        }],
        nearby_attarction : [{
            title : String,
            image : String,
            info : String
        }],
        how_to_reach : {
            road : {
                info : String,
                booking_link : String
            },
            train : {
                info : String,
                booking_link : String
            },
            air : {
                info : String,
                booking_link : String
            },
            water : {
                info : String,
                booking_link : String
            }
        },
        more_info : String, 
        faq : [{
            question : String,
            answer : String
        }]
    }
);

module.exports = mongoose.model('activities', activitiesSchema)
