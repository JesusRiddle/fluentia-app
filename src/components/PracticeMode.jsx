
import { useState, useEffect, useCallback } from 'react';
import NumberRangeFilter from './NumberRangeFilter';
import {
    filterCardsByNumberRange,
    isNumbersModule
} from '../utils/numberRanges';

const ttsVoices = {
    en: 'en-US',
    fr: 'fr-FR',
    it: 'it-IT',
    pt: 'pt-BR',
};

// Barajado Fisher-Yates sin modificar el arreglo original.
function shuffle(items) {
    const result = [...items];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

// Generar una secuencia estable de preguntas.
function createPracticeQuestions(moduleData, range) {
    if (!moduleData?.cards) return [];

    const pool = filterCardsByNumberRange(moduleData, range);

    // Evita repetir alternativas dentro de una pregunta.
    const uniqueCards = [
        ...new Map(pool.map(card => [card.id, card])).values()
    ];

    if (uniqueCards.length < 4) return [];

    return shuffle(uniqueCards).map(correctCard => {
        const distractors = shuffle(
            uniqueCards.filter(card => card.id !== correctCard.id)
        ).slice(0, 3);

        return {
            correctCard,
            options: shuffle([correctCard, ...distractors])
        };
    });
}

export default function PracticeMode({
    moduleData,
    targetLang,
    onBack
}) {
    const [range, setRange] = useState('all');
    const [questions, setQuestions] = useState(
        () => createPracticeQuestions(moduleData, 'all')
    );
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [speechRate, setSpeechRate] = useState(1.0);

    const totalCards = questions.length;
    const currentQuestion = questions[currentIndex];
    const currentCorrectCard = currentQuestion?.correctCard;

    const currentAnswer = answers[currentIndex] || {
        hasAnswered: false,
        wrongGuesses: [],
        isHintActive: false
    };

    const {
        hasAnswered,
        wrongGuesses,
        isHintActive
    } = currentAnswer;

    const score = Object.values(answers)
        .filter(answer => answer.hasAnswered).length;

    // Misma fórmula de avance que Flashcards.
    const progressPct = totalCards > 1
        ? Math.round((currentIndex / (totalCards - 1)) * 100)
        : totalCards === 1 ? 100 : 0;

    const playAudio = useCallback((card = currentCorrectCard) => {
        if (!card) return;

        const text = card.translations?.[targetLang];
        if (!text) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = ttsVoices[targetLang] || 'en-US';
        utterance.rate = speechRate;

        window.speechSynthesis.speak(utterance);
    }, [currentCorrectCard, targetLang, speechRate]);

    // Reproduce la pregunta actual automáticamente.
    useEffect(() => {
        if (!currentCorrectCard) return;

        const timer = setTimeout(() => {
            playAudio(currentCorrectCard);
        }, 150);

        return () => {
            clearTimeout(timer);
            window.speechSynthesis.cancel();
        };
    }, [currentCorrectCard, playAudio]);

    // Navegación sin generar preguntas nuevas.
    const changeCard = newIndex => {
        if (newIndex < 0 || newIndex >= totalCards) return;

        window.speechSynthesis.cancel();
        setCurrentIndex(newIndex);
    };

    // Al cambiar el rango, iniciar una práctica nueva.
    const changeRange = newRange => {
        window.speechSynthesis.cancel();

        setRange(newRange);
        setQuestions(createPracticeQuestions(moduleData, newRange));
        setCurrentIndex(0);
        setAnswers({});
    };

    const updateCurrentAnswer = changes => {
        setAnswers(previous => ({
            ...previous,
            [currentIndex]: {
                hasAnswered: false,
                wrongGuesses: [],
                isHintActive: false,
                ...previous[currentIndex],
                ...changes
            }
        }));
    };

    const handleBubbleClick = card => {
        if (!currentCorrectCard || hasAnswered) return;
        if (wrongGuesses.includes(card.id)) return;

        playAudio();

        if (card.id === currentCorrectCard.id) {
            updateCurrentAnswer({ hasAnswered: true });
        } else {
            updateCurrentAnswer({
                wrongGuesses: [...wrongGuesses, card.id]
            });
        }
    };

    if (!moduleData?.cards) return null;

    return (
        <main className="view practice-view">

            {/* Controles superiores */}
            <div className="progress-top study-controls">
                <div className="study-range-group">
                    {isNumbersModule(moduleData) && (
                        <NumberRangeFilter
                            value={range}
                            onChange={changeRange}
                        />
                    )}

                    <span className="progress-count">
                        {totalCards ? currentIndex + 1 : 0} / {totalCards}
                    </span>
                </div>

                <button className="pill-btn" onClick={onBack}>
                    ← Regresar
                </button>
            </div>

            {/* Barra de progreso idéntica a Flashcards */}
            <div className="progress-track-wrap">
                <input
                    type="range"
                    className="progress-track"
                    min="0"
                    max={Math.max(0, totalCards - 1)}
                    value={currentIndex}
                    onChange={e => changeCard(Number(e.target.value))}
                    disabled={totalCards === 0}
                    style={{ '--fill': `${progressPct}%` }}
                    aria-label="Navegar entre preguntas"
                />
            </div>

            <p className="progress-percent">
                {progressPct}% completado
            </p>

            {/* Encabezado del módulo */}
            <div className="hero" style={{ padding: '0 0 15px 0' }}>
                <div className="hero-text">
                    <p className="hero-kicker">
                        NIVEL {moduleData.level || 'A1'} · PRÁCTICA
                    </p>

                    <h2
                        className="hero-title"
                        style={{ fontSize: '2rem' }}
                    >
                        <span>
                            {moduleData.module?.toUpperCase()}
                        </span>
                    </h2>

                    <p className="hero-sub">
                        Pregunta {totalCards ? currentIndex + 1 : 0} / {totalCards}
                    </p>

                    <p className="hint">
                        Aciertos: {score}
                    </p>
                </div>
            </div>

            {totalCards === 0 ? (
                <p className="hint" style={{ textAlign: 'center' }}>
                    Se necesitan al menos 4 tarjetas diferentes
                    para practicar en este rango.
                </p>
            ) : (
                <>
                    {/* Reproductor y respuesta revelada */}
                    <div
                        className="card"
                        style={{
                            padding: '25px',
                            textAlign: 'center',
                            marginBottom: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <button
                            type="button"
                            className="primary-btn"
                            onClick={() => playAudio()}
                            aria-label="Repetir pronunciación"
                            style={{
                                width: '65px',
                                height: '65px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.6rem',
                                padding: 0,
                                boxShadow: 'var(--shadow-md)'
                            }}
                        >
                            🔊
                        </button>

                        <p className="hint" style={{ margin: 0 }}>
                            Presiona para repetir el audio
                        </p>

                        <div
                            style={{
                                fontSize: '1.3rem',
                                fontWeight: 800,
                                color: 'var(--primary)',
                                marginTop: '8px',
                                minHeight: '30px',
                                display: hasAnswered ? 'block' : 'none'
                            }}
                        >
                            {currentCorrectCard?.es} ={' '}
                            {currentCorrectCard?.translations?.[targetLang]}
                        </div>

                        {/* Control de velocidad */}
                        <div
                            style={{
                                textAlign: 'center',
                                marginTop: '15px',
                                width: '100%'
                            }}
                        >
                            <p style={{
                                fontSize: '0.8rem',
                                color: 'var(--muted)',
                                fontWeight: 700,
                                marginBottom: '8px'
                            }}>
                                Velocidad de reproducción
                            </p>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '8px'
                            }}>
                                {[0.3, 0.6, 1.0].map(speed => (
                                    <button
                                        key={speed}
                                        type="button"
                                        className={`pill-btn speed-btn ${speechRate === speed ? 'active' : ''
                                            }`}
                                        aria-pressed={speechRate === speed}
                                        onClick={() => setSpeechRate(speed)}
                                    >
                                        {speed}x
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cuatro respuestas posibles */}
                    <div id="bubbles-container">
                        {currentQuestion.options.map(card => {
                            const isCorrect =
                                card.id === currentCorrectCard.id;

                            const isWrong =
                                wrongGuesses.includes(card.id);

                            const isHinted =
                                isHintActive && isCorrect && !hasAnswered;

                            let bubbleClass = 'bubble-option';

                            if (hasAnswered && isCorrect) {
                                bubbleClass += ' correct';
                            }

                            if (isWrong) {
                                bubbleClass += ' incorrect';
                            }

                            return (
                                <button
                                    key={card.id}
                                    type="button"
                                    className={bubbleClass}
                                    onClick={() => handleBubbleClick(card)}
                                    disabled={isWrong || hasAnswered}
                                    style={isHinted ? {
                                        borderColor: 'var(--primary)',
                                        background: 'var(--primary-soft)'
                                    } : {}}
                                >
                                    {card.es}
                                </button>
                            );
                        })}
                    </div>

                    {/* Barra inferior fija de práctica */}
                    <div className="practice-bottom-bar">
                        <div className="practice-bottom-actions">
                            <button
                                type="button"
                                className="ghost-btn"
                                onClick={() => updateCurrentAnswer({
                                    isHintActive: true
                                })}
                                disabled={hasAnswered || isHintActive}
                            >
                                👁️ Pista
                            </button>

                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={() => changeCard(currentIndex - 1)}
                                disabled={currentIndex === 0}
                            >
                                ⏮ Anterior
                            </button>

                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={() => changeCard(currentIndex + 1)}
                                disabled={currentIndex === totalCards - 1}
                            >
                                Siguiente ⏭
                            </button>
                        </div>
                    </div>



                </>
            )}
        </main>
    );
}
