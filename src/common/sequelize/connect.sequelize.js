import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize(`db_cyber_media`, `root`, `123456`, {
    host: `localhost`,
    port: `3307`,
    dialect: `mysql`,
 })

 //kiem tra ket noi
sequelize.authenticate().then(() => {
    console.log(`Connection has been established successfully.`);
 }).catch((error) => {
    console.error(`Unable to connect to the database: ${error}`);
 });

 export default sequelize