import express from "express";
import authControllers from "../controllers/authControllers.js";
import joi from "joi";
import { createValidator } from "express-joi-validation";

const validator = createValidator({});

const registerSchema = joi.object({
  username: joi.string().required().min(3).max(12).label("Username"),
  email: joi.string().email().required().label("Email"),
  password: joi.string().required().min(6).max(12).label("Password"),
});

const loginSchema = joi.object({
  email: joi.string().email().required().label("Email"),
  password: joi.string().required().min(6).max(12).label("Password"),
});

const routes = express.Router();
routes.post(
  "/register",
  validator.body(registerSchema),
  authControllers.register
);
routes.post("/login", validator.body(loginSchema), authControllers.login);

export default routes;
