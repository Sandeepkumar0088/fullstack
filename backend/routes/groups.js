const express = require('express');
const auth = require('../middleware/auth');
const groupCtrl = require('../controllers/groupCtrl');
const router = express.Router();

router.use(auth);

router.post('/', groupCtrl.create);
router.get('/', groupCtrl.list);
router.get('/:groupId', groupCtrl.detail);
router.put('/:groupId', groupCtrl.update);
router.delete('/:groupId', groupCtrl.remove);

module.exports = router;
