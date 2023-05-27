const TEMPLES_COLLECTION = 'temples'
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//send a responce, like a contract 
//create function for wards (start with console.log, don't connect to mongo yet...
const getAll = async (req, res) => {
  // then install mongo, bodyparse)
  const result = await mongodb
    .getDb()
    .db()
    .collection(TEMPLES_COLLECTION)
    //added in lesson 6
    .find()
    result.toArray((err, list) => {
    if (err) {
    res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    });
};

// .find();
  // result.toArray().then((lists) => {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.status(200).json(lists);
//   });
// };

const getSingle = async (req, res) => {
  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).jason('Must use a valid temple id to find temple.');
  }
  //this same parameter is required in delete 
  const templeId = new ObjectId(req.params.id);
  const result = await mongodb
  .getDb()
  .db()
  .collection(TEMPLES_COLLECTION)
  //updated week 6
  .find({ _id: userId })
  .toArray((err, result) => {
    if (err) {
      res.status(400).json({ message: err });
    }
  //week5 
  // .find({ _id: templeId });
  // result.toArray().then((lists) => {
    //practice printing db info
    // console.log(lists);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createTemple = async (req, res) => {
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
//added week 6
if (response.acknowledged) {
  //return the satus with id created
// console.log(response);
res.status(201).json(response);
} else {
  res.status(500).json(response.error || 'Some error occurred while creating the temple.');
}
};

const deleteTemple = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {  
    res.status(400).json('Must use a valid contact id to delete a contact.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
  .getDb()
  .db()
  .collection(TEMPLES_COLLECTION)
  .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
  res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
}
};

const updateTemple = async (req, res) => {
  //update week 6
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid temple id to update a temple.');
  }
  const userId = new ObjectId(req.params.id);
  const temple = {
    name: req.body.name,
    src: req.body.src,
    copyright: req.body.copyright,
    status: req.body.status,
  };
  const response = await mongodb
  .getDb()
  .db()
  .collection(TEMPLES_COLLECTION)
  .replaceOne({ _id: userId }, temple);
// console.log(response);
if (response.modifiedCount > 0) {
  res.status(204).send();
} else {
  res.status(500).json(response.error || 'Some error occurred while updating the contact.');
}
};  


//this exports the functions outside of the contact.js// This is best practice, to see what is exporting
module.exports = { getAll, getSingle, createTemple, deleteTemple, updateTemple };