const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true ,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Minimum password length is 6 chars"]
    },
})

//fire functafter new document is saved tot db
// userSchema.post('save', function (justSavedDocument, next) {
//     console.log('New user iscreated', justSavedDocument)
//     next();
// })

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

const User = mongoose.model('user', userSchema)

module.exports = User;