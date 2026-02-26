import { useState } from 'react';
import { Header } from './components/Header';
import { ConfigurationForm } from './components/ConfigurationForm';
import { ResultsTable } from './components/ResultsTable';
import { generateWeights } from './utils/calculator';
import { type GoalType } from './types';
import './App.css';

function App() {
  const [weights, setWeights] = useState<number[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<GoalType[]>([]);

  const handleCalculate = (minWeight: number, maxWeight: number, rows: number, goals: GoalType[]) => {
    const generatedWeights = generateWeights(minWeight, maxWeight, rows);
    setWeights(generatedWeights);
    setSelectedGoals(goals);
  };

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <aside className="sidebar">
          <ConfigurationForm onCalculate={handleCalculate} />
        </aside>

        <section className="results-section">
          {weights.length > 0 && selectedGoals.length > 0 ? (
            <ResultsTable weights={weights} selectedGoals={selectedGoals} />
          ) : (
            <div className="empty-state glass-panel animate-fade-in">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <p>Renseignez vos paramètres et cliquez sur "Générer le tableau" pour voir vos résultats.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
