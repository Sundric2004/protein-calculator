import { type GoalType, GOALS } from '../types';

/**
 * Generates an array of weights evenly spaced between min and max.
 */
export const generateWeights = (min: number, max: number, rows: number): number[] => {
    if (min >= max || rows <= 0) return [];
    if (rows === 1) return [min];

    const step = (max - min) / (rows - 1);
    const weights = [];
    for (let i = 0; i < rows; i++) {
        // Round to 1 decimal place to avoid floating point precision issues
        weights.push(Math.round((min + i * step) * 10) / 10);
    }
    return weights;
};

/**
 * Calculates the protein needs range for a given weight and goal.
 */
export const calculateProteinNeeds = (weight: number, goalId: GoalType): string => {
    const goal = GOALS.find((g) => g.id === goalId);
    if (!goal) return '-';

    const minProteins = Math.round(weight * goal.minVal);
    const maxProteins = Math.round(weight * goal.maxVal);

    return `${minProteins} - ${maxProteins} g/jour`;
};

/**
 * Generates CSV content from the calculated table.
 */
export const generateCsvContent = (
    weights: number[],
    selectedGoals: GoalType[]
): string => {
    const selectedGoalObjects = GOALS.filter((g) => selectedGoals.includes(g.id));

    // Header row
    const headers = ['Poids (kg)', ...selectedGoalObjects.map((g) => g.label)];
    let csv = headers.join(',') + '\n';

    // Data rows
    weights.forEach((weight) => {
        const row = [weight.toString()];
        selectedGoalObjects.forEach((goal) => {
            row.push(calculateProteinNeeds(weight, goal.id));
        });
        csv += row.map(v => `"${v}"`).join(',') + '\n';
    });

    return csv;
};
