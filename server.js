// const express = require('express');
// const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
// const bcrypt = require('bcrypt-nodejs');
// const cors = require('cors');
// const knex = require('knex');
// const port = process.env.PORT || 4000;

// const register = require('./controllers/register');
// const signin = require('./controllers/signin');
// const profile = require('./controllers/profile');
// const image = require('./controllers/image');

// const db = knex({ 
//   client: 'pg',
//   connection: {
//     host : 'dpg-crcggmrv2p9s73cfle6g-a.singapore-postgres.render.com',
//     user : 'smart_brain_3c2u_user',
//     password : '27RQH4rnFIwagljwZdUwjyYYBsAuVVY1',
//     database : 'smart_brain_3c2u',
//     port: 5432,
//     ssl: { rejectUnauthorized: false }
//   }
// });

// const app = express();


// app.use(cors())
// app.use(express.json()); // latest version of exressJS now comes with Body-Parser!

// app.get('/', (req, res) => {
//   db.select('*').from('users')
//     .then(users => {
//       res.json(users);
//     })
//     .catch(err => res.status(400).json('unable to get users'));
// });

// app.post('/signin', signin.handleSignin(db, bcrypt))
// app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
// app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
// app.put('/image', (req, res) => { image.handleImage(req, res, db)})
// app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

// // app.listen(port, ()=> {
// //   console.log(`app is running on port ${port}`);
// // })
// app.listen(port, (err) => {
//   if (err) {
//     console.error('Error starting the server:', err);
//   } else {
//     console.log(`App is running on port ${port}`);
//   }
// });
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const port = process.env.PORT || 4000;

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Set up knex database connection
const db = knex({ 
  client: 'pg',
  connection: {
    host: 'dpg-crcggmrv2p9s73cfle6g-a.singapore-postgres.render.com',
    user: 'smart_brain_3c2u_user',
    password: '27RQH4rnFIwagljwZdUwjyYYBsAuVVY1',
    database: 'smart_brain_3c2u',
    port: 5432,
    ssl: { rejectUnauthorized: false }
  }
});

const app = express();

app.use(cors());
app.use(express.json()); // Built-in body parser

// Routes
app.get('/', (req, res) => {
  db.select('*').from('users')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(400).json('unable to get users'));
});

app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt); });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db); });
app.put('/image', (req, res) => { image.handleImage(req, res, db); });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res); });

// Start server with error handling
app.listen(port, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log(`App is running on port ${port}`);
  }
});
