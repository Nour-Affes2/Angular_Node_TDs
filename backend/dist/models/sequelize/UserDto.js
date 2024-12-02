"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const squelize_1 = __importDefault(require("../../squelize"));
class UserDto extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.id = '';
        this.username = '';
        this.password = '';
    }
}
UserDto.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // password is required
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: squelize_1.default, // Correct sequelize instance
    modelName: "User",
});
squelize_1.default.sync({ force: true })
    .then(() => {
    console.log('Table created successfully.');
})
    .catch((error) => {
    console.error('Error synchronizing models:', error);
});
exports.default = UserDto;
