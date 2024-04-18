import { body } from "express-validator";

export const loginValidation = [
  body("email", "Incorrect format of email").isEmail(),
  body("password", "Pass should be more complicated").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "Incorrect format of email").isEmail(),
  body("password", "Pass should be more complicated").isLength({ min: 5 }),
  body("fullName", "Too short name").isLength({ min: 3 }),
  body("avatarUrl", "Link is not correct").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Type the post header").isLength({ min: 3 }).isString(),
  body("text", "Type the post text").isLength({ min: 10 }).isString(),
  body("tags", "Incorrect format - should be an array").optional().isString(),
  body("imageUrl", "Invalid link").optional().isString(),
];
