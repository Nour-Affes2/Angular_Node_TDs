"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var squelize_1 = require("../../squelize");
var LearningPackageDto = /** @class */ (function (_super) {
    __extends(LearningPackageDto, _super);
    function LearningPackageDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LearningPackageDto;
}(sequelize_1.Model));
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
    .then(function () {
    console.log('Table created successfully.');
})
    .catch(function (error) {
    console.error('Error synchronizing models:', error);
});
exports.default = LearningPackageDto;
