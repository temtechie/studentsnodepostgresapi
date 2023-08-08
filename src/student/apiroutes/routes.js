const { Router } = require('express');
const controller = require('../controllers/controller.js')

const router = Router();

router.get('/', controller.getStudents);
router.get('/:id', controller.getSingleStudent);

module.exports = router;