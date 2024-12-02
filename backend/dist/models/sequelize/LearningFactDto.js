"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const squelize_1 = __importDefault(require("../../squelize"));
const LearningPackageDto_1 = __importDefault(require("./LearningPackageDto"));
class LearningFactDto extends sequelize_1.Model {
}
LearningFactDto.init({
    index: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
    },
    review: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    packageId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LearningPackageDto_1.default,
            key: 'id'
        }
    },
}, {
    sequelize: squelize_1.default,
    modelName: 'LearningFact',
});
squelize_1.default.sync({ force: true })
    .then(() => {
    console.log('Table created successfully.');
})
    .catch((error) => {
    console.error('Error synchronizing models:', error);
});
exports.default = LearningFactDto;
