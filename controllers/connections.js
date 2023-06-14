const express = require('express');
const router = express.Router();

const templesController = require('../controllers/temples');

router.get('/', templesController.getAll);

router.get('/:id', templesController.getSingle);

router.post('/', templesController.createTemple);

router.put('/:id', templesController.updateTemple);

router.delete('/:id', templesController.deleteTemple);

const ancestorsController = require('../controllers/ancestors');

router.get('/', ancestorsController.getAllNames);

router.get('/:id', ancestorsController.getSingleName);

router.post('/', ancestorsController.createName);

router.put('/:id', ancestorsController.updateName);

router.delete('/:id', ancestorsController.deleteName);

//This exports all the routes from TEMPLES_COLLECTION.js (controller)
module.exports = router;
