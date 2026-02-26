import './Header.css';

export const Header = () => {
    return (
        <header className="app-header animate-fade-in">
            <div className="header-content">
                <h1>Protéines <span className="highlight">Tracker</span></h1>
                <p>Calculez vos besoins journaliers en protéines selon vos objectifs et votre poids.</p>
            </div>
        </header>
    );
};
