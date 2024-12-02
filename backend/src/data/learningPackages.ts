import { LearningPackage } from '../models/learningPackage';

const learningPackages: LearningPackage[] = [
    {
        id: 1,
        title: 'Learn TypeScript',
        description: 'A comprehensive package to master TypeScript programming language.',
        category: 'Programming',
        targetAudience: 'Beginner to Intermediate',
        difficultyLevel: 5
    },
    {
        id: 2,
        title: 'Learn NodeJs',
        description: 'Learn the fundamentals of Node.js and how to build server-side applications.',
        category: 'Programming',
        targetAudience: 'Intermediate',
        difficultyLevel: 7
    },
    {
        id: 3,
        title: 'Learn HTML',
        description: 'Master HTML for web development and create beautiful web pages.',
        category: 'Web Development',
        targetAudience: 'Beginner',
        difficultyLevel: 3
    },
    {
        id: 4,
        title: 'Learn Angular',
        description: 'Learn how to build modern web applications using Angular.',
        category: 'Web Development',
        targetAudience: 'Intermediate to Advanced',
        difficultyLevel: 8
    }
];

export default learningPackages;
