const express = require('express');
const { getAllUsers, createUser,getUserById,updateUser, loginUser } = require('../../src/controllers/userController');

const router = express.Router();

router.get('/getUsers', getAllUsers);
router.post('/create', createUser);
router.get('/:id', getUserById);
router.put('/update/:id', updateUser);
// Route to login a user
router.post('/login', loginUser);


module.exports = router;
