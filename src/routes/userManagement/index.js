const express = require('express');
const router = express.Router();
const authentication = require('../../core/authentication')

const {
    getAllUsers,
    getUserByUsername,
    updateUser,
    deleteUser
} = require('../../controller/userManagement');

router.get('/', getAllUsers);
router.get('/user', authentication, getUserByUsername);
router.put('/:username', updateUser);
router.delete('/:username', deleteUser);

module.exports = router;