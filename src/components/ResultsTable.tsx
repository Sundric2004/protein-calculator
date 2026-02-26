import { type GoalType, GOALS } from '../types';
import { calculateProteinNeeds, generateCsvContent } from '../utils/calculator';
import './ResultsTable.css';

interface ResultsTableProps {
    weights: number[];
    selectedGoals: GoalType[];
}

export const ResultsTable = ({ weights, selectedGoals }: ResultsTableProps) => {
    if (weights.length === 0 || selectedGoals.length === 0) {
        return null;
    }

    const activeGoals = GOALS.filter(g => selectedGoals.includes(g.id));

    const handleExport = () => {
        const csvData = generateCsvContent(weights, selectedGoals);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'besoins-proteines.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="results-container glass-panel animate-fade-in">
            <div className="results-header">
                <h2>Résultats</h2>
                <button onClick={handleExport} className="export-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Exporter (CSV)
                </button>
            </div>

            <div className="table-wrapper">
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>Poids (kg)</th>
                            {activeGoals.map(goal => (
                                <th key={goal.id}>{goal.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {weights.map((weight, idx) => (
                            <tr key={`${weight}-${idx}`}>
                                <td className="weight-cell">{weight}</td>
                                {activeGoals.map(goal => (
                                    <td key={goal.id}>
                                        <span className="protein-range">
                                            {calculateProteinNeeds(weight, goal.id)}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
