import express from "express";
import { uploadImage } from "../middleware/multer";
import { User } from "../models/User";
import { Error } from "mongoose";
import { error } from "console";

const usersRouter = express.Router();

usersRouter.post("/", uploadImage.single("avatar"), async (req, res, next) => {
  try {
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      avatar: req.file ? "images" + req.file.filename : null,
    };

    console.log(newUser);
    const user = new User(newUser);
    await user.save();
    res.status(200).send({
      message: "new User is registered",
      user,
    });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
      return;
    }
    next(error);
  }
});

usersRouter.post(
  "/session",
  uploadImage.single("avatar"),
  async (req, res, next) => {}
);

export default usersRouter;
