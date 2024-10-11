import sequelize from "./index.js";
import { DataTypes } from "sequelize";

const User = sequelize.define('user', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(254),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    twoFactorEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    twoFactorSecret: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'users',
})

export default User;