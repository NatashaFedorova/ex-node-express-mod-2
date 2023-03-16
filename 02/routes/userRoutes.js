const express = require('express');

const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require('../controllers/usersController');

const {
  checkUserData,
  checkUserId,
} = require('../middlewares/usersMiddlewares');

const router = express.Router();

// router.post('/', createUser);
// router.get('/', getUsers);

// router.get('/:id', getUserById);
// router.patch('/:id', updateUserById);
// router.delete('/:id', deleteUserById);

router.route('/').post(checkUserData, createUser).get(getUsers);

router.use('/:id', checkUserId);

router
  .route('/:id')
  .get(getUserById)
  .patch(checkUserData, updateUserById)
  .delete(deleteUserById);

module.exports = router;
