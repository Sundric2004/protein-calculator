export type GoalType = 'sedentary' | 'endurance' | 'maintenance' | 'muscle_gain';

export interface GoalDefinition {
  id: GoalType;
  label: string;
  minVal: number;
  maxVal: number;
}

export const GOALS: GoalDefinition[] = [
  { id: 'sedentary', label: 'Sédentaire', minVal: 0.8, maxVal: 1.0 },
  { id: 'endurance', label: 'Endurance', minVal: 1.2, maxVal: 1.6 },
  { id: 'maintenance', label: 'Conservation de la masse musculaire', minVal: 1.6, maxVal: 1.8 },
  { id: 'muscle_gain', label: 'Prise de masse musculaire', minVal: 1.8, maxVal: 2.2 },
];
