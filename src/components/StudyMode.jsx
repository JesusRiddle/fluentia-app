import { useEffect, useRef, useState } from 'react';
import NumberRangeFilter from './NumberRangeFilter';
import { filterCardsByNumberRange, isNumbersModule } from '../utils/numberRanges';

const STORAGE_KEY = 'fluentia:review-cards:v1';

function loadReviews() {
    try {
        const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch {
        return {};
    }
}

export default function StudyMode({ moduleData, targetLang, onBack, autoPlay }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [speechRate, setSpeechRate] = useState(1.0);
    const [range, setRange] = useState('all');
    const [reviewOnly, setReviewOnly] = useState(false);
    const [reviews, setReviews] = useState(loadReviews);
    const originalIndexRef = useRef(0);
    const audioTimeoutRef = useRef(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const speechIdRef = useRef(0);


    useEffect(() => () => {
        window.clearTimeout(audioTimeoutRef.current);
        window.speechSynthesis.cancel();
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
        } catch {
            // Private browsing or a full storage quota should not break study mode.
        }
    }, [reviews]);

    if (!moduleData || !moduleData.cards) return null;

    const moduleKey = JSON.stringify([
        moduleData.level || 'A1',
        moduleData.module || '',
        targetLang
    ]);
    const markedIds = reviews[moduleKey] || [];
    const markedSet = new Set(markedIds.map(String));
    const allCards = filterCardsByNumberRange(moduleData, range);
    const cards = reviewOnly
        ? allCards.filter(card => markedSet.has(String(card.id)))
        : allCards;
    const totalCards = cards.length;
    const currentCard = cards[currentIndex];
    const progressPct = totalCards > 1
        ? Math.round((currentIndex / (totalCards - 1)) * 100)
        : totalCards === 1 ? 100 : 0;
    const isMarked = currentCard ? markedSet.has(String(currentCard.id)) : false;
    const markedInRange = allCards.filter(card => markedSet.has(String(card.id))).length;


    const cancelAudio = () => {
        speechIdRef.current += 1;
        window.clearTimeout(audioTimeoutRef.current);
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    };


    const changeRange = newRange => {
        cancelAudio();
        setIsFlipped(false);
        setCurrentIndex(0);
        originalIndexRef.current = 0;
        setReviewOnly(false);
        setRange(newRange);
    };

    const toggleReviewOnly = () => {
        cancelAudio();
        setIsFlipped(false);
        if (reviewOnly) {
            setReviewOnly(false);
            setCurrentIndex(Math.min(originalIndexRef.current, Math.max(0, allCards.length - 1)));
        } else {
            originalIndexRef.current = currentIndex;
            const markedIndex = allCards
                .filter(card => markedSet.has(String(card.id)))
                .findIndex(card => card.id === currentCard?.id);
            setCurrentIndex(Math.max(0, markedIndex));
            setReviewOnly(true);
        }
    };

    const toggleCurrentMark = event => {
        event.stopPropagation();
        if (!currentCard) return;
        const id = String(currentCard.id);
        const nextMarked = isMarked
            ? markedIds.filter(existingId => String(existingId) !== id)
            : [...markedIds, id];
        setReviews(previous => ({ ...previous, [moduleKey]: nextMarked }));

        if (reviewOnly && isMarked) {
            cancelAudio();
            setIsFlipped(false);
            if (cards.length === 1) {
                setReviewOnly(false);
                setCurrentIndex(Math.min(originalIndexRef.current, Math.max(0, allCards.length - 1)));
            } else {
                setCurrentIndex(Math.min(currentIndex, cards.length - 2));
            }
        }
    };

    const ttsVoices = {
        en: 'en-US', fr: 'fr-FR', it: 'it-IT', pt: 'pt-BR'
    };

    const playAudio = () => {
        if (!currentCard) return;

        const text = currentCard.translations?.[targetLang];
        if (!text) return;

        cancelAudio();
        const speechId = speechIdRef.current;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = ttsVoices[targetLang] || 'en-US';
        utterance.rate = speechRate;

        utterance.onstart = () => {
            if (speechId === speechIdRef.current) {
                setIsSpeaking(true);
                setIsPaused(false);
            }
        };

        utterance.onpause = () => {
            if (speechId === speechIdRef.current) {
                setIsPaused(true);
            }
        };

        utterance.onresume = () => {
            if (speechId === speechIdRef.current) {
                setIsPaused(false);
            }
        };

        const finish = () => {
            if (speechId === speechIdRef.current) {
                setIsSpeaking(false);
                setIsPaused(false);
            }
        };

        utterance.onend = finish;
        utterance.onerror = finish;

        window.speechSynthesis.speak(utterance);
    };

    const toggleAudio = () => {
        if (!isSpeaking) {
            playAudio();
        } else if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
        } else {
            window.speechSynthesis.pause();
            setIsPaused(true);
        }
    };

    const handleFlip = () => {
        const next = !isFlipped;
        cancelAudio();
        setIsFlipped(next);
        if (next && autoPlay) {
            audioTimeoutRef.current = window.setTimeout(playAudio, 150);
        }
    };
    const changeCard = newIndex => {
        if (newIndex < 0 || newIndex >= totalCards) return;
        cancelAudio();
        setIsFlipped(false);
        setCurrentIndex(newIndex);
    };

    return (
        <main className="view">
            <div className="progress-top study-controls">
                <div className="study-range-group">
                    {isNumbersModule(moduleData) && <NumberRangeFilter value={range} onChange={changeRange} />}
                    <span className="progress-count">{totalCards ? currentIndex + 1 : 0} / {totalCards}</span>
                </div>
                <button className="pill-btn" onClick={onBack}>← Regresar</button>
            </div>

            <div className="progress-track-wrap">
                <input
                    type="range"
                    className="progress-track"
                    min="0"
                    max={Math.max(0, totalCards - 1)}
                    value={Math.min(currentIndex, Math.max(0, totalCards - 1))}
                    onChange={event => changeCard(Number(event.target.value))}
                    disabled={totalCards <= 1}
                    style={{ '--fill': `${progressPct}%` }}
                    aria-label="Navegar entre tarjetas"
                />
            </div>
            <p className="progress-percent">{progressPct}% completado</p>

            <div className="hero" style={{ padding: '0 0 15px 0' }}>
                <div className="hero-text">
                    <p className="hero-kicker">NIVEL {moduleData.level || 'A1'}</p>
                    <h2 className="hero-title" style={{ fontSize: '2.2rem' }}>
                        <span>{moduleData.module?.toUpperCase()}</span>
                    </h2>
                    <p className="hero-sub">
                        {reviewOnly ? 'Para repasar · ' : 'Tarjeta '}
                        {totalCards ? currentIndex + 1 : 0} / {totalCards}
                    </p>
                </div>
            </div>

            <div className="review-toolbar">
                <span className="review-counter">★ {markedInRange} para repasar</span>
                <label className="review-filter">
                    <input
                        type="checkbox"
                        checked={reviewOnly}
                        onChange={toggleReviewOnly}
                    />
                    <span>Solo para repasar</span>
                </label>
            </div>

            {!currentCard ? (
                <div className="review-empty card">
                    <p>{reviewOnly
                        ? 'Todavía no tienes tarjetas marcadas en este módulo o rango.'
                        : 'No hay tarjetas en este rango. Elige otro para continuar.'}</p>
                    {reviewOnly && (
                        <button className="pill-btn" onClick={toggleReviewOnly}>
                            Mostrar todas las tarjetas
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <div className="review-card-shell">
                        <div className="flashcard-container" onClick={handleFlip}>
                            <div key={currentCard.id} className={`flashcard-inner ${isFlipped ? 'is-flipped' : ''}`}>
                                <div className="flashcard-front card">
                                    {currentCard.image_url && (
                                        <img
                                            key={`img-${currentCard.id}`}
                                            src={currentCard.image_url}
                                            alt={currentCard.es}
                                            onError={event => { event.currentTarget.style.display = 'none'; }}
                                            style={{ maxHeight: '140px', borderRadius: '12px', marginBottom: '15px', objectFit: 'cover', width: '100%' }}
                                        />
                                    )}
                                    {currentCard.hex && !currentCard.image_url && (
                                        <div style={{ height: '140px', width: '100%', borderRadius: '12px', marginBottom: '15px', border: '2px solid var(--border)', backgroundColor: currentCard.hex }} />
                                    )}
                                    <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text)' }}>{currentCard.es}</h2>

                                    {currentCard.notes?.es && (
                                        <p className="flashcard-note">
                                            {currentCard.notes.es}
                                        </p>
                                    )}
                                    <p className="hint flip-hint">Toca para voltear</p>
                                </div>

                                <div className="flashcard-back card">

                                    <div className="flashcard-back-content">
                                        <h2
                                            style={{
                                                fontSize: '2.2rem',
                                                fontWeight: 800,
                                                color: 'var(--primary)'
                                            }}
                                        >
                                            {currentCard.translations?.[targetLang]}
                                        </h2>

                                        {currentCard.notes?.[targetLang] && (
                                            <p className="flashcard-note">
                                                {currentCard.notes[targetLang]}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flashcard-audio-footer">
                                        <button
                                            type="button"
                                            className="flashcard-audio-btn"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                toggleAudio();
                                            }}
                                            aria-label={
                                                !isSpeaking
                                                    ? 'Escuchar pronunciación'
                                                    : isPaused
                                                        ? 'Reanudar audio'
                                                        : 'Pausar audio'
                                            }
                                            title={
                                                !isSpeaking
                                                    ? 'Escuchar'
                                                    : isPaused
                                                        ? 'Reanudar'
                                                        : 'Pausar'
                                            }
                                        >
                                            <span aria-hidden="true">
                                                {!isSpeaking ? '🔊' : isPaused ? '▶' : '⏸'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className={`review-star ${isMarked ? 'is-marked' : ''}`}
                            onClick={toggleCurrentMark}
                            aria-pressed={isMarked}
                            aria-label={isMarked ? 'Quitar de para repasar' : 'Marcar para repasar'}
                            title={isMarked ? 'Quitar de para repasar' : 'Marcar para repasar'}
                        >
                            {isMarked ? '★' : '☆'}
                        </button>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 700, margin: '0 0 8px' }}>
                            Velocidad de reproducción
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                            {[0.3, 0.6, 1.0].map(speed => (
                                <button
                                    key={speed}
                                    type="button"
                                    className={`pill-btn speed-btn ${speechRate === speed ? 'active' : ''}`}
                                    aria-pressed={speechRate === speed}
                                    onClick={() => setSpeechRate(speed)}
                                >
                                    {speed}x
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
                        <button
                            type="button"
                            className="secondary-btn"
                            style={{ height: '44px' }}
                            onClick={() => changeCard(currentIndex - 1)}
                            disabled={currentIndex === 0}
                        >
                            ⏮ Anterior
                        </button>
                        <button
                            type="button"
                            className="secondary-btn"
                            style={{ height: '44px' }}
                            onClick={() => changeCard(currentIndex + 1)}
                            disabled={currentIndex === totalCards - 1}
                        >
                            Siguiente ⏭
                        </button>
                    </div>
                </>
            )}
        </main>
    );
}
