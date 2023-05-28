const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Cherelle API',
  },
  host:'webservices-project-lfkx.onrender.com',
  schemes: ['https'],
  //Good to test on local, but change back to lines 8 and 9 on render
  // host:'localhost:3001',
  // schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });n