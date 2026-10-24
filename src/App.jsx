import { useState, useEffect } from 'react';
import Home from './components/Home';
import StudyMode from './components/StudyMode';
import PracticeMode from './components/PracticeMode';
import StudyTimer from './components/StudyTimer';
import './index.css';

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('fluentia_settings_v1');
    return saved ? JSON.parse(saved).theme : 'light';
  });

  const [targetLang, setTargetLang] = useState(() => {
    return localStorage.getItem('fluentia_target_lang') || 'en';
  });

  // Auto-Play habilitado por defecto.
  const [autoPlay, setAutoPlay] = useState(true);

  const [currentView, setCurrentView] = useState('home');
  const [activeModule, setActiveModule] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fluentia_settings_v1', JSON.stringify({ theme }));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('fluentia_target_lang', targetLang);
  }, [targetLang]);

  // Una traducción en la primera tarjeta habilita el módulo completo.
  // Los JSON de cada idioma se publican únicamente cuando están completos.
  const languageAvailable = Boolean(activeModule?.cards?.[0]?.translations?.[targetLang]?.trim());

  useEffect(() => {
    window.speechSynthesis.cancel();
  }, [targetLang]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navigateTo = (view) => {
    window.speechSynthesis.cancel();
    setCurrentView(view);
  };

  const handleSelectModule = async (jsonFileName, mode) => {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}data/${jsonFileName}`);
      const data = await response.json();

      setActiveModule(data);
      setCurrentView(mode);
    } catch (error) {
      console.error("Error cargando el módulo:", error);
    }
  };

  return (
    <>
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="12" height="12" rx="3" fill="currentColor" opacity="0.55" />
              <rect x="9" y="9" width="12" height="12" rx="3" fill="currentColor" />
            </svg>
          </span>
          <div className="brand-copy">
            <h1>FLUENTIA<br /><span>App</span></h1>
          </div>
        </div>
        <div className="header-actions">
          <select
            className="pill-btn header-language"
            aria-label="Idioma objetivo"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            <option value="en">🇬🇧 Inglés</option>
            <option value="fr">🇫🇷 Francés</option>
            <option value="it">🇮🇹 Italiano</option>
            <option value="pt">🇧🇷 Portugués</option>
            <option value="de">🇩🇪 Alemán</option>
          </select>

          <label className="auto-play-toggle">
            <input
              type="checkbox"
              checked={autoPlay}
              onChange={(e) => setAutoPlay(e.target.checked)}
              style={{ accentColor: 'var(--primary)' }}
            /> Auto-Play
          </label>

          <StudyTimer />

          <button onClick={toggleTheme} className="icon-btn" title="Cambiar Tema" aria-label="Cambiar tema claro u oscuro">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </header>

      {currentView === 'home' && (
        <Home onSelectModule={handleSelectModule} />
      )}

      {(currentView === 'study' || currentView === 'practice') && activeModule && !languageAvailable && (
        <main className="view" style={{ minHeight: '55vh', display: 'grid', placeItems: 'center', padding: '24px' }}>
          <div role="alert" aria-labelledby="language-unavailable-title" aria-describedby="language-unavailable-description" className="card" style={{ width: '100%', maxWidth: '420px', padding: '28px 22px', textAlign: 'center', display: 'grid', gap: '14px', justifyItems: 'center' }}>
            <span aria-hidden="true" style={{ fontSize: '2.5rem' }}>🌐</span>
            <h2 id="language-unavailable-title" style={{ margin: 0 }}>Idioma no disponible</h2>
            <p id="language-unavailable-description" style={{ margin: 0 }}>Este módulo todavía no está disponible en el idioma seleccionado. Elige otro idioma en el menú superior para continuar.</p>
            <button type="button" className="pill-btn" onClick={() => navigateTo('home')}>← Regresar a temas</button>
          </div>
        </main>
      )}

      {currentView === 'study' && languageAvailable && (
        // Modo de estudio del módulo seleccionado.
        <StudyMode
          key={targetLang}
          moduleData={activeModule}
          targetLang={targetLang}
          onBack={() => navigateTo('home')}
          autoPlay={autoPlay}
        />
      )}

      {currentView === 'practice' && languageAvailable && (
        <PracticeMode
          key={targetLang}
          moduleData={activeModule}
          targetLang={targetLang}
          onBack={() => navigateTo('home')}
        />
      )}
    </>
  );
}

export default App;
