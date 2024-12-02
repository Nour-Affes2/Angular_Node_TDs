"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const squelize_1 = __importDefault(require("../../squelize"));
class LearningPackageDto extends sequelize_1.Model {
}
LearningPackageDto.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
    },
    targetAudience: {
        type: sequelize_1.DataTypes.STRING,
    },
    difficultyLevel: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    sequelize: squelize_1.default,
    modelName: 'LearningPackage',
});
squelize_1.default.sync({ force: true })
    .then(() => {
    console.log('Table created successfully.');
})
    .catch((error) => {
    console.error('Error synchronizing models:', error);
});
exports.default = LearningPackageDto;
