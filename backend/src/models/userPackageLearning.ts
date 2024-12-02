export interface UserPackageLearning {
    id: string;
    userId: string;
    learningPackageId: string;
    startDate: Date | string;
    expectedEndDate: Date | string;
    minutesPerDayObjective: number;
}