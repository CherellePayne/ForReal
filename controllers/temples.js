const TEMPLES_COLLECTION = 'temples'
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//send a responce, like a contract 
//create function for wards (start with console.log, don't connect to mongo yet...
const getAll = async (req, res, next) => {
  // then install mongo, bodyparse)
  const result = await mongodb.getDb().db().collection(TEMPLES_COLLECTION).find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  //this same parameter is required in delete 
  const templeId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection(TEMPLES_COLLECTION).find({ _id: templeId });
  result.toArray().then((lists) => {
    //practice printing db info
    // console.log(lists);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
 
};

const createTemple = async (req, res, next) => {
  // console.log(req.body);
  //this is the body of the request with the informationto create a contact
  const temple = {
    name: req.body.name,
    src: req.body.src,
    copyright: req.body.copyright,
    status: req.body.status,
  };

//getting data handling in the server, then save in the database...the variable will return something 
const response = await mongodb.getDb().db().collection(TEMPLES_COLLECTION).insertOne(temple);
//return the satus with id created
// console.log(response);
res.status(201).json(response);
}

const deleteTemple = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection(TEMPLES_COLLECTION).deleteOne({ _id: userId }, true);
  res.status(200).json(response);
}

const updateTemple = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const temple = {
    name: req.body.name,
    src: req.body.src,
    copyright: req.body.copyright,
    status: req.body.status,
  };
  const response = await mongodb.getDb().db().collection(TEMPLES_COLLECTION).replaceOne({ _id: userId }, temple);
// console.log(response);
if (response.modifiedCount > 0) {
  res.status(204).send();
} else {
  res.status(500).json(response.error || 'Some error occurred while updating the contact.');
}
};  


//this exports the functions outside of the contact.js// This is best practice, to see what is exporting
module.exports = { getAll, getSingle, createTemple, deleteTemple, updateTemple };