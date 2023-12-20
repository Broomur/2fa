import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { PSQL_HOST, PSQL_PORT, PSQL_NAME, PSQL_USER, PSQL_PASSWORD } = process.env;


const sequelize = new Sequelize(`postgres://${PSQL_USER}:${PSQL_PASSWORD}@${PSQL_HOST}:${PSQL_PORT}/${PSQL_NAME}`,{ logging: false });

try {
    await sequelize.authenticate();
} catch (error) {
    console.error('sequelize:', error);
}


export default sequelize;