const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//send a responce, like a contract 
const getAll = async (req, res, next) => {
  //inside .db() I can put 'database name'
  const result = await mongodb.getDb().db().collection('temples').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  //this same parameter is required in delete 
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    //practice printing db info
    // console.log(lists);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
 
};

const createContact = async (req, res, next) => {
  // console.log(req.body);
  //this is the body of the request with the informationto create a contact
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
//getting data handling in the server, then save in the database...the variable will return something 
const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
//return the satus with id created
// console.log(response);
res.status(201).json(response);
}

const deleteContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId }, true);
  res.status(200).json(response);
}

const updateContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: userId }, contact);
// console.log(response);
if (response.modifiedCount > 0) {
  res.status(204).send();
} else {
  res.status(500).json(response.error || 'Some error occurred while updating the contact.');
}
};  


//this exports the functions outside of the contact.js
module.exports = { getAll, getSingle, createContact, deleteContact, updateContact };
