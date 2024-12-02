import { DataTypes, Model } from "sequelize";
import sequelize from "../../squelize";
import { UserLearningFact } from "../userLearningFact";

class UserLearningFactDto extends Model implements UserLearningFact {
    declare id: string;
    declare userId: string;
    declare learningFactId: string;
    declare reviewCount: number;
    declare confidence: number;
    declare lastReviewed: Date | string;
}

UserLearningFactDto.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Users', // Table name of the User model
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        learningFactId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'LearningFacts', // Table name of the LearningFact model
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        reviewCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        confidence: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0,
        },
        lastReviewed: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize: sequelize,
        modelName: 'UserLearningPackage',
    },
);

// Sync the model with the database
sequelize
    .sync({ force: true })
    .then(() => {
        console.log('Table created successfully.');
    })
    .catch((error) => {
        console.error('Error synchronizing models:', error);
    });

export default UserLearningFactDto;
