const express = require('express');
const auth = require('../middleware/auth');
const expenseCtrl = require('../controllers/expenseCtrl');
const router = express.Router();

router.use(auth);

router.post('/', expenseCtrl.create);
router.get('/:groupId', expenseCtrl.listByGroup);
router.get('/report/:groupId', expenseCtrl.exportCSV);
router.put('/:id', expenseCtrl.update);
router.delete('/:id', expenseCtrl.remove);

module.exports = router;
