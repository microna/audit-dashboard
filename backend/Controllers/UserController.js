import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

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
      passwordHash: passHash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      },
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "failed registration   ",
      err,
    });
  }
};

/////USER AUTH
export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) {
      return res.status(404).json({
        message: "Login or Password incorrect (User not finded)",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "90d",
      },
    );

    const { email, fullName, isAdmin } = user._doc;

    res.json({
      userData: { email, fullName, isAdmin },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "failed auth ",
      err,
    });
  }
};

////CHECK INFO FOR MYSELF (USER)
export const checkLogin = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    console.log(user)
    if (!user) {
      return res.status(404).json({
        message: "User not finded",
      });
    }

    res.status(200).json({
      email: user.email,
      fullName: user.fullName,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "access denied",
      err,
    });
  }
};
