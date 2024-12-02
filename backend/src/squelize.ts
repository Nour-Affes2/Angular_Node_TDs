import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('LearningFactDb', 'learningDbUser', 'learningDbUser', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: console.log,
});

// Test the connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to PostgreSQL has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

export default sequelize;
