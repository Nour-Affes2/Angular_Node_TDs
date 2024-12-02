export interface UserLearningFact {
    id: string;
    userId: string;
    learningFactId: string;
    reviewCount: number;
    confidence: number; // between 0 and 1
    lastReviewed: Date | string;
}