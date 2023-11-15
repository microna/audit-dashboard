import express from "express";
//import session from 'express-session';
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import fs from "fs"; //auto create folder

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";

import checkAuth from "./utils/checkAuth.js";
import * as UserControllers from "./UserControllers/UserController.js";
import * as PostController from "./UserControllers/PostController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
// import { env } from "process";

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Ok"))
  .catch((err) => console.log("err", err));

const app = express();

app.use(cors());

console.log(process.env.DB_URL);

// //Check user google login
// function isLoggedIn(req, res, next) {
//     console.log('isLoggedIn',req.user)
//     req ? next() : res.sendStatus(401);
// }

////UPLOADS FILES
const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    if (!fs.existsSync("uploads")) {
      //if fs cant fild folder 'uploads'
      fs.mkdirSync("uploads"); //create /uploads folder (for heroku/vercel)
    }
    callback(null, "uploads");
  },

  filename: (_, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + "-" + uniqueSuffix + `.png`);
  },
});

const upload = multer({ storage });
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.filename}`,
  });
});

app.post("/upload/avatars", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/avatars/${req.file.filename}`,
  });
});
app.use("/uploads/", express.static("uploads"));
app.use("/uploads/avatars", express.static("uploads"));

app.use(express.json());

// app.all('/*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// });

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserControllers.login
);

/////USER REGISTRATION
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserControllers.register
);

////GOOGLE LOGIN
app.post("/auth/googleauth", UserControllers.googleAuthOrRegister);
// app.use(UserControllers.sessionGoogle);
// app.use(UserControllers.googleInitialize)
// app.use(UserControllers.passportSession)
// app.get('/auth/google',  UserControllers.googleAuth)
// app.get('/auth/google/callback', cors(), UserControllers.googleAuthCallback)
// app.get('/auth/google/failure', UserControllers.googleAuthFailure)
// app.get('/auth/google/success',isLoggedIn, cors(), UserControllers.googleAuthSuccess)
// app.get('/auth/google/logout', UserControllers.googleAuthLogout)

////CHECK INFO FOR MYSELF (USER)
app.get("/auth/me", checkAuth, UserControllers.checkLogin);

////CRUD  POSTS   - Create/Read/Update/Delete
app.get("/tags", PostController.getLastTags);
app.get("/posts", PostController.getAll);
app.get("posts/tags", PostController.getLastTags);
app.get("/tag/:name", PostController.getAllPostsByTag);
app.get("/posts/:id", PostController.getOne);
app.post("/posts/:random/date", PostController.postAllAndSortDate);
app.post("/posts/:random/popular", PostController.postAllAndSortPopular);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.patch("/comment/:id", checkAuth, PostController.addComment);

// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const http = require("http")
// const server = http.createServer()
// // We define a function that runs in response a request event
// server.on("request", (request, response) => {
//   // handle request based on method then URL
//   response.statusCode = 200
//   response.write("Hello World")
//   response.end()
// })

/////START SERVER ON PORT
//4444
app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server ok");
});
