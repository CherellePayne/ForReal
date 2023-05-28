// const validator = require('../helpers/validate');

// const saveTemple = (req, res, next) => {
//   const validationRule = {
//     name: 'required|string',
//     src: 'required|string',
//     copyright: 'required|string',
//     status: 'string',
//   };
//   validator(req.body, validationRule, {}, (err, status) => {
//     if (!status) {
//       res.status(412).send({
//         success: false,
//         message: 'Validation failed',
//         data: err
//       });
//     } else {
//       next();
//     }
//   });
// };

// module.exports = {
//   saveContact
// };

