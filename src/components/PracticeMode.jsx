import { useState, useEffect, useCallback } from 'react';
import NumberRangeFilter from './NumberRangeFilter';
import { filterCardsByNumberRange, isNumbersModule } from '../utils/numberRanges';

const ttsVoices = {
    en: 'en-US',
    fr: 'fr-FR',
    it: 'it-IT',
    pt: 'pt-BR',
};

function createPracticeRound(pool) {
    const round = {
        currentCorrectCard: null,
        options: [],
        hasAnswered: false,
        wrongGuesses: [],
        isHintActive: false,
        errorMsg: '',
    };
    if (pool.length < 6) {
        return { ...round, errorMsg: 'Se necesitan al menos 6 tarjetas en este rango para las 6 opciones.' };
    }

    const currentCorrectCard = pool[Math.floor(Math.random() * pool.length)];
    const distractors = pool
        .filter(card => card.id !== currentCorrectCard.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
    return {
        ...round,
        currentCorrectCard,
        options: [...distractors, currentCorrectCard].sort(() => Math.random() - 0.5),
    };
}

export default function PracticeMode({ moduleData, targetLang, onBack }) {
    const [score, setScore] = useState(0);
    const [range, setRange] = useState('all');
    const [round, setRound] = useState(() => createPracticeRound(filterCardsByNumberRange(moduleData, 'all')));
    const [speechRate, setSpeechRate] = useState(1.0);
    const { currentCorrectCard, options, hasAnswered, wrongGuesses, isHintActive, errorMsg } = round;

    const playAudio = useCallback((card = currentCorrectCard) => {
        if (!card) return;
        window.speechSynthesis.cancel();
        const text = card.translations[targetLang];
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = ttsVoices[targetLang] || 'en-US';
        utterance.rate = speechRate;
        window.speechSynthesis.speak(utterance);
    }, [currentCorrectCard, targetLang, speechRate]);

    const nextPracticeRound = () => {
        setRound(createPracticeRound(filterCardsByNumberRange(moduleData, range)));
    };

    const changeRange = newRange => {
        window.speechSynthesis.cancel();
        setRange(newRange);
        setRound(createPracticeRound(filterCardsByNumberRange(moduleData, newRange)));
    };

    // Reproducir audio automáticamente cuando cambia la tarjeta correcta
    useEffect(() => {
        if (currentCorrectCard) {
            // Pequeño retraso para que la voz no se corte si el renderizado es muy rápido
            const timer = setTimeout(() => playAudio(currentCorrectCard), 150);
            return () => clearTimeout(timer);
        }
    }, [currentCorrectCard, playAudio]);

    const handleBubbleClick = (card) => {
        if (hasAnswered) return;

        playAudio(); // Reproducir audio automáticamente al tocar cualquier burbuja

        if (card.id === currentCorrectCard.id) {
            setRound(previous => ({ ...previous, hasAnswered: true }));
            setScore(prev => prev + 1);
        } else {
            setRound(previous => ({ ...previous, wrongGuesses: [...previous.wrongGuesses, card.id] }));
        }
    };

    if (!moduleData) return null;

    return (
        <main className="view">
            {/* Controles superiores */}
            <div className="progress-top" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>

                {/* Selector de rango (Solo se muestra en el módulo de números) */}
                <div style={{ display: 'flex', gap: '8px' }}>
                    {isNumbersModule(moduleData) && <NumberRangeFilter value={range} onChange={changeRange} />}
                </div>

                <button className="pill-btn" onClick={onBack}>← Regresar</button>
            </div>

            <div className="hero" style={{ padding: '10px 0 15px 0' }}>
                <div className="hero-text">
                    <p className="hero-kicker">ENTRENAMIENTO AUDITIVO</p>
                    <h2 className="hero-title" style={{ fontSize: '2rem' }}>¿Qué número <span>escuchaste?</span></h2>
                    <p className="hero-sub" style={{ fontWeight: 700, color: 'var(--primary)' }}>Aciertos: {score}</p>
                </div>
            </div>

            {/* Reproductor y Texto Revelado */}
            <div className="card" style={{ padding: '25px', textAlign: 'center', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <button
                    className="primary-btn"
                    onClick={() => playAudio()}
                    style={{ width: '65px', height: '65px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', padding: 0, boxShadow: 'var(--shadow-md)' }}
                >
                    🔊
                </button>
                <p className="hint" style={{ margin: 0 }}>Presiona para repetir el audio</p>

                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)', marginTop: '8px', minHeight: '30px', display: hasAnswered ? 'block' : 'none' }}>
                    {currentCorrectCard && `${currentCorrectCard.es} = ${currentCorrectCard.translations[targetLang]}`}
                </div>

                {/* Selector de Velocidad */}
                <div style={{ textAlign: 'center', marginTop: '15px', width: '100%' }}>
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
            </div>

            {/* Cuadrícula de Burbujas */}
            {errorMsg ? (
                <p style={{ textAlign: 'center', color: 'var(--muted)' }}>{errorMsg}</p>
            ) : (
                <div id="bubbles-container">
                    {options.map(card => {
                        const isCorrect = card.id === currentCorrectCard?.id;
                        const isWrong = wrongGuesses.includes(card.id);
                        const isHinted = isHintActive && isCorrect && !hasAnswered;

                        let bubbleClass = "bubble-option";
                        if (hasAnswered && isCorrect) bubbleClass += " correct";
                        if (isWrong) bubbleClass += " incorrect";

                        return (
                            <button
                                key={card.id}
                                className={bubbleClass}
                                onClick={() => handleBubbleClick(card)}
                                disabled={isWrong || hasAnswered}
                                style={isHinted ? { borderColor: 'var(--primary)', background: 'var(--primary-soft)' } : {}}
                            >
                                {card.es}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Controles inferiores */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', marginTop: '20px' }}>
                <button
                    className="ghost-btn"
                    onClick={() => setRound(previous => ({ ...previous, isHintActive: true }))}
                    disabled={hasAnswered || isHintActive}
                    style={{ width: 'auto', padding: '12px 18px', opacity: (hasAnswered || isHintActive) ? 0.5 : 1 }}
                >
                    👁️ Pista
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '60%' }}>
                    <button className="secondary-btn" onClick={nextPracticeRound} style={{ padding: '12px' }}>⏮ Saltar</button>
                    <button className="secondary-btn" onClick={nextPracticeRound} style={{ padding: '12px' }}>Siguiente ⏭</button>
                </div>
            </div>
        </main>
    );
}
