import User from "./User.js";
import Materials from "./Materials.js";
import * as argon2 from "argon2";
import Furniture from "./Furniture.js";

const db_populate = async () => {
    await User.deleteMany({});
    await Materials.deleteMany({});
    await Furniture.deleteMany({});
    const hashedPassword = await argon2.hash("password");
    const user = {
        email: "admin@email.com",
        password: hashedPassword
    };
    
    await User.create(user);

    const materials = [
        {name: "frêne", category: "bois", provider: "BBois"},
        {name: "chêne", category: "bois", provider: "BBois"},
        {name: "noyer", category: "bois", provider: "BBois"},
        {name: "acier", category: "metal", provider: "MetaLo"},
        {name: "inox", category: "metal", provider: "MetaLo"},
        {name: "aluminium", category: "metal", provider: "MetaLo"},
        {name: "plastique", category: "plastique", provider: "pPlastique"}
    ];

    await Materials.create(materials);

    const db_Materials = await Materials.find();

    const furniture = [
        {name: "maSuperEtagère", category: "étagère", materials: [{id: db_Materials[0].id, quantity: 2}, {id: db_Materials[3].id, quantity: 3}], description: "Elle est belle mon étagère !", price: 240, quantity: 2}
    ];

    await Furniture.create(furniture);
}

db_populate();