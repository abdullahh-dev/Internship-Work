const Users = require('../models/users');
const { setToken } = require('../controller/auth');
const util = require('util');
const jwt = require('jsonwebtoken');
const GenericResponse = require('../models/genericresponse');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images'));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage }).single('profile');
const handleFileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.file.filename);
    }
    next();
  });
};
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  let profileImage = req.file.filename;
  try {
    const users = new Users({
      name: name,
      email: email,
      password: password,
      profile: profileImage,
    });
    const newUser = await users.save();
    res.status(201).json(new GenericResponse(true, null, null));
  } catch (err) {
    res.status(400).json(new GenericResponse(false, null, null));
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({
      email: email,
      password: password,
    });

    if (user) {
      const token = setToken(user);
      const name = user.name;
      const imagePath = user.profile;
      return res.send({ name, imagePath, token });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (err) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).json({ message: 'Intenal Server Error', err });
  }
};

const userVerify = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    let tokenValue;
    if (token && token.startsWith('Bearer')) {
      tokenValue = token.split(' ')[1];
      console.log(tokenValue);
    }
    if (!token) {
      const error = res.json({
        message: 'Sorry You are Not Logged in',
      });
      return next(error);
    }

    const decodeToken = await util.promisify(jwt.verify)(
      tokenValue,
      process.env.SECERET_STRING
    );
    const loginUser = await Users.findById(decodeToken._id);
    console.log(loginUser);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createUser, loginUser, userVerify, handleFileUpload };
