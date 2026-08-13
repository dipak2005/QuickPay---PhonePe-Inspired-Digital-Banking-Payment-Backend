require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const swaggerUi = require('swagger-ui-express');



// Routes
const authRouter = require('./src/routes/authRoute/index.js');


let swaggerDocument;
try {
  swaggerDocument = require('./swagger-output.json');
} catch (error) {
  console.error("Swagger documentation not found. Please run 'npm run swagger-autogen' to generate it.");
  swaggerDocument = null;
}
const app = express();
const port = process.env.PORT || 3001;

connectDB(); // Connect to MongoDB

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
if (swaggerDocument) {
  app.use('/api-docapi-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
app.use('/api/auth', authRouter);




app.get('/', (req, res) => {
  res.send('Welcome to the QuickPay Backend System!');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});





