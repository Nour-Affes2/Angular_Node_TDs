import {DataTypes, Model} from "sequelize";
import sequelize from "../../squelize";
import {LearningPackage} from '../learningPackage';
import LearningFactDto from "./LearningFactDto";

class LearningPackageDto extends Model implements LearningPackage {
    declare id: number;
    declare title: string;
    declare description: string;
    declare category: string;
    declare targetAudience: string;
    declare facts: LearningFactDto[];
    declare difficultyLevel: number;
}

LearningPackageDto.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING,
        },
        targetAudience: {
            type: DataTypes.STRING,
        },
        difficultyLevel: {
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize: sequelize,
        modelName: 'LearningPackage',
    },
);

sequelize.sync({ force: true })
    .then(() => {
        console.log('Table created successfully.');
    })
    .catch((error) => {
        console.error('Error synchronizing models:', error);
    });

export default LearningPackageDto;