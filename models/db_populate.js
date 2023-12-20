import User from "./User.js";
import Materials from "./Materials.js";
import Furniture from "./Furniture.js";
import * as argon2 from "argon2";
import sequelize from "./index.js";

const dbPopulate = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.destroy({ where: {} });
    await Materials.destroy({ where: {} });
    await Furniture.destroy({ where: {} });

    const hashedPassword = await argon2.hash("password");
    const user = {
      email: "admin@email.com",
      password: hashedPassword
    };

    const createdUser = await User.create(user);

    const materials = [
      { name: "frêne", category: "wood", provider: "BBois" },
      { name: "chêne", category: "wood", provider: "BBois" },
      { name: "noyer", category: "wood", provider: "BBois" },
      { name: "acier", category: "metal", provider: "MetaLo" },
      { name: "inox", category: "metal", provider: "MetaLo" },
      { name: "aluminium", category: "metal", provider: "MetaLo" },
      { name: "plastique", category: "plastic", provider: "pPlastique" }
    ];
    const createdMaterials = await Materials.bulkCreate(materials);

    const furniture = [
      {
        name: "maSuperEtagère",
        category: "shelter",
        description: "Elle est belle mon étagère !",
        price: 240,
        quantity: 2,
      }
    ];
    
    const createdFurniture = await Furniture.bulkCreate(furniture);

    const components = [
      { MaterialId: createdMaterials[0].id, FurnitureId: createdFurniture[0].id, quantity: 2 },
      { MaterialId: createdMaterials[3].id, FurnitureId: createdFurniture[0].id, quantity: 3 }
    ];

  } catch (error) {
    console.error('Erreur lors de la création des enregistrements', error);
  }
};

dbPopulate();
