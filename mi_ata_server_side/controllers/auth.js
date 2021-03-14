const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModels');
const Helpers = require('../Helpers/helpers');
const dbConfig = require('../config/secret');

module.exports = {
  async CreateUser(req, res) {
    const schema = Joi.object().keys({
      username: Joi.string()
        .min(2)
        .max(10)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(5)
        .required(),
      nation: Joi.string()
        .required(),
      religion: Joi.string()
        .required(),
        userType: Joi.string()
        ///.required()
    });

    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details })
    }

    const userEmail = await User.findOne({
      email: Helpers.lowerCase(req.body.email)
    });
    if (userEmail) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: 'זה כבר קיים במערכת Email' });
    }

    const userName = await User.findOne({
      username: Helpers.firstUpper(req.body.username)
    });
    if (userName) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: 'שם משתמש זה כבר תפוס, אנא נסה שם אחר' });
    }

    return bcrypt.hash(value.password, 10, (err, hash) => {
      if (err) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Error hashing password' });
      }
      const body = {
        username: Helpers.firstUpper(value.username),
        email: Helpers.lowerCase(value.email),
        password: hash,
        nation: Helpers.firstUpper(value.nation),
        religion: Helpers.firstUpper(value.religion),
        userType: Helpers.firstUpper(value.userType)

      };
      User.create(body)
        .then(user => {
          const token = jwt.sign({ data: user }, dbConfig.secret, {
            expiresIn: '5h'
          });
          res.cookie('auth', token);
          res
            .status(HttpStatus.CREATED)
            .json({ message: 'המשתמש נוצר בהצלחה', user, token });
        })
        .catch(err => {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: 'סליחה, קרתה שגיאה בלתי צפויה' });
        });
    });
  },

  async LoginUser(req, res) {
    if (!req.body.username || !req.body.password) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'על כל השדות להיות מלאים' });
    }

    await User.findOne({ username: Helpers.firstUpper(req.body.username) })
      .then(user => {
        if (!user) {
          return res
            .status(HttpStatus.NOT_FOUND)
            .json({ message: 'שם משתמש לא קיים' });
        }

        return bcrypt.compare(req.body.password, user.password).then(result => {
          if (!result) {
            return res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: 'הסיסמה שהזנת אינה נכונה' });
          }
          const token = jwt.sign({ data: user }, dbConfig.secret, {
            expiresIn: '24h'
          });
          res.cookie('auth', token);
          return res
            .status(HttpStatus.OK)
            .json({ message: 'התחברת בהצלחה', user, token });
        });
      })
      .catch(err => {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'סליחה, שגיאה בלתי צפויה קרתה' });
      });
  },



  async LoginAsGuest(req, res) {
    const schema = Joi.object().keys({
      username: Joi.string()
        .min(2)
        .max(20)
        .required(),
      nation: Joi.string()
        .required(),
      religion: Joi.string()
        .required() ,
        userType: Joi.string()
        ///.required()
      
    });

    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details })
    }

    const userName = await User.findOne({
      username: Helpers.firstUpper(req.body.username)
    });
    if (userName) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: 'שם משתמש זה כבר קיים במערכת, אנא נסה שם אחר' });
    }

    return bcrypt.hash(value.username, 10, (err, hash) => {
      if (err) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Error hashing user name' });
      }

      const body = {
        username: Helpers.firstUpper(value.username),
        nation: Helpers.firstUpper(value.nation),
        religion: Helpers.firstUpper(value.religion),
        userType: Helpers.firstUpper(value.userType)
      };

      User.create(body)
        .then(user => {
          const token = jwt.sign({ data: user }, dbConfig.secret, {
            expiresIn: '5h'
          });
          res.cookie('auth', token);
          res
            .status(HttpStatus.CREATED)
            .json({ message: 'משתמש נוצר בהצלחה', user, token });
        })
        .catch(err => {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: 'סליחה, שגיאה בלתי צפויה קרתה' });
        });
    });
  },
};
