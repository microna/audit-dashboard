import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
} from "./validations.js";

import checkAuth from "./utils/checkAuth.js";
import * as UserControllers from "./Controllers/UserController.js";
import * as AuditController from "./Controllers/AuditController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Ok"))
  .catch((err) => console.log("err", err));

const app = express();

app.use(cors());

app.use(express.json());

app.get("/audit", checkAuth, AuditController.many);
app.get("/audit/:id", checkAuth, AuditController.getOne);
app.post("/audit", checkAuth, AuditController.create);
app.patch("/audit/:id", checkAuth, AuditController.update);
app.delete("/audit/:id", checkAuth, AuditController.remove);

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

////CHECK INFO FOR MYSELF (USER)
app.get("/auth/me", checkAuth, UserControllers.checkLogin);


/////START SERVER ON PORT
//4444
app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server ok");
});
