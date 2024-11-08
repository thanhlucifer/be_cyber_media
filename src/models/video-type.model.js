import sequelize from "../common/sequelize/connect.sequelize.js";
import { DataTypes, Sequelize } from "sequelize";
const VideoType = sequelize.define(`videos_type`,{
    type_id:{
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false
    },
    type_name:{
       type: DataTypes.STRING(255),
       allowNull: false
    },
    icon: {
       type: DataTypes.STRING(255),
       allowNull: false
    },
    created_at:{
       type: DataTypes.DATE,
       defaultValue: DataTypes.NOW,
       allowNull: false
    },
    updated_at:{
       type: DataTypes.DATE,
       defaultValue: DataTypes.NOW,
       allowNull: false,
       onUpdate: DataTypes.NOW
    },
 } ,{
    tableName: `video_type`,
    timestamps: false //vi da co cot created_at, updated_at nen se de la false
 })

 VideoType.sync().then(() => {
    console.log("VideoType table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

 export default VideoType