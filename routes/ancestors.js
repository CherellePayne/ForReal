const express = require('express');
const router = express.Router();

const ancestorsController = require('../controllers/temples');

router.get('/', ancestorsController.getAll);
router.get('/:id', ancestorsController.getSingle);
router.post('/',ancestorsController.createTemple);
router.put('/:id',ancestorsController.updateTemple);
router.delete('/:id', ancestorsController.deleteTemple);

//This exports all the routes from TEMPLES_COLLECTION.js (controller)
module.exports = router;
