import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cors from 'cors';

import UserModel from '../models/User.js';

/////USER REGISTRATION
export const register = async (req, res) => {
   try {
      const password = req.body.password ?? null;
      const salt = await bcrypt.genSalt(10);
      const passHash = await bcrypt.hash(password, salt);

      const doc = new UserModel({
         email: req.body.email,
         fullName: req.body.fullName,
         avatarUrl: req.body.avatarUrl,
         passwordHash: passHash
      });

      const user = await doc.save();

      const token = jwt.sign(
         {
            _id: user._id
         },
         'secret123',
         {
            expiresIn: '30d'
         }
      );

      const { passwordHash, ...userData } = user._doc;

      res.json({
         ...userData,
         token
      });
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'failed registration   ',
         err
      });
   }
};

////GOOGLE AUTH
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

///GOOGLE AUTH
//Client ID:
const clientId =
   '178072032538-qdvpbg1mp8p2fc86tmmeuar6n9usci0u.apps.googleusercontent.com';
//Client Secret:
const clientSecret = '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';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

const session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);

export const sessionGoogle = session({
   secret: 'keyboard cat'
});

export const googleInitialize = passport.initialize();
export const passportSession = passport.session();

passport.use(
   new GoogleStrategy(
      {
         clientID: clientId,
         clientSecret: clientSecret,
         callbackURL: 'http://localhost:4444/auth/google/callback',
         passReqToCallback: true
      },
      function (request, accessToken, refreshToken, profile, done) {
         return done(null, profile);
         //  UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
         //    return done(err, user);
         //  });
      }
   )
);

passport.serializeUser(function (user, cb) {
   process.nextTick(function () {
      cb(null, user);
   });
});

passport.deserializeUser(function (user, cb) {
   process.nextTick(function () {
      // console.log('deserializeUser', user);
      return cb(null, user);
   });
});

////GOOGLE Auth
export const googleAuth = passport.authenticate('google', {
   scope: ['email', 'profile']
});

export const googleAuthCallback = passport.authenticate('google', {
   successRedirect: '/auth/google/success',
   failureRedirect: '/auth/google/failure'
});

export const googleAuthFailure = (req, res) => {
   res.status(401).json({
      error: true,
      message: 'Log google failure'
   });
   // res.send('googleAuthFailure');
};
export const googleAuthSuccess = (req, res) => {
   if (req.user) {
      res.status(200).json({
         error: false,
         message: 'Success loged in',
         user: req.user
      });
   } else {
      res.status(403).json({ error: true, message: 'No authorizet Google' });
   }
};

export const googleAuthLogout = (req, res, next) => {
   req.logout(function (err) {
      if (err) {
         return next(err);
      }
      res.redirect('/');
   });
   req.session.destroy();
   res.send('Logout success');
};

export const googleAuthOrRegister = async (req, res, next) => {
   try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {

         const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.name,
            avatarUrl: req.body.picture,
            passwordHash: null
         });

         const user = await doc.save();

         const token = jwt.sign(
            
            {
               _id: user._id
            },
            'secret123',
            {
               expiresIn: '30d'
            }
         );

         res.json({
            ...user._doc,
            token
         });
      }

      const token = jwt.sign(
         {
            _id: user._id
         },
         'secret123',
         {
            expiresIn: '30d'
         }
      );


      res.json({
        ...user._doc,
         token
      });
   } catch (err) {
    console.log('google err', err)
   }
};

/////USER AUTH
export const login = async (req, res) => {
   try {
      const user = await UserModel.findOne({ email: req.body.email });

      if (!user) {
         return res.status(404).json({
            message: 'Login or Password incorrect (User not finded)'
         });
      }
      const isValidPass = await bcrypt.compare(
         req.body.password,
         user._doc.passwordHash
      );

      if (!isValidPass) {
         return res.status(404).json({
            message: 'Login or Password incorrect'
         });
      }

      const token = jwt.sign(
         {
            _id: user._id
         },
         'secret123',
         {
            expiresIn: '30d'
         }
      );

      const { passwordHash, ...userData } = user._doc;

      res.json({
         ...userData,
         token
      });
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'failed auth ',
         err
      });
   }
};

////CHECK INFO FOR MYSELF (USER)
export const checkLogin = async (req, res) => {
   try {
      const user = await UserModel.findById(req.userId);
      console.log(user._doc)
      if (!user) {
         return res.status(404).json({
            message: 'User not finded'
         });
      }
      // console.log('user._doc',user._doc)
      const { passwordHash, ...userData } = user._doc;

    
      res.json({ userData });
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: 'access denied  ',
         err
      });
   }
};
