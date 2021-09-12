const Adventures = require('../../db/mongo/models/adventures');
const Activities = require('../../db/mongo/models/activities');
const { nanoid } = require('nanoid');

module.exports = {
    getAllAdventures : async (req, res, next) => {
        try {
            Adventures.find({}, (err, adventures) => err ? next({status : 500, message : err.stack }) : res.send(adventures));
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    getAdventureById : async (req, res, next) => {
        try {
            const { id } = req.params
            Adventures.findOne({ adventure_id: id }, (err, adventure) => err ? next({status : 500, message : err.stack }) : res.send(adventure));
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    addAdventure : async (req, res, next) => {
        try {
            const adventure_id = nanoid()
            let adventures = new Adventures();
            adventures.is_visible = true;
            adventures.adventure_id = adventure_id;
            adventures.title = req.body.title;
            adventures.place = req.body.place;
            adventures.image = req.body.image;
            adventures.save((err,response) => err ? next({status : 500, message : err.stack }) : res.json({ id : adventure_id }))
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    updateAdventure : async (req, res, next) => {
        try {
            const { id } = req.params
            Adventures.findOneAndUpdate({ adventure_id: id }, { $set: req.body }, (err, response) => err ? next({status : 500, message : err.stack }) : res.send({ message: `adventure id : ${response.adventure_id } updated succesfully`}));
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    deleteAdventureById : async (req, res, next) => {
        try {
            const { id } = req.params
            Adventures.findOneAndDelete({ adventure_id: id }, (err, response) => err ? next({status : 500, message : err.stack }) : res.send({ message: `adventure id : ${response.adventure_id } deleted succesfully`}));
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    getAllActivities : async (req, res, next) => {
        try {
            Activities.find({}, 'title image where activity_id', (err, activities) => err ? next({status : 500, message : err.stack }) : res.send(activities));
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    getActivityById : async (req, res, next) => {
        try {
            const { id } = req.params
            Activities.findOne({ activity_id: id }, (err, activitiy) => err ? next({status : 500, message : err.stack }) : res.send(activitiy));
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    addActivity : async (req, res, next) => {
        try {
            const activity_id = nanoid()
            let activities = new Activities();
            activities.is_visible = true;
            activities.activity_id = activity_id;
            activities.booking_info = req.body.booking_info;
            activities.title = req.body.title;
            activities.where = req.body.where;
            activities.map_link = req.body.map_link;
            activities.co_ordinates = req.body.co_ordinates;
            activities.image = req.body.image;
            activities.short_description = req.body.phone;
            activities.what = req.body.what;
            activities.why = req.body.why;
            activities.safety = req.body.safety;
            activities.best_time = req.body.best_time;
            activities.stay = req.body.stay;
            activities.food = req.body.food;
            activities.nearby_attarction = req.body.nearby_attarction;
            activities.how_to_reach = req.body.how_to_reach;
            activities.more_info = req.body.more_info;
            activities.faq = req.body.faq;
            activities.save((err,response) => err ? next({status : 500, message : err.stack }) : res.json({ id : activity_id }))
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    updateActivity : async (req, res, next) => {
        try {
            const { id } = req.params
            Activities.findOneAndUpdate({ activity_id: id }, { $set: req.body }, (err, response) => err ? next({status : 500, message : err.stack }) : res.send({ message: `activity id : ${response.activity_id } updated succesfully`}));
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
    deleteActivityById : async (req, res, next) => {
        try {
            const { id } = req.params
            Activities.findOneAndDelete({ activity_id: id }, (err, response) => err ? next({status : 500, message : err.stack }) : res.send({ message: `activity id : ${response.activity_id } deleted succesfully`}));
        } catch(err) {
            next({status : 500, message : err.stack })
        }
    },
}