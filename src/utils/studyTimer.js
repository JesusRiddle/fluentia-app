export const TIMER_INCREMENT_MS = 10 * 60 * 1000;
export const ALARM_DURATION_MS = 2700;
export const VIBRATION_PATTERN = [650, 250, 650, 250, 650];

export function remainingSeconds(deadline, now = Date.now()) {
    return Math.max(0, Math.ceil((deadline - now) / 1000));
}

export function formatCountdown(seconds) {
    const minutes = Math.floor(seconds / 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

// Three short, square-wave buzzes; no sound file or network request is needed.
export function playKitchenAlarm(context) {
    const oscillators = [];
    const gains = [];
    const start = context.currentTime + 0.02;

    for (let pulse = 0; pulse < 3; pulse += 1) {
        const from = start + pulse * 0.9;
        const until = from + 0.65;
        const gain = context.createGain();
        gain.gain.setValueAtTime(0, from);
        gain.gain.linearRampToValueAtTime(0.045, from + 0.015);
        gain.gain.setValueAtTime(0.045, until - 0.035);
        gain.gain.linearRampToValueAtTime(0, until);
        gain.connect(context.destination);
        gains.push(gain);

        [880, 1320].forEach((frequency, index) => {
            const oscillator = context.createOscillator();
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(frequency, from);
            oscillator.connect(gain);
            oscillator.onended = () => {
                oscillator.disconnect();
                if (index === 1) gain.disconnect();
            };
            oscillator.start(from);
            oscillator.stop(until);
            oscillators.push(oscillator);
        });
    }

    return () => {
        oscillators.forEach(oscillator => {
            oscillator.onended = null;
            oscillator.stop();
            oscillator.disconnect();
        });
        gains.forEach(gain => gain.disconnect());
    };
}
