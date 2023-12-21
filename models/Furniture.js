import sequelize from "./index.js";
import { DataTypes, Sequelize } from "sequelize";

const Furniture = sequelize.define("furniture", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM(["shelf", "cupboard"]),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    pictures: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    date: {
        type: DataTypes.DATE,
        required: true,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: "furnitures"
});



export default Furniture;