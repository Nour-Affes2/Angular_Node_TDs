"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const squelize_1 = __importDefault(require("../../squelize"));
class UserLearningFactDto extends sequelize_1.Model {
}
UserLearningFactDto.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Users', // Table name of the User model
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    learningFactId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'LearningFacts', // Table name of the LearningFact model
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    reviewCount: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    confidence: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    lastReviewed: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: squelize_1.default,
    modelName: 'UserLearningPackage',
});
// Sync the model with the database
squelize_1.default
    .sync({ force: true })
    .then(() => {
    console.log('Table created successfully.');
})
    .catch((error) => {
    console.error('Error synchronizing models:', error);
});
exports.default = UserLearningFactDto;
