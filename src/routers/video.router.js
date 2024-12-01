import express from "express";
import pool from "../common/mysql2/connect.js";
import videoController from "../controllers/video.controller.js";
import protect from "../common/middlewares/protect.middleware.js";
import checkPermission from "../common/middlewares/check-permission.middleware.js";

const videoRouter = express.Router();

videoRouter.use(protect)
videoRouter.get(`/video-list`, checkPermission, videoController.listVideo)
videoRouter.get(`/video-type`, videoController.listVideoType)

export default videoRouter