import mysql from "mysql2";


const pool = mysql.createPool({
    host: `localhost`,
    user: `root`,
    password: `123456`,
    port: `3307`,
    database: `db_cyber_media`,
    timezone: `Z`
 }).promise();

export default pool