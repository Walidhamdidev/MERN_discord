import express from "express";
import requireAuth from "../middleware/requireAuth.js";

const routes = express.Router();

routes.get("/", requireAuth, (req, res) => {
  res.json({ msg: "Response passed. :)" });
});

export default routes;
