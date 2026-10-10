import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
    ALARM_DURATION_MS,
    TIMER_INCREMENT_MS,
    VIBRATION_PATTERN,
    formatCountdown,
    playKitchenAlarm,
    remainingSeconds,
} from '../utils/studyTimer';

const LONG_PRESS_MS = 750;

function vibrate(pattern) {
    if (typeof navigator.vibrate === 'function') navigator.vibrate(pattern);
}

export default function StudyTimer() {
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [isRinging, setIsRinging] = useState(false);
    const [showStopConfirm, setShowStopConfirm] = useState(false);
    const deadlineRef = useRef(0);
    const holdRef = useRef(null);
    const pressOriginRef = useRef(null);
    const suppressClickRef = useRef(false);
    const alarmTimeoutRef = useRef(null);
    const alarmSequenceRef = useRef(0);
    const audioRef = useRef(null);
    const stopBuzzerRef = useRef(() => {});
    const dialogRef = useRef(null);
    const helpId = useId();
    const dialogTitleId = useId();

    const stopAlarm = useCallback(() => {
        alarmSequenceRef.current += 1;
        window.clearTimeout(alarmTimeoutRef.current);
        stopBuzzerRef.current();
        stopBuzzerRef.current = () => {};
        vibrate(0);
        setIsRinging(false);
    }, []);

    const ringAlarm = useCallback(() => {
        const sequence = ++alarmSequenceRef.current;
        setShowStopConfirm(false);
        setIsRinging(true);
        vibrate(VIBRATION_PATTERN);

        const context = audioRef.current;
        const play = () => {
            // A delayed resume must not play after the alarm is stopped or restarted.
            if (sequence === alarmSequenceRef.current) {
                stopBuzzerRef.current = playKitchenAlarm(context);
            }
        };
        if (context && context.state !== 'closed') {
            if (context.state === 'running') play();
            else context.resume().then(play).catch(() => {});
        }

        alarmTimeoutRef.current = window.setTimeout(stopAlarm, ALARM_DURATION_MS);
    }, [stopAlarm]);

    useEffect(() => {
        if (!isRunning) return;

        const tick = () => {
            if (!deadlineRef.current) return;
            const remaining = remainingSeconds(deadlineRef.current);
            setSeconds(remaining);

            if (remaining === 0) {
                deadlineRef.current = 0;
                setIsRunning(false);
                ringAlarm();
            }
        };

        // Use a deadline instead of subtracting ticks: background throttling must
        // not extend the countdown. Recheck immediately when the page returns.
        const interval = window.setInterval(tick, 250);
        document.addEventListener('visibilitychange', tick);
        window.addEventListener('focus', tick);
        return () => {
            window.clearInterval(interval);
            document.removeEventListener('visibilitychange', tick);
            window.removeEventListener('focus', tick);
        };
    }, [isRunning, ringAlarm]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (showStopConfirm && !dialog.open) dialog.showModal();
        else if (!showStopConfirm && dialog.open) dialog.close();
    }, [showStopConfirm]);

    useEffect(() => () => {
        alarmSequenceRef.current += 1;
        window.clearTimeout(holdRef.current);
        window.clearTimeout(alarmTimeoutRef.current);
        stopBuzzerRef.current();
        vibrate(0);
        audioRef.current?.close().catch(() => {});
    }, []);

    const prepareAudio = () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        try {
            // Unlock audio on the user's tap, rather than waiting for expiry.
            if (!audioRef.current || audioRef.current.state === 'closed') {
                audioRef.current = new AudioContext();
            }
            if (audioRef.current.state !== 'running') {
                audioRef.current.resume().catch(() => {});
            }
        } catch {
            // Countdown, vibration and the visual alert still work without audio.
        }
    };

    const addTenMinutes = () => {
        if (suppressClickRef.current) {
            suppressClickRef.current = false;
            return;
        }

        stopAlarm();
        prepareAudio();
        const now = Date.now();
        deadlineRef.current = Math.max(now, deadlineRef.current) + TIMER_INCREMENT_MS;
        setSeconds(remainingSeconds(deadlineRef.current, now));
        setIsRunning(true);
    };

    const clearHold = () => window.clearTimeout(holdRef.current);

    const requestStop = () => {
        clearHold();
        suppressClickRef.current = true;
        if (deadlineRef.current > Date.now()) setShowStopConfirm(true);
    };

    const beginPress = event => {
        if (!event.isPrimary || event.button !== 0) return;
        clearHold();
        suppressClickRef.current = false;
        pressOriginRef.current = { x: event.clientX, y: event.clientY };
        event.currentTarget.setPointerCapture(event.pointerId);
        if (deadlineRef.current > Date.now()) {
            holdRef.current = window.setTimeout(requestStop, LONG_PRESS_MS);
        }
    };

    const movePress = event => {
        const origin = pressOriginRef.current;
        if (origin && Math.hypot(event.clientX - origin.x, event.clientY - origin.y) > 10) {
            clearHold();
            suppressClickRef.current = true;
        }
    };

    const endPress = () => {
        clearHold();
        pressOriginRef.current = null;
    };

    const deactivate = () => {
        deadlineRef.current = 0;
        setIsRunning(false);
        setSeconds(0);
        setShowStopConfirm(false);
        stopAlarm();
    };

    return (
        <div className="study-timer">
            <button
                type="button"
                className={`icon-btn study-timer-btn${isRunning ? ' is-running' : ''}${isRinging ? ' is-ringing' : ''}`}
                title={isRunning ? 'Añadir 10 minutos · Mantén pulsado para desactivar' : 'Iniciar temporizador de 10 minutos'}
                aria-label={`Añadir 10 minutos al temporizador${isRunning ? `. Tiempo restante: ${formatCountdown(seconds)}` : ''}`}
                aria-describedby={helpId}
                onClick={addTenMinutes}
                onPointerDown={beginPress}
                onPointerMove={movePress}
                onPointerUp={endPress}
                onLostPointerCapture={endPress}
                onPointerCancel={() => { endPress(); suppressClickRef.current = true; }}
                onContextMenu={event => { event.preventDefault(); requestStop(); }}
                onKeyDown={event => {
                    if (event.key === 'Delete' || event.key === 'Backspace') {
                        event.preventDefault();
                        requestStop();
                    } else if (event.key === 'Enter' || event.key === ' ') {
                        if (event.repeat) event.preventDefault();
                        else suppressClickRef.current = false;
                    }
                }}
            >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 2h6M12 2v3M18.5 6.5l1.5-1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="14" r="8" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 10v4l2.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {(isRunning || isRinging) && <span className="study-timer-value" aria-hidden="true">{formatCountdown(seconds)}</span>}
            </button>
            <span className="sr-only" id={helpId}>Pulsa para añadir 10 minutos. Mantén pulsado o usa la tecla Supr para desactivar.</span>
            {isRinging && <div className="study-timer-notice" role="status">¡Tiempo de estudio cumplido!</div>}

            <dialog
                className="timer-dialog"
                ref={dialogRef}
                aria-labelledby={dialogTitleId}
                onCancel={() => setShowStopConfirm(false)}
            >
                <h2 id={dialogTitleId}>¿Deseas desactivar el temporizador?</h2>
                <p>El tiempo restante se descartará.</p>
                <div className="timer-dialog-actions">
                    <button type="button" className="secondary-btn" onClick={() => setShowStopConfirm(false)} autoFocus>No</button>
                    <button type="button" className="primary-btn" onClick={deactivate}>Sí</button>
                </div>
            </dialog>
        </div>
    );
}
