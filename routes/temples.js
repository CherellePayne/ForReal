const express = require('express');
const router = express.Router();

const templesController = require('../controllers/temples');
const validation = require('../middleware/validate');

router.get('/', templesController.getAll);

router.get('/:id', templesController.getSingle);


router.post('/', validation.saveTemple,templesController.createTemple);

router.put('/:id', validation.saveTemple,templesController.updateTemple);

router.delete('/:id', templesController.deleteTemple);

//This exports all the routes from TEMPLES_COLLECTION.js (controller)
module.exports = router;
