const { Router } = require('express');
const controller = require('../controllers/controller.js')

const router = Router();

router.get('/', controller.getStudents);
router.post('/', controller.addStudent);
router.get('/:id', controller.getSingleStudent);
router.delete('/:id', controller.deleteStudent);

module.exports = router;