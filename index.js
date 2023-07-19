const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/authRoutes');
const basicRoutes = require('./routes/basicRoutes');

const app = express();


app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs')


const database = 'mongodb://localhost:27017/Auth1'
mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((result) => app.listen(3000))
  .catch((error) => console.error(error))

app.use(authRoutes);
app.use(basicRoutes);


















//cookies
// app.get('/set-cookies', (req, res) => {
//   //res.setHeader('Set-Cookie', 'newUser=true');
//   res.cookie('newUser', false)
//   res.cookie('newSwimmer', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
//   res.send('You got the cookiewq');
// })

// app.get('/read-cookies', (req, res) => {
//   const kookies = req.cookies;
//   console.log(kookies);
//   res.json(kookies);
// })