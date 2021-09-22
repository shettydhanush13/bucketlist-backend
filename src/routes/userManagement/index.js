const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getUserByUsername,
    updateUser,
    deleteUser
} = require('../../controller/userManagement');

router.get('/', getAllUsers);
router.get('/:username', getUserByUsername);
router.put('/:username', updateUser);
router.delete('/:username', deleteUser);

module.exports = router;