import { Application, Request, RequestHandler, Response } from 'express';

import learningPackages from './data/learningPackages';
import * as swaggerUi from 'swagger-ui-express';

import * as swaggerJsdoc from 'swagger-jsdoc';

import squelize from "./squelize";
import LearningFactDto from "./models/sequelize/LearningFactDto";
import LearningPackageDto from "./models/sequelize/LearningPackageDto";
import {Sequelize} from "sequelize";
import sequelize from "./squelize";
import UserDto from "./models/sequelize/UserDto";
import UserLearningFactDto from "./models/sequelize/UserLearningFactDto";

const express = require('express');


app.use(express.json())
app.use(express.static("public"));

const port = 3000


const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Express API with Swagger",
            version: "0.1.0",
            description: "Swagger",
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ["./src/**/*.ts"],
    explorer: true
};

const specs = swaggerJsdoc(options);
console.log("swagger options", specs)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


LearningFactDto.belongsTo(LearningPackageDto, {
    foreignKey: {
        name: "packageId",
        allowNull: false
    }
});
LearningPackageDto.hasMany(LearningFactDto, {
    foreignKey: {
        name: "packageId",
        allowNull: false
    }
});

// User and UserLearningFact
UserDto.hasMany(UserLearningFactDto, {
    foreignKey: 'userId',
    as: 'learningFacts',
});

UserLearningFactDto.belongsTo(UserDto, {
    foreignKey: 'userId',
    as: 'user',
});

// LearningFact and UserLearningFact
LearningFactDto.hasMany(UserLearningFactDto, {
    foreignKey: 'learningFactId',
    as: 'userLearningFacts',
});
UserLearningFactDto.belongsTo(LearningFactDto, {
    foreignKey: 'learningFactId',
    as: 'learningFact',
});



