import express from "express";
import pool from "../common/mysql2/connect.js";
import videoController from "../controllers/video.controller.js";
import protect from "../common/middlewares/protect.middleware.js";

const videoRouter = express.Router();


videoRouter.get(`/video-list`, videoController.listVideo)
videoRouter.use(protect)
videoRouter.get(`/video-type`, videoController.listVideoType)

export default videoRouter