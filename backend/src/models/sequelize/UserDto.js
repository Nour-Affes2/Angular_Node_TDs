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
var UserDto = /** @class */ (function (_super) {
    __extends(UserDto, _super);
    function UserDto() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = '';
        _this.username = '';
        _this.password = '';
        return _this;
    }
    return UserDto;
}(sequelize_1.Model));
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
    .then(function () {
    console.log('Table created successfully.');
})
    .catch(function (error) {
    console.error('Error synchronizing models:', error);
});
exports.default = UserDto;
