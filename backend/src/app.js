"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var swagger_ui_express_1 = require("swagger-ui-express");
var swagger_jsdoc_1 = require("swagger-jsdoc");
var squelize_1 = require("./squelize");
var LearningFactDto_1 = require("./models/sequelize/LearningFactDto");
var LearningPackageDto_1 = require("./models/sequelize/LearningPackageDto");
var sequelize_1 = require("sequelize");
var UserDto_1 = require("./models/sequelize/UserDto");
var UserLearningFactDto_1 = require("./models/sequelize/UserLearningFactDto");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
var port = 3000;
var options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Express API with Swagger",
            version: "0.1.0",
            description: "Swagger",
        },
        servers: [
            {
                url: "http://localhost:".concat(port),
            },
        ],
    },
    apis: ["./src/**/*.ts"],
    explorer: true
};
var specs = (0, swagger_jsdoc_1.default)(options);
console.log("swagger options", specs);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
LearningFactDto_1.default.belongsTo(LearningPackageDto_1.default, {
    foreignKey: {
        name: "packageId",
        allowNull: false
    }
});
LearningPackageDto_1.default.hasMany(LearningFactDto_1.default, {
    foreignKey: {
        name: "packageId",
        allowNull: false
    }
});
// User and UserLearningFact
UserDto_1.default.hasMany(UserLearningFactDto_1.default, {
    foreignKey: 'userId',
    as: 'learningFacts',
});
UserLearningFactDto_1.default.belongsTo(UserDto_1.default, {
    foreignKey: 'userId',
    as: 'user',
});
// LearningFact and UserLearningFact
LearningFactDto_1.default.hasMany(UserLearningFactDto_1.default, {
    foreignKey: 'learningFactId',
    as: 'userLearningFacts',
});
UserLearningFactDto_1.default.belongsTo(LearningFactDto_1.default, {
    foreignKey: 'learningFactId',
    as: 'learningFact',
});
Promise.all([squelize_1.default.sync({ force: true })])
    .then(function () { return console.log("database synced"); })
    .catch(function (error) { return console.error(error); });
// sequelize.sync({ force: false })
//     .then(() => console.log("Database synced"))
//     .catch((error) => console.error(error));
/**
 * @openapi
 * /api/liveliness:
 *  get:
 *    summary: liveliness
 *    tags:
 *      - monitor
 *    responses:
 *      200:
 *        description: OK if the server alive
 */
app.get('/api/liveliness', function (request, response) {
    response.status(200).send({ "message": "OK" });
});
/**
 * @openapi
 * /api/package:
 *  get:
 *    summary: All learning packages
 *    tags:
 *      - package
 *    responses:
 *      200:
 *        description: All learning packages
 */
app.get('/api/package', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, LearningPackageDto_1.default.findAll()];
            case 1:
                result = _a.sent();
                response.status(200).send(result);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error connecting to the server:', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * @openapi
 * /api/package/{id}:
 *  get:
 *    summary: Learning package by id
 *    tags:
 *      - package
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Numeric id of the package
 *    responses:
 *      200:
 *        description: Learning package by id
 *      404:
 *        description: Learning package id not found
 */
