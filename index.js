const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs')


const database = 'mongodb://localhost:27017/Auth1'
mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((result) => app.listen(3000))
  .catch((error) => console.error(error))

app.get("/", (req, res) => {
    res.render("home");
})