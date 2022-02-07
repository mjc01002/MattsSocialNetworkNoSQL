const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

require('dotenv').config();
app.use(require('./routes'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetwork', {

//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

mongoose.connect(process.env.MONGODB_URI, function (err) {
  console.log('connected to mongodb')
});

mongoose.set('debug', true);

console.log(mongoose.connection.readyState);

app.listen(PORT, () => console.log(`Connected to port 3001`));

