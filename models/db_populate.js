import User from "./User.js";
import Material from "./Materials.js";
import Furniture from "./Furniture.js";
import FurnitureMaterial from "./Furniture-Material.js";
import TokenBlackList from "./TokenBlackList.js";
import "./associations.js";
import * as argon2 from "argon2";
import sequelize from "./index.js";

const dbPopulate = async () => {
    try {
        await sequelize.sync({ force: true });

        await User.destroy({ where: {} });
        await Material.destroy({ where: {} });
        await Furniture.destroy({ where: {} });
        await FurnitureMaterial.destroy({ where: {} });
        await TokenBlackList.destroy({ where: {} });

        const hashedPassword = await argon2.hash("password");
        const user = {
            email: "admin@email.com",
            password: hashedPassword,
        };

        const createdUser = await User.create(user);

        const materials = [
            { name: "frêne", category: "wood", provider: "BBois", description: "Le Frêne, arbre du genre Fraxinus, appartient à la famille des Oléacées ; une soixantaine d'espèces de frênes sont connues, elles vivent essentiellement dans les forêts tempérées. Caractérisées par des feuilles composées pennées, elles sont reconnaissables à leurs grappes de samares simples surnommées localement « langues d'oiseau »." },
            { name: "chêne", category: "wood", provider: "BBois", description: "Chêne est le nom vernaculaire de nombreuses espèces d'arbres et d'arbustes appartenant au genre Quercus, et à certains genres apparentés de la famille des fagacées, notamment Cyclobalanopsis et Lithocarpus." },
            { name: "noyer", category: "wood", provider: "BBois", description: "Les noyers (Juglans L.) sont un genre d'arbres appartenant à la famille des Juglandacées, originaire des régions tempérées et chaudes principalement de l'hémisphère nord (Eurasie, Amérique du Nord). Selon Pline l'Ancien et d'autres savants, le nom latin Juglans vient de Jovis glans, « gland de Jupiter »1. Son fruit est la noix." },
            { name: "acier", category: "metal", provider: "MetaLo", description: "Un acier est un alliage métallique constitué principalement de fer et de carbone. Il se distingue des fontes et des ferroalliages par sa teneur en carbone comprise entre 0,02 % et 2 % en masse. C’est essentiellement cette teneur en carbone qui confère à l'acier ses propriétés." },
            { name: "inox", category: "metal", provider: "MetaLo", description: "L'acier inoxydable, couramment appelé acier inox ou inox, est un acier (alliage à base de fer et de carbone), comportant moins de 1,2 % de carbone et plus de 10,5 % de chrome, dont la propriété remarquable est d'être peu sensible à la corrosion et de ne pas se dégrader en rouille." },
            { name: "aluminium", category: "metal", provider: "MetaLo", description: "L'aluminium est l'élément chimique de numéro atomique 13, de symbole Al. Il appartient au groupe 13 du tableau périodique ainsi qu'à la famille des métaux pauvres. " },
            { name: "plastique", category: "plastic", provider: "pPlastique", description: "Une matière plastique (le plastique en langage courant) est un polymère généralement mélangé à des additifs, colorants, charges (miscibles ou non dans la matrice polymère). Il en existe une large gamme ; moulés par injections, extrudés, étiré en film, généralement façonné à chaud et sous pression, pour aboutir à un semi-produit ou à un objet, y compris fils et fibres (tissus), mastics, revêtements, etc." },
        ];
        const createdMaterials = await Material.bulkCreate(materials);

        const furniture = [
            {
                name: "maSuperEtagère",
                category: "shelf",
                description: "Elle est belle mon étagère !",
                price: 240,
                quantity: 2,
            },
        ];

        const createdFurniture = await Furniture.bulkCreate(furniture);

        const components = [
            {
                materialId: createdMaterials[0].id,
                furnitureId: createdFurniture[0].id,
                quantity: 2,
            },
            {
                materialId: createdMaterials[3].id,
                furnitureId: createdFurniture[0].id,
                quantity: 3,
            },
        ];

        const createdComponents = await FurnitureMaterial.bulkCreate(
            components
        );


        console.log("Contraintes appliquées avec succès !");
        process.exit(0);
		

    } catch (error) {
        console.error("Erreur lors de la création des enregistrements", error);
    }
};

dbPopulate();
