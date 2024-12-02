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
var UserLearningFactDto = /** @class */ (function (_super) {
    __extends(UserLearningFactDto, _super);
    function UserLearningFactDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserLearningFactDto;
}(sequelize_1.Model));
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
    .then(function () {
    console.log('Table created successfully.');
})
    .catch(function (error) {
    console.error('Error synchronizing models:', error);
});
exports.default = UserLearningFactDto;
