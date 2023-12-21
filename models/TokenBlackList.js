import sequelize from "./index.js";
import { DataTypes } from "sequelize";

const TokenBlackList = sequelize.define("token-blacklist", {
    token: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "tokenBlacklist"
})

export default TokenBlackList;