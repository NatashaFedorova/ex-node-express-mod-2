const express = require('express');

const {
  getMe,
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

const { enums } = require('../constants');

const {
  checkLoginData,
  allowFor,
} = require('../middlewares/authMiddleware');

const router = express.Router();

// user тає бути залогінений, щоб робити запити перераховані нижче  - ПОРЯДОК ВАЖЛИВИЙ
router.use(checkLoginData);

router.get('/me', getMe);

router.use(
  allowFor(
    enums.USER_ROLES_ENUM.ADMIN,
    enums.USER_ROLES_ENUM.MODERATOR
  )
);

router.route('/').post(checkUserData, createUser).get(getUsers);

router.use('/:id', checkUserId);

router
  .route('/:id')
  .get(getUserById)
  .patch(checkUserData, updateUserById)
  .delete(deleteUserById);

module.exports = router;
