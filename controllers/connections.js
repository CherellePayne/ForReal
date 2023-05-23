const express = require('express');
const router = express.Router();

const templesController = require('../controllers/contacts');

router.get('/', templesController.getAll);

router.get('/:id', templesController.getSingle);

router.post('/', templesController.createContact);

router.put('/:id', templesController.updateContact);

router.delete('/:id', templesController.deleteContact);

//This exports all the routes from contacts.js (controller)
module.exports = router;