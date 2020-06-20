import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRouter from './routes/users';
/**
 * Comment or uncoment this line to synchronize Database
 * 
 * Note: dont forget to update model export in ../models/sequelize/index.js
 */
// import '../models/sequelize';

let uri = "mongodb://root:password@mongo:27017/api?authSource=admin";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology:true })
  .then(v => console.log('Connected to mongodb'))
  .catch(e => console.log('Connection problem', e));

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, '../public')));

/**
 * Users routes
 */
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  const message = 'Welcome to the Plateforme API.';
  res.json({ message });
});

const serverPort = process.env.PORT || 8080;
// Start server
const server = app.listen(serverPort);

export default app;
