import { useEffect, useRef, useState } from 'react';
import NumberRangeFilter from './NumberRangeFilter';
import { filterCardsByNumberRange, isNumbersModule } from '../utils/numberRanges';

export default function StudyMode({ moduleData, targetLang, onBack, autoPlay }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [speechRate, setSpeechRate] = useState(1.0);
    const [range, setRange] = useState('all');
    const audioTimeoutRef = useRef(null);

    useEffect(() => () => {
        window.clearTimeout(audioTimeoutRef.current);
        window.speechSynthesis.cancel();
    }, []);

    if (!moduleData || !moduleData.cards) return null;

    const cards = filterCardsByNumberRange(moduleData, range);
    const currentCard = cards[currentIndex];
    const totalCards = cards.length;
    const progressPct = totalCards > 1 ? Math.round((currentIndex / (totalCards - 1)) * 100) : 100;

    const cancelAudio = () => {
        window.clearTimeout(audioTimeoutRef.current);
        window.speechSynthesis.cancel();
    };

    const changeRange = newRange => {
        cancelAudio();
        setIsFlipped(false);
        setCurrentIndex(0);
        setRange(newRange);
    };

    const ttsVoices = {
        'en': 'en-US',
        'fr': 'fr-FR',
        'it': 'it-IT',
        'pt': 'pt-BR'
    };

    const playAudio = () => {
        if (!currentCard) return;
        window.speechSynthesis.cancel();
        const text = currentCard.translations[targetLang];
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = ttsVoices[targetLang] || 'en-US';
        utterance.rate = speechRate;
        window.speechSynthesis.speak(utterance);
    };

    const handleFlip = () => {
        const newFlippedState = !isFlipped;
        cancelAudio();
        setIsFlipped(newFlippedState);

        if (newFlippedState && autoPlay) {
            audioTimeoutRef.current = window.setTimeout(playAudio, 150);
        }
    };

    // Función unificada para cambiar de tarjeta y resetear el giro
    const changeCard = (newIndex) => {
        cancelAudio();
        setIsFlipped(false);
        setCurrentIndex(newIndex);
    };

    if (!currentCard) {
        return (
            <main className="view">
                <div className="progress-top study-controls">
                    {isNumbersModule(moduleData) && <NumberRangeFilter value={range} onChange={changeRange} />}
                    <button className="pill-btn" onClick={onBack}>← Regresar</button>
                </div>
                <p className="hint">No hay tarjetas en este rango. Elige otro para continuar.</p>
            </main>
        );
    }

    return (
        <main className="view">
            <div className="progress-top study-controls">
                <div className="study-range-group">
                    {isNumbersModule(moduleData) && <NumberRangeFilter value={range} onChange={changeRange} />}
                    <span className="progress-count">{currentIndex + 1} / {totalCards}</span>
                </div>
                <button className="pill-btn" onClick={onBack}>← Regresar</button>
            </div>

            <div className="progress-track-wrap">
                <input
                    type="range"
                    className="progress-track"
                    min="0"
                    max={totalCards - 1}
                    value={currentIndex}
                    onChange={(e) => changeCard(Number(e.target.value))}
                    style={{ '--fill': `${progressPct}%` }}
                />
            </div>
            <p className="progress-percent">{progressPct}% completado</p>

            <div className="hero" style={{ padding: '0 0 15px 0' }}>
                <div className="hero-text">
                    <p className="hero-kicker">NIVEL {moduleData.level || 'A1'}</p>
                    <h2 className="hero-title" style={{ fontSize: '2.2rem' }}><span>{moduleData.module?.toUpperCase()}</span></h2>
                    <p className="hero-sub">Tarjeta {currentIndex + 1} / {totalCards}</p>
                </div>
            </div>

            <div className="flashcard-container" onClick={handleFlip}>
                {/* El atributo key destruye y recrea el DOM al cambiar de tarjeta, evitando la animación de regreso */}
                <div key={currentCard.id} className={`flashcard-inner ${isFlipped ? 'is-flipped' : ''}`}>

                    {/* Frente (Español) */}
                    <div className="flashcard-front card">
                        {currentCard.image_url && (
                            <img
                                key={`img-${currentCard.id}`}
                                src={currentCard.image_url}
                                alt={currentCard.es}
                                onError={(e) => e.target.style.display = 'none'}
                                style={{ maxHeight: '140px', borderRadius: '12px', marginBottom: '15px', objectFit: 'cover', width: '100%' }}
                            />
                        )}
                        {currentCard.hex && !currentCard.image_url && (
                            <div style={{ height: '140px', width: '100%', borderRadius: '12px', marginBottom: '15px', border: '2px solid var(--border)', backgroundColor: currentCard.hex }}></div>
                        )}
                        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text)' }}>{currentCard.es}</h2>
                        <p className="hint">Toca para voltear</p>
                    </div>

                    {/* Reverso (Idioma Objetivo) */}
                    <div className="flashcard-back card">
                        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)' }}>{currentCard.translations[targetLang]}</h2>
                        <div style={{ marginTop: '30px', width: '100%' }}>
                            <button className="primary-btn" onClick={(e) => { e.stopPropagation(); playAudio(); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '1.2rem' }}>▶</span> Escuchar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
                <button
                    className="secondary-btn"
                    style={{ height: '60px' }}
                    onClick={() => changeCard(Math.max(0, currentIndex - 1))}
                    disabled={currentIndex === 0}
                >
                    ⏮ Anterior
                </button>
                <button
                    className="secondary-btn"
                    style={{ height: '60px' }}
                    onClick={() => changeCard(Math.min(totalCards - 1, currentIndex + 1))}
                    disabled={currentIndex === totalCards - 1}
                >
                    Siguiente ⏭
                </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 700, marginBottom: '8px' }}>Velocidad de reproducción</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    {[0.3, 0.6, 1.0].map(speed => (
                        <button
                            key={speed}
                            className={`pill-btn speed-btn ${speechRate === speed ? 'active' : ''}`}
                            onClick={() => setSpeechRate(speed)}
                        >
                            {speed}x
                        </button>
                    ))}
                </div>
            </div>
        </main>
    );
}
