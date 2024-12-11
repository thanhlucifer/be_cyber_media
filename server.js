// Bước 1: npm init
// Bước 2: npm i express

// Reload server
// Cách 1: dùng thư viện nodemon
// Cách 2: dùng --watch của node hỗ trợ
import express from "express";
import { Server } from 'socket.io';
import { createServer } from 'node:http';
const app = express();
const server = createServer(app);
import cors from "cors";
import { DataTypes, Sequelize } from "sequelize";
import rootRouter from "./src/routers/root.router.js";
import { handlerError } from "./src/common/helpers/error.helper.js";
import initSocket from "./src/common/socket/init.socket.js";


// sử dụng middleware chuyển JSON sang đối tượng JS (object, ...)
// sử dụng với body
app.use(express.json());
app.use(cors());

app.use(rootRouter);

//sequelize




//model
app.use(handlerError);

initSocket(server);



const PORT = 3069;
server.listen(PORT, () => {
   console.log(`Server online at port ${PORT}`);
});


 

// // 4 cách nhận dữ liệu
// /**
//  * Query Parameters
//  * Nhận biết: bắt đầu bằng dấu chấm hỏi (?) phân tách các key với nhau bằng dấu &
//  * Thường dùng: phân trang, lọc, search, ....
//  */
// app.get(`/query`, (request, respone, next) => {
//    const query = request.query;

//    console.log(query);

//    respone.json(`Query Parameters`);
// });

// /**
//  * Patch Paramerters
//  * Nhận biết: dùng /:ten_bien
//  * Thường dùng: khi muốn lấy dữ liẹu cụ thể của một đối tượng
//  */
// app.get(`/patch/:id`, (request, respone, next) => {
//    const params = request.params;

//    console.log(params);

//    respone.json(`Patch Paramerters`);
// });

// /**
//  * Body
//  * phải dùng app.use(express.json());
//  * Thường dùng: cho dữ liệu phức tạp, nhiều, lớn
//  */
// app.post(`/body`, (request, respone, next) => {
//    const body = request.body;

//    console.log(body);

//    respone.json(`body`);
// });

// /**
//  * headers
//  */
// app.get(`/headers`, (request, respone, next) => {
//    const headers = request.headers

//    console.log({ headers });

//    respone.json(`headers`)
// });