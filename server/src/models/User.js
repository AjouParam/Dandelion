const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  type: {
    type: Number,
    default: 0,
  },
<<<<<<< HEAD
=======
  thumbnail: String,
  seeds: {
    type: Number,
    default: 0,
  },
>>>>>>> 9dea053b16cf54ae3f62e0b09b894af0825e6848
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
