const mongoose = require("mongoose");
const infoSchema = new mongoose.Schema({
  schoolName: String,
  languagesSpoken: String,
  address: String,
  favoriteSongTitle: String,
  funFact: String,
  timestamp: String,
  uselessSkill: String,
  occupation: String,
  pets: String,
  obsessedWith: String,
});

const userScheam = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Email must be a valid email address"],
    immutable: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 6,
    immutable: true,
  },
  phoneNumber: {
    type: String,
    minLength: 5,
  },
  address: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  about: {
    type: String,
  },
  information: {
    type: infoSchema,
  },
  governmentID: String,
  emerganceContact: String,
});

const User = mongoose.model("User", userScheam);
module.exports = User;
