// Prepare spoken alternatives without changing the text shown on cards.
// Only spaced slashes separate complete alternatives; compact forms such as
// "rosso/a", dates and fractions remain untouched.
export function prepareSpeechText(text) {
    return text.replace(/\s+\/\s+/g, '; ');
}