app.get('/api/package/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var packageId, learningPackage, error_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                packageId = Number((_b = (_a = request.params) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (request.params.id || ''));
                if (isNaN(packageId)) {
                    response.status(404).send({ message: 'Invalid package id : ' + packageId });
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, LearningPackageDto_1.default.findOne({ where: { id: packageId } })];
            case 2:
                learningPackage = _c.sent();
                if (learningPackage) {
                    response.status(200).json(learningPackage);
                }
                else {
                    response.status(404).send({ message: 'Package not found for id: ' + packageId });
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _c.sent();
                console.error('Error connecting to the server:', error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * @openapi
 * /api/package:
 *  post:
 *    summary: Create a learning package
 *    tags:
 *      - package
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: "Introduction to Programming"
 *              description:
 *                type: string
 *                example: "A beginner's guide to programming."
 *              category:
 *                type: string
 *                example: "Technology"
 *              targetAudience:
 *                type: string
 *                example: "Students"
 *              difficulty:
 *                type: integer
 *                example: 3
 *            required:
 *              - title
 *              - description
 *              - category
 *              - targetAudience
 *              - difficulty
 *    responses:
 *      200:
 *        description: Learning package created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  example: 1
 *                title:
 *                  type: string
 *                  example: "Introduction to Programming"
 *                description:
 *                  type: string
 *                  example: "A beginner's guide to programming."
 *                category:
 *                  type: string
 *                  example: "Technology"
 *                targetAudience:
 *                  type: string
 *                  example: "Students"
 *                difficulty:
 *                  type: integer
 *                  example: 3
 *      400:
 *        description: Mandatory fields missing
 */
app.post('/api/package', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var packageData, learningPackage, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                packageData = request.body;
                if (!packageData.title || !packageData.description || !packageData.category || !packageData.targetAudience || !packageData.difficulty) {
                    response.status(400).send({ message: 'Mandatory fields missing' });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, LearningPackageDto_1.default.create({
                        title: packageData.title,
                        description: packageData.description,
                        category: packageData.category,
                        targetAudience: packageData.targetAudience,
                        difficulty: parseInt(packageData.difficulty) || 0
                    })];
            case 2:
                learningPackage = _a.sent();
                response.status(200).json(learningPackage);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error('Error connecting to the server:', error_3);
                response.status(500).send({ message: 'Server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * @openapi
 * /api/package/{id}:
 *  put:
 *    summary: Update a learning package by id
 *    tags:
 *      - package
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric id of the package to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: "Updated Title"
 *              description:
 *                type: string
 *                example: "Updated description of the package."
 *              category:
 *                type: string
 *                example: "Updated Category"
 *              targetAudience:
 *                type: string
 *                example: "Updated Audience"
 *              difficulty:
 *                type: integer
 *                example: 2
 *    responses:
 *      200:
 *        description: OK if the learning package is updated
 *      404:
 *        description: Learning package id not found
 *      400:
 *        description: Invalid package id
 *      500:
 *        description: Internal server error
 */
app.put('/api/package/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var packageId, result, error_4;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                packageId = Number((_b = (_a = request.params) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (request.params.id || ''));
                if (isNaN(packageId)) {
                    response.status(404).send({ message: 'Invalid package id: ' + packageId });
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, LearningPackageDto_1.default.update({
                        title: request.body.title || sequelize_1.Sequelize.col('title'),
                        description: request.body.description || sequelize_1.Sequelize.col('description'),
                        category: request.body.category || sequelize_1.Sequelize.col('category'),
                        targetAudience: request.body.targetAudience || sequelize_1.Sequelize.col('targetAudience'),
                        difficulty: parseInt(request.body.difficulty) || sequelize_1.Sequelize.col('difficulty'),
                    }, {
                        where: {
                            id: packageId
                        }
                    })];
            case 2:
                result = _c.sent();
                if (result[0] == 0) {
                    response.status(404).send({ message: 'Package not found for id: ' + packageId });
                    return [2 /*return*/];
                }
                response.status(200).send({ "message": "OK" });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _c.sent();
                console.error('Error connecting to the server:', error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * @openapi
 * /api/package/{id}:
 *  delete:
 *    summary: Delete a learning package by id
 *    tags:
 *      - package
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Numeric id of the package
 *    responses:
 *      200:
 *        description: OK if the learning package deleted
 *      400:
 *        description: Learning package id not found
 */
app.delete('/api/package/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var packageId, result, error_5;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                packageId = Number((_b = (_a = request.params) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (request.params.id || ''));
                if (isNaN(packageId)) {
                    response.status(404).send({ message: 'Invalid package id: ' + packageId });
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, LearningPackageDto_1.default.destroy({
                        where: {
                            id: packageId
                        }
                    })];
            case 2:
                result = _c.sent();
                if (result == 0) {
                    response.status(404).send({ message: 'Package not found for id: ' + packageId });
                    return [2 /*return*/];
                }
                response.status(200).send({ "message": "OK" });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _c.sent();
                console.error('Error connecting to the server:', error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * @openapi
 * /api/package-summaries:
 *  get:
 *    summary: Summaries of all learning packages
 *    tags:
 *      - package
 *    responses:
 *      200:
 *        description: Summaries of all learning packages
 */
app.get('/api/package-summaries', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var results, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, LearningPackageDto_1.default.findAll({ attributes: ['id', 'title'] })];
            case 1:
                results = _a.sent();
                response.status(200).json(results);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error('Error connecting to the server:', error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// LEARNING FACT
/**
 * @openapi
 * /api/package/{id}/fact:
 *  get:
 *    summary: All learning facts for a given package
 *    tags:
 *      - fact
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Numeric id of the package
 *    responses:
 *      200:
 *        description: All learning facts for the given package
 */
app.get('/api/package/:id/fact', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var packageId, result, error_7;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                packageId = Number((_b = (_a = request.params) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : (request.params.id || ''));
                if (isNaN(packageId)) {
                    response.status(404).send({ message: 'Invalid package id: ' + packageId });
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, LearningFactDto_1.default.findAll({
                        where: {
                            packageId: packageId,
                        }
                    })];
            case 2:
                result = _c.sent();
                response.status(200).send(result);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _c.sent();
                console.error('Error connecting to the server:', error_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * @openapi
 * /api/package/fact/{id}:
 *  get:
 *    summary: Learning fact by id
 *    tags:
 *      - fact
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: Textual id of the fact
 *    responses:
 *      200:
 *        description: Learning fact by id
 *      404:
 *        description: Learning fact id not found
 */
app.get('/api/package/fact/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var factId, learningFact, error_8;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                factId = (_b = (_a = request.params) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : request.params.id;
                if (!factId) {
                    response.status(404).send({ message: 'Invalid fact id: ' + factId });
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, LearningFactDto_1.default.findOne({
                        where: {
                            id: factId
                        }
                    })];
            case 2:
                learningFact = _c.sent();
                if (learningFact) {
                    response.status(200).json(learningFact);
                }
                else {
                    response.status(404).send({ message: 'Fact not found for id: ' + factId });
                }
                return [3 /*break*/, 4];
            case 3:
                error_8 = _c.sent();
                console.error('Error connecting to the server:', error_8);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * @openapi
 * /api/package/{id}/fact:
 *  post:
 *    summary: Create a learning fact in the given package
 *    tags:
 *      - fact
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The numeric ID of the package
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                description: The textual ID of the learning fact
 *              content:
 *                type: string
 *                description: The content of the learning fact
 *            required:
 *              - id
 *              - content
 *    responses:
 *      200:
 *        description: Learning fact successfully created
 *      400:
 *        description: Mandatory fields missing in the request body
 *      404:
 *        description: Package not found for the provided ID
 */
app.post('/api/package/:id/fact', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var packageId, _a, id, content, packageExists, learningFact, error_9;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                packageId = Number((_c = (_b = request.params) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : (request.params.id || ''));
                if (isNaN(packageId)) {
                    response.status(404).send({ message: 'Invalid package id: ' + packageId });
                    return [2 /*return*/];
                }
                _a = request.body, id = _a.id, content = _a.content;
                if (!id || !content) {
                    response.status(400).send({ message: 'Mandatory fields missing' });
                    return [2 /*return*/];
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                return [4 /*yield*/, LearningPackageDto_1.default.findOne({
                        where: {
                            id: packageId
                        }
                    })];
            case 2:
                packageExists = _d.sent();
                if (!packageExists) {
                    response.status(404).send({ message: 'Package not found for id: ' + packageId });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, LearningFactDto_1.default.create({
                        id: id,
                        content: content,
                        packageId: packageId
                    })];
            case 3:
                learningFact = _d.sent();
                response.status(200).json(learningFact);
                return [3 /*break*/, 5];
            case 4:
                error_9 = _d.sent();
                console.error('Error connecting to the server:', error_9);
                response.status(500).send({ message: 'Internal Server Error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * @openapi
 * /api/package/fact/{id}:
 *  put:
 *    summary: Update a learning fact by id
 *    tags:
 *      - fact
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Textual ID of the fact to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              content:
 *                type: string
 *                description: The new content of the learning fact
 *            required:
 *              - content
 *    responses:
 *      200:
 *        description: Learning fact successfully updated
 *      400:
 *        description: Invalid learning fact ID or missing content in the request
 *      404:
 *        description: Learning fact not found for the provided ID
 */
app.put('/api/package/fact/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var factId, content, affectedRows, error_10;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                factId = (_b = (_a = request.params) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : request.params.id;
                if (!factId) {
                    response.status(400).send({ message: 'Invalid fact id: ' + factId });
                    return [2 /*return*/];
                }
                content = request.body.content;
                if (!content) {
                    response.status(400).send({ message: 'Content is required to update the fact.' });
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, LearningFactDto_1.default.update({ content: content }, { where: { id: factId } })];
            case 2:
                affectedRows = (_c.sent())[0];
                if (affectedRows === 0) {
                    response.status(404).send({ message: 'Fact not found for id: ' + factId });
                    return [2 /*return*/];
                }
                response.status(200).send({ message: 'Learning fact updated successfully.' });
                return [3 /*break*/, 4];
            case 3:
                error_10 = _c.sent();
                console.error('Error connecting to the server:', error_10);
                response.status(500).send({ message: 'Internal Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * @openapi
 * /api/package/fact/{id}:
 *  delete:
 *    summary: Delete a learning fact by id
 *    tags:
 *      - fact
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Textual ID of the learning fact to delete
 *    responses:
 *      200:
 *        description: Learning fact successfully deleted
 *      404:
 *        description: Learning fact not found for the provided ID
 */
app.delete('/api/package/fact/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var factId, result, error_11;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                factId = (_b = (_a = request.params) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : request.params.id;
                if (!factId) {
                    response.status(400).send({ message: 'Invalid fact id: ' + factId });
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, LearningFactDto_1.default.destroy({
                        where: { id: factId }
                    })];
            case 2:
                result = _c.sent();
                if (result === 0) {
                    response.status(404).send({ message: 'Fact not found for id: ' + factId });
                    return [2 /*return*/];
                }
                response.status(200).send({ message: 'Learning fact deleted successfully.' });
                return [3 /*break*/, 4];
            case 3:
                error_11 = _c.sent();
                console.error('Error connecting to the server:', error_11);
                response.status(500).send({ message: 'Internal Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// NEW ROUTES
// Define your route
/**
 * @swagger
 * /api/start-session:
 *   post:
 *     summary: Start a learning session
 *     description: Get the next learning fact for the user to study today.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user.
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: The next learning fact
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 content:
 *                   type: string
 *                   example: "Fact content goes here."
 *       404:
 *         description: No facts available for learning today.
 *       500:
 *         description: Error starting learning session.
 */
app.post('/api/start-session', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, nextFact, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = request.body.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, LearningFactDto_1.default.findOne({
                        where: { reviewed: false },
                        order: [['createdAt', 'ASC']],
                    })];
            case 2:
                nextFact = _a.sent();
                if (nextFact) {
                    response.status(200).json(nextFact);
                }
                else {
                    response.status(404).send({ message: 'No facts available for learning today.' });
                }
                return [3 /*break*/, 4];
            case 3:
                error_12 = _a.sent();
                response.status(500).send({ message: 'Error starting learning session.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * @swagger
 * /api/end-session:
 *   post:
 *     summary: End the learning session
 *     description: Provides a summary of the user's learning session, including total reviewed facts, remaining facts, and average confidence.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user.
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Session summary with user progress details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Learning session summary"
 *                 totalReviewed:
 *                   type: integer
 *                   example: 5
 *                 remainingFacts:
 *                   type: integer
 *                   example: 10
 *                 averageConfidence:
 *                   type: number
 *                   format: float
 *                   example: 0.85
 *       500:
 *         description: Error ending learning session.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error ending learning session."
 */
app.post('/api/end-session', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userLearningFacts, totalReviewed, remainingFacts, averageConfidence, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = request.body.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, UserLearningFactDto_1.default.findAll({ where: { userId: userId } })];
            case 2:
                userLearningFacts = _a.sent();
                totalReviewed = userLearningFacts.filter(function (fact) { return fact.reviewCount > 0; }).length;
                remainingFacts = userLearningFacts.filter(function (fact) { return fact.reviewCount === 0; }).length;
                averageConfidence = userLearningFacts.reduce(function (acc, fact) { return acc + fact.confidence; }, 0) / userLearningFacts.length;
                response.status(200).json({
                    message: 'Learning session summary',
                    totalReviewed: totalReviewed,
                    remainingFacts: remainingFacts,
                    averageConfidence: averageConfidence,
                });
                return [3 /*break*/, 4];
            case 3:
                error_13 = _a.sent();
                response.status(500).send({ message: 'Error ending learning session.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * @swagger
 * /api/progress/{userId}:
 *   get:
 *     summary: Get user progress
 *     description: Fetches progress data for a user, including completed and remaining facts.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User progress data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User progress data
 *                 totalFacts:
 *                   type: integer
 *                   example: 10
 *                 completedFacts:
 *                   type: integer
 *                   example: 5
 *                 remainingFacts:
 *                   type: integer
 *                   example: 5
 *                 userProgress:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       reviewCount:
 *                         type: integer
 *                         example: 3
 *                       confidence:
 *                         type: number
 *                         format: float
 *                         example: 0.8
 *                       nextReviewDate:
 *                         type: string
 *                         format: date
 *                         example: 2024-11-30
 *       500:
 *         description: Error fetching user progress
 */
app.get('/api/progress/:userId', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userProgress, totalFacts, completedFacts, remainingFacts, error_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = request.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, UserLearningFactDto_1.default.findAll({
                        where: { userId: userId },
                        attributes: ['reviewCount', 'confidence', 'nextReviewDate'],
                    })];
            case 2:
                userProgress = _a.sent();
                totalFacts = userProgress.length;
                completedFacts = userProgress.filter(function (fact) { return fact.reviewCount > 0; }).length;
                remainingFacts = totalFacts - completedFacts;
                response.status(200).json({
                    message: 'User progress data',
                    totalFacts: totalFacts,
                    completedFacts: completedFacts,
                    remainingFacts: remainingFacts,
                    userProgress: userProgress,
                });
                return [3 /*break*/, 4];
            case 3:
                error_14 = _a.sent();
                response.status(500).send({ message: 'Error fetching user progress.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/*
 * @swagger
 * /api/update-confidence:
 *   put:
 *     summary: Update confidence level for a learning fact
 *     description: Update the user's confidence level for a specific learning fact.
 *     tags:
 *       - Confidence
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user
 *               learningFactId:
 *                 type: string
 *                 description: ID of the learning fact
 *               confidence:
 *                 type: number
 *                 format: float
 *                 description: Updated confidence level (0 to 1)
 *     responses:
 *       200:
 *         description: Confidence updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedConfidence:
 *                   type: number
 *                   format: float
 *       500:
 *         description: Error updating confidence
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.put('/api/update-confidence', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, learningFactId, confidence, error_15;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, userId = _a.userId, learningFactId = _a.learningFactId, confidence = _a.confidence;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, UserLearningFactDto_1.default.update({ confidence: confidence }, {
                        where: { userId: userId, learningFactId: learningFactId },
                    })];
            case 2:
                _b.sent();
                response.status(200).json({
                    message: 'Confidence updated successfully!',
                    updatedConfidence: confidence,
                });
                return [3 /*break*/, 4];
            case 3:
                error_15 = _b.sent();
                response.status(500).send({ message: 'Error updating confidence.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