Promise.all([squelize.sync({force: true})])
    .then(() => console.log("database synced"))
    .catch((error) => console.error(error));

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
app.get('/api/liveliness', (request: Request, response: Response) => {
    response.status(200).send({"message": "OK"});
})


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
app.get('/api/package', async (request: Request, response: Response) => {
    try {
        const result = await LearningPackageDto.findAll();
        response.status(200).send(result);
    } catch (error) {
        console.error('Error connecting to the server:', error);
    }
});

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
app.get('/api/package/:id', async (request: Request, response: Response) => {
    const packageId = Number(request.params?.id ?? (request.params.id || ''));
    if (isNaN(packageId)) {
        response.status(404).send({message: 'Invalid package id : ' + packageId});
        return;
    }
    try {
        const learningPackage = await LearningPackageDto.findOne({where: {id: packageId}});
        if (learningPackage) {
            response.status(200).json(learningPackage);
        } else {
            response.status(404).send({message: 'Package not found for id: ' + packageId});
        }
    } catch (error) {
        console.error('Error connecting to the server:', error);
    }
})

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
app.post('/api/package', async (request: Request, response: Response) => {
    const packageData = request.body;
    if (!packageData.title || !packageData.description || !packageData.category || !packageData.targetAudience || !packageData.difficulty) {
        response.status(400).send({message: 'Mandatory fields missing'});
        return;
    }
    try {
        const learningPackage = await LearningPackageDto.create({
            title: packageData.title,
            description: packageData.description,
            category: packageData.category,
            targetAudience: packageData.targetAudience,
            difficulty: parseInt(packageData.difficulty) || 0
        });
        response.status(200).json(learningPackage);
    } catch (error) {
        console.error('Error connecting to the server:', error);
        response.status(500).send({message: 'Server error'});
    }
});

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
app.put('/api/package/:id', async (request: Request, response: Response) => {
    const packageId = Number(request.params?.id ?? (request.params.id || ''));
    if (isNaN(packageId)) {
        response.status(404).send({message: 'Invalid package id: ' + packageId});
        return;
    }
    try {
        const result = await LearningPackageDto.update(
            {
                title: request.body.title || Sequelize.col('title'),
                description: request.body.description || Sequelize.col('description'),
                category: request.body.category || Sequelize.col('category'),
                targetAudience: request.body.targetAudience || Sequelize.col('targetAudience'),
                difficulty: parseInt(request.body.difficulty) || Sequelize.col('difficulty'),
            },
            {
                where:
                    {
                        id: packageId
                    }
            }
        );

        if (result[0] == 0) {
            response.status(404).send({message: 'Package not found for id: ' + packageId});
            return;
        }
        response.status(200).send({"message": "OK"});
    } catch (error) {
        console.error('Error connecting to the server:', error);
    }
});

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
app.delete('/api/package/:id', async (request: Request, response: Response) => {
    const packageId = Number(request.params?.id ?? (request.params.id || ''));
    if (isNaN(packageId)) {
        response.status(404).send({message: 'Invalid package id: ' + packageId});
        return;
    }
    try {
        const result = await LearningPackageDto.destroy(
            {
                where:
                    {
                        id: packageId
                    }
            }
        );

        if (result == 0) {
            response.status(404).send({message: 'Package not found for id: ' + packageId});
            return;
        }
        response.status(200).send({"message": "OK"});
    } catch (error) {
        console.error('Error connecting to the server:', error);
    }
});

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
app.get('/api/package-summaries', async (request: Request, response: Response) => {
    try {
        const results = await LearningPackageDto.findAll({attributes: ['id', 'title']});
        response.status(200).json(results);
    } catch (error) {
        console.error('Error connecting to the server:', error);
    }
});


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
app.get('/api/package/:id/fact', async (request: Request, response: Response) => {
    const packageId = Number(request.params?.id ?? (request.params.id || ''));
    if (isNaN(packageId)) {
        response.status(404).send({message: 'Invalid package id: ' + packageId});
        return;
    }
    try {
        const result = await LearningFactDto.findAll({
            where: {
                packageId: packageId,
            }
        });
        response.status(200).send(result);
    } catch (error) {
        console.error('Error connecting to the server:', error);
    }
});

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
app.get('/api/package/fact/:id', async (request: Request, response: Response) => {
    const factId = request.params?.id ?? request.params.id;
    if (!factId) {
        response.status(404).send({message: 'Invalid fact id: ' + factId});
        return;
    }
    try {
        const learningFact = await LearningFactDto.findOne(
            {
                where: {
                    id: factId
                }
            });
        if (learningFact) {
            response.status(200).json(learningFact);
        } else {
            response.status(404).send({message: 'Fact not found for id: ' + factId});
        }
    } catch (error) {
        console.error('Error connecting to the server:', error);
    }
})
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
app.post('/api/package/:id/fact', async (request: Request, response: Response) => {
    const packageId = Number(request.params?.id ?? (request.params.id || ''));
    if (isNaN(packageId)) {
        response.status(404).send({ message: 'Invalid package id: ' + packageId });
        return;
    }

    const { id, content } = request.body;
    if (!id || !content) {
        response.status(400).send({ message: 'Mandatory fields missing' });
        return;
    }

    try {
        const packageExists = await LearningPackageDto.findOne({
            where: {
                id: packageId
            }
        });

        if (!packageExists) {
            response.status(404).send({ message: 'Package not found for id: ' + packageId });
            return;
        }

        const learningFact = await LearningFactDto.create({
            id,
            content,
            packageId
        });

        response.status(200).json(learningFact);
    } catch (error) {
        console.error('Error connecting to the server:', error);
        response.status(500).send({ message: 'Internal Server Error' });
    }
});

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
app.put('/api/package/fact/:id', async (request: Request, response: Response) => {
    const factId = request.params?.id ?? request.params.id;
    if (!factId) {
        response.status(400).send({ message: 'Invalid fact id: ' + factId });
        return;
    }

    const { content } = request.body;
    if (!content) {
        response.status(400).send({ message: 'Content is required to update the fact.' });
        return;
    }

    try {
        const [affectedRows] = await LearningFactDto.update(
            { content },
            { where: { id: factId } }
        );

        if (affectedRows === 0) {
            response.status(404).send({ message: 'Fact not found for id: ' + factId });
            return;
        }

        response.status(200).send({ message: 'Learning fact updated successfully.' });
    } catch (error) {
        console.error('Error connecting to the server:', error);
        response.status(500).send({ message: 'Internal Server Error' });
    }
});

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
app.delete('/api/package/fact/:id', async (request: Request, response: Response) => {
    const factId = request.params?.id ?? request.params.id;
    if (!factId) {
        response.status(400).send({ message: 'Invalid fact id: ' + factId });
        return;
    }

    try {
        const result = await LearningFactDto.destroy({
            where: { id: factId }
        });

        if (result === 0) {
            response.status(404).send({ message: 'Fact not found for id: ' + factId });
            return;
        }

        response.status(200).send({ message: 'Learning fact deleted successfully.' });
    } catch (error) {
        console.error('Error connecting to the server:', error);
        response.status(500).send({ message: 'Internal Server Error' });
    }
});

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
app.post('/api/start-session', async (request, response) => {
    const { userId } = request.body;
    try {
        const nextFact = await LearningFactDto.findOne({
            where: { reviewed: false },
            order: [['createdAt', 'ASC']],
        });
        if (nextFact) {
            response.status(200).json(nextFact);
        } else {
            response.status(404).send({ message: 'No facts available for learning today.' });
        }
    } catch (error) {
        response.status(500).send({ message: 'Error starting learning session.' });
    }
});


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
app.post('/api/end-session', async (request, response) => {
    const { userId } = request.body;
    try {
        // Fetch the user's learning facts to summarize their progress
        const userLearningFacts = await UserLearningFactDto.findAll({ where: { userId } });

        const totalReviewed = userLearningFacts.filter(fact => fact.reviewCount > 0).length;
        const remainingFacts = userLearningFacts.filter(fact => fact.reviewCount === 0).length;
        const averageConfidence = userLearningFacts.reduce((acc, fact) => acc + fact.confidence, 0) / userLearningFacts.length;

        response.status(200).json({
            message: 'Learning session summary',
            totalReviewed,
            remainingFacts,
            averageConfidence,
        });
    } catch (error) {
        response.status(500).send({ message: 'Error ending learning session.' });
    }
});



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
app.get('/api/progress/:userId', async (request, response) => {
    const { userId } = request.params;
    try {
        const userProgress = await UserLearningFactDto.findAll({
            where: { userId },
            attributes: ['reviewCount', 'confidence', 'nextReviewDate'],
        });

        const totalFacts = userProgress.length;
        const completedFacts = userProgress.filter(fact => fact.reviewCount > 0).length;
        const remainingFacts = totalFacts - completedFacts;

        response.status(200).json({
            message: 'User progress data',
            totalFacts,
            completedFacts,
            remainingFacts,
            userProgress,
        });
    } catch (error) {
        response.status(500).send({ message: 'Error fetching user progress.' });
    }
});


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
app.put('/api/update-confidence', async (request, response) => {
    const { userId, learningFactId, confidence } = request.body;
    try {
        await UserLearningFactDto.update({ confidence }, {
            where: { userId, learningFactId },
        });

        response.status(200).json({
            message: 'Confidence updated successfully!',
            updatedConfidence: confidence,
        });
    } catch (error) {
        response.status(500).send({ message: 'Error updating confidence.' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
