import { NUMBER_RANGES } from '../utils/numberRanges';

export default function NumberRangeFilter({ value, onChange }) {
    return (
        <select
            className="pill-btn number-range-filter"
            aria-label="Rango de números"
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            {NUMBER_RANGES.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
            ))}
        </select>
    );
}
