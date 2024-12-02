import {DataTypes, Model} from "sequelize";
import sequelize from "../../squelize";
import {LearningFact} from "../learningFact";
import LearningPackageDto from "./LearningPackageDto";

class LearningFactDto extends Model implements LearningFact {
    declare id: string;
    declare content: string;
    declare review: boolean;
    declare package: LearningPackageDto;
}

LearningFactDto.init(
    {
        index: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
        },
        review: {
            type: DataTypes.BOOLEAN,
        },
        packageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: LearningPackageDto,
                key: 'id'
            }
        },
    },
    {
        sequelize: sequelize,
        modelName: 'LearningFact',
    },
);

sequelize.sync({ force: true })
    .then(() => {
        console.log('Table created successfully.');
    })
    .catch((error) => {
        console.error('Error synchronizing models:', error);
    });

export default LearningFactDto;