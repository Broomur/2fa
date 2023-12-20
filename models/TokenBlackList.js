import sequelize from "./index.js";
import { DataTypes, Sequelize } from "sequelize";

const TokenBlackList = sequelize.define("blacklist", {
    token: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.STRING,
        allowNull: false,
    }
})

export default TokenBlackList;