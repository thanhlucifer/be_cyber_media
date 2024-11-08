import express from "express";
import pool from "../common/mysql2/connect.js";
import videoController from "../controllers/video.controller.js";

const videoRouter = express.Router();

//MYSQL2
videoRouter.get(`/video-list`, videoController.listVideo)

videoRouter.get(`/video-type`, videoController.listVideoType)

export default videoRouter