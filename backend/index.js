import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import fs from 'fs'; //auto create folder

import {
   registerValidation,
   loginValidation,
   postCreateValidation
} from './validations.js';

import checkAuth from './utils/checkAuth.js';
import * as UserControllers from './UserControllers/UserController.js';
import * as PostController from './UserControllers/PostController.js';
import * as AuditController from './UserControllers/AuditController.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

import AuditModel from './models/Audit.js';

mongoose
   .connect(process.env.DB_URL)
   .then(() => console.log('DB Ok'))
   .catch((err) => console.log('err', err));

const app = express();

app.use(cors());

////UPLOADS FILES
const storage = multer.diskStorage({
   destination: (_, __, callback) => {
      if (!fs.existsSync('uploads')) {
         //if fs cant fild folder 'uploads'
         fs.mkdirSync('uploads'); //create /uploads folder (for heroku/vercel)
      }
      callback(null, 'uploads');
   },

   filename: (_, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, file.fieldname + '-' + uniqueSuffix + `.png`);
   }
});

const upload = multer({ storage });
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
   res.json({
      url: `/uploads/${req.file.filename}`
   });
});

app.get('/', (req, res) => {
   res.status(200).json('Hello world!');
});

app.post('/upload/avatars', upload.single('image'), (req, res) => {
   res.json({
      url: `/uploads/avatars/${req.file.filename}`
   });
});
app.use('/uploads/', express.static('uploads'));
app.use('/uploads/avatars', express.static('uploads'));

app.use(express.json());

// app.get("/audits", AuditController.getAll);
app.get('/audits', checkAuth, async (req, res) => {
   try {
      console.log(req.body);
      console.log('req.userId', req.userId);
      const result = await AuditModel.find({ userId: '123' });
      res.status(200).json({ message: result });
      console.log(result);
   } catch (error) {
      console.log(error);
   }
});

app.post('/audit', async (req, res) => {
   try {
      const result = await AuditModel({
         auditName: req.body.auditName,
         userId: '123' //TODO
      }).save();
      console.log(result);
      res.status(200).json({ message: 'audit saved' });
   } catch (error) {
      res.status(404).json('failed to post audit');
   }
});

// app.get("/audit", async (req, res) => {
//   const result = await AuditModel().find();
//   console.log(result);
//   res.status(200).json({ result });
// });

app.post(
   '/auth/login',
   loginValidation,
   handleValidationErrors,
   UserControllers.login
);

/////USER REGISTRATION
app.post(
   '/auth/register',
   registerValidation,
   handleValidationErrors,
   UserControllers.register
);

////CHECK INFO FOR MYSELF (USER)
app.get('/auth/me', checkAuth, UserControllers.checkLogin);

////CRUD  POSTS   - Create/Read/Update/Delete
app.get('/tags', PostController.getLastTags);
app.get('/posts', PostController.getAll);
app.get('posts/tags', PostController.getLastTags);
app.get('/tag/:name', PostController.getAllPostsByTag);
app.get('/posts/:id', PostController.getOne);
app.post('/posts/:random/date', PostController.postAllAndSortDate);
app.post('/posts/:random/popular', PostController.postAllAndSortPopular);
app.post(
   '/posts',
   checkAuth,
   postCreateValidation,
   handleValidationErrors,
   PostController.create
);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
   '/posts/:id',
   checkAuth,
   postCreateValidation,
   handleValidationErrors,
   PostController.update
);

app.patch('/comment/:id', checkAuth, PostController.addComment);

/////START SERVER ON PORT
//4444
app.listen(process.env.PORT || 4444, (err) => {
   if (err) {
      return console.log(err);
   }
   console.log('server ok');
});
