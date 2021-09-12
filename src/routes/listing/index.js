const express = require('express');
const router = express.Router();

const {
    getAllAdventures,
    addAdventure,
    updateAdventure,
    getAdventureById,
    deleteAdventureById,
    getAllActivities,
    addActivity,
    updateActivity,
    getActivityById,
    deleteActivityById
} = require('../../controller/listing');

router.get('/adventure', getAllAdventures);
router.post('/adventure', addAdventure);
router.put('/adventure/:id', updateAdventure);
router.get('/adventure/:id', getAdventureById);
router.delete('/adventure/:id', deleteAdventureById);
router.get('/activities', getAllActivities);
router.post('/activities', addActivity);
router.put('/activities/:id', updateActivity);
router.get('/activities/:id', getActivityById);
router.delete('/activities/:id', deleteActivityById);

module.exports = router;