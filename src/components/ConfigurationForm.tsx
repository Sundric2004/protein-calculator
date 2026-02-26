import { useState, type FormEvent, useEffect } from 'react';
import { type GoalType, GOALS } from '../types';
import './ConfigurationForm.css';

interface ConfigurationFormProps {
    onCalculate: (minWeight: number, maxWeight: number, rows: number, goals: GoalType[]) => void;
}

export const ConfigurationForm = ({ onCalculate }: ConfigurationFormProps) => {
    const [minWeight, setMinWeight] = useState<number>(50);
    const [maxWeight, setMaxWeight] = useState<number>(100);
    const [rows, setRows] = useState<number>(6);
    const [selectedGoals, setSelectedGoals] = useState<GoalType[]>(['sedentary', 'muscle_gain']);
    const [error, setError] = useState<string>('');

    // Validate inputs
    useEffect(() => {
        if (minWeight <= 0 || maxWeight <= 0 || rows <= 0) {
            setError('Toutes les valeurs doivent être supérieures à 0.');
        } else if (minWeight >= maxWeight) {
            setError('Le poids minimum doit être inférieur au poids maximum.');
        } else if (selectedGoals.length === 0) {
            setError('Veuillez sélectionner au moins un objectif.');
        } else {
            setError('');
        }
    }, [minWeight, maxWeight, rows, selectedGoals]);

    const handleGoalToggle = (goal: GoalType) => {
        setSelectedGoals(prev =>
            prev.includes(goal)
                ? prev.filter(g => g !== goal)
                : [...prev, goal]
        );
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!error) {
            onCalculate(minWeight, maxWeight, rows, selectedGoals);
        }
    };

    return (
        <form className="config-form glass-panel animate-fade-in" onSubmit={handleSubmit}>
            <h2>Paramètres</h2>

            <div className="form-group">
                <label>Objectifs</label>
                <div className="checkbox-group">
                    {GOALS.map(goal => (
                        <label key={goal.id} className={`checkbox-label ${selectedGoals.includes(goal.id) ? 'active' : ''}`}>
                            <input
                                type="checkbox"
                                checked={selectedGoals.includes(goal.id)}
                                onChange={() => handleGoalToggle(goal.id)}
                            />
                            <span className="checkbox-text">{goal.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="input-row">
                <div className="form-group flex-1">
                    <label htmlFor="minWeight">Poids Min (kg)</label>
                    <input
                        id="minWeight"
                        type="number"
                        min="1"
                        value={minWeight}
                        onChange={(e) => setMinWeight(Number(e.target.value))}
                        className="input-field"
                    />
                </div>

                <div className="form-group flex-1">
                    <label htmlFor="maxWeight">Poids Max (kg)</label>
                    <input
                        id="maxWeight"
                        type="number"
                        min="2"
                        value={maxWeight}
                        onChange={(e) => setMaxWeight(Number(e.target.value))}
                        className="input-field"
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="rows">Nombre de lignes générées</label>
                <input
                    id="rows"
                    type="number"
                    min="2"
                    max="50"
                    value={rows}
                    onChange={(e) => setRows(Number(e.target.value))}
                    className="input-field"
                />
                <small className="help-text">Combien de poids intermédiaires afficher</small>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
                type="submit"
                className="submit-button"
                disabled={!!error}
            >
                Générer le tableau
            </button>
        </form>
    );
};
