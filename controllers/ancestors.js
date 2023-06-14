const ancestors = 'temple-names'
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const validateName = (data) => {
const {firstName, lastName, deathDate, deathLocation, birthday, birthdayLocation, MarriageDate} = data;
if (!firstName || !lastName || !deathDate || !deathLocation || !birthday || !MarriageDate ){ 
  throw new Error('all feilds must be filled, firstName, lastName, deathDate, deathLocation, birthday, birthdayLocation, MarriageDate')
}

}
//send a responce, like a contract 
//create function for wards (start with console.log, don't connect to mongo yet...
const getAllNames = async (req, res) => {
  // then install mongo, bodyparse)
  const result = await mongodb
    .getDb()
    .db()
    .collection('ancestors')
    //added in lesson 6
    .find()
    result.toArray((err, list) => {
    if (err) {
    res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list);
    });
};

// .find();
  // result.toArray().then((lists) => {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.status(200).json(lists);
//   });
// };

const getSingleName = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid temple id to find an ancestor.');
    }
    //this same parameter is required in delete 
    const nameId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('ancestors')
      //updated week 6
      .find({ _id: nameId })
    result.toArray((err, lists) => {
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
  }
  catch (err) {
    res.status(400).json({ message: err });
  }
};

const createName = async (req, res) => {
  try {
    validateName(req.body)
    const ancestor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      deathDate: req.body.deathDate,
      deathLocation: req.body.deathLocation,
      birthday: req.body.birthday,
      birthdayLocation:req.body.birthdayLocation,
      MarriageDate: req.body.MarriageDate, 
    };

//getting data handling in the server, then save in the database...the variable will return something 
const response = await mongodb.getDb().db().collection('TEMPLES_COLLECTION').insertOne(ancestor);
//added week 6
if(response.acknowledged) {
  //return the satus with id created
// console.log(response);
res.status(201).json(response);
} else {
  res.status(500).json(response.error || 'Some error occurred while creating the ancestor.');
}}
catch(err){
  res.status(400).json({ message: err.message });
}
};

const deleteName = async (req, res) => {
  try{
    if (!ObjectId.isValid(req.params.id)) {  
    res.status(400).json('Must use a valid id to delete a name.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
  .getDb()
  .db()
  .collection('ancestors')
  .deleteName({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
  res.status(500).json(response.error || 'Some error occurred while deleting the name.');
}}
catch(err){
  res.status(400).json({ message: err });
}
};

const updateName = async (req, res) => {
  try{
    validateName(req.body)
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to update a name.');
  }
  const nameId = new ObjectId(req.params.id);
  const ancestor = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    deathDate: req.body.deathDate,
    deathLocation: req.body.deathLocation,
    birthday: req.body.birthday,
    birthdayLocation:req.body.birthdayLocation,
    MarriageDate: req.body.MarriageDate, 
  };
  const response = await mongodb
  .getDb()
  .db()
  .collection('ancestors')
  .replaceName({ _id: nameId }, ancestor);
// console.log(response);
if (response.modifiedCount > 0) {
  res.status(204).send();
} else {
  res.status(500).json(response.error || 'Some error occurred while updating the name.');
}}
catch(err){
  res.status(400).json({ message: err.message });
}
};  


//this exports the functions outside of the contact.js// This is best practice, to see what is exporting
module.exports = { getAllNames, getSingleName, createName, deleteName, updateName };