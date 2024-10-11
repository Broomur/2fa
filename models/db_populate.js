import User from "./User.js";
import TokenBlackList from "./TokenBlackList.js";
import * as argon2 from "argon2";
import sequelize from "./index.js";

const dbPopulate = async () => {
    try {
        await sequelize.sync({ force: true });

        await User.destroy({ where: {} });
        await TokenBlackList.destroy({ where: {} });

        const hashedPassword = await argon2.hash("password");
        const user = {
            email: "admin@email.com",
            password: hashedPassword,
        };

        const createdUser = await User.create(user);

        console.log("Contraintes appliquées avec succès !");
        process.exit(0);
		

    } catch (error) {
        console.error("Erreur lors de la création des enregistrements", error);
    }
};

dbPopulate();
