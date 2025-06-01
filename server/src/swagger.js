import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'HumbleBee API',
    description: 'HumbleBee REST API Documentation'
  },
  host: 'localhost:3001'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/hive.route.js', './routes/crop.route.js'];

swaggerAutogen()(outputFile, routes, doc);