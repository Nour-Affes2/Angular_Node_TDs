"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize('LearningFactDb', 'learningDbUser', 'learningDbUser', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: console.log,
});
// Test the connection
sequelize
    .authenticate()
    .then(function () {
    console.log('Connection to PostgreSQL has been established successfully.');
})
    .catch(function (error) {
    console.error('Unable to connect to the database:', error);
});
exports.default = sequelize;
