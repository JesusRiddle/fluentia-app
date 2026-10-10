export const NUMBER_RANGES = [
    { value: 'all', label: '🌐 Todos' },
    { value: '0-10', label: '0 al 10', min: 0, max: 10 },
    { value: '11-20', label: '11 al 20', min: 11, max: 20 },
    { value: '21-99', label: 'Decenas (21–99)', min: 21, max: 99 },
    { value: '100-2000', label: 'Centenas y miles (100–2000)', min: 100, max: 2000 },
];

export function isNumbersModule(moduleData) {
    return Boolean(moduleData?.module
        ?.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes('numero'));
}

export function filterCardsByNumberRange(moduleData, range) {
    const cards = moduleData?.cards || [];
    const selectedRange = NUMBER_RANGES.find(option => option.value === range);

    if (!isNumbersModule(moduleData) || !selectedRange || range === 'all') return cards;

    return cards.filter(card => {
        const match = String(card.id).match(/^n(-?\d+)$/);
        if (!match) return false;

        const value = Number(match[1]);
        return value >= selectedRange.min && value <= selectedRange.max;
    });
}
