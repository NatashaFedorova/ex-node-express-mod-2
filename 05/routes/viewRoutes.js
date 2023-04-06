const express = require('express');
const router = express.Router();

const { homePage, todosPage } = require('../controllers/viewController');

router.get('/', homePage);
router.get('/todos', todosPage);

module.exports = router;
