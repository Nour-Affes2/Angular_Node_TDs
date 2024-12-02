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
var LearningPackageDto_1 = require("./LearningPackageDto");
var LearningFactDto = /** @class */ (function (_super) {
    __extends(LearningFactDto, _super);
    function LearningFactDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LearningFactDto;
}(sequelize_1.Model));
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
    .then(function () {
    console.log('Table created successfully.');
})
    .catch(function (error) {
    console.error('Error synchronizing models:', error);
});
exports.default = LearningFactDto;
