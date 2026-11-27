const PAGE_SIZE = 8;

export function normalizeCardSearch(text) {
    return text.normalize("NFD")
        .replace(/\p{M}/gu, "")
        .toLowerCase()
        .replace(/[’']/g, "")
        .replace(/[^\p{L}\p{N}]+/gu, " ")
        .trim();
}

export function prepareCardSearch(index, modules) {
    return modules.flatMap((module) => {
        const topic = normalizeCardSearch(module.title);
        return (index[module.id] ?? []).map((row) => {
            const [id, spanish, translation, exampleSpanish, exampleTranslation] = row;
            const [es, translated, exampleEs = "", exampleTarget = ""] = row.slice(1).map(normalizeCardSearch);
            return {
                id, module, spanish, translation, exampleSpanish, exampleTranslation,
                topic, main: [es, translated], example: [exampleEs, exampleTarget],
            };
        });
    });
}

export function cardSearchPage({ index, query, page }) {
    const phrase = normalizeCardSearch(query);
    if (phrase.length < 2) return { count: 0, pages: 1, current: 1, rows: [] };
    const terms = [...new Set(phrase.split(" "))];
    const matches = [];

    for (const row of index) {
        const { topic, main, example } = row;
        // A topic can narrow a query (e.g. "coladera baño"), but cannot
        // create a hit by itself. At least one term must match card content.
        const inMain = (term) => main.some((field) => field.includes(term));
        const inExample = (term) => example.some((field) => field.includes(term));
        if (!terms.every((term) => inMain(term) || inExample(term) || topic.includes(term)) ||
            !terms.some((term) => inMain(term) || inExample(term))) continue;

        const mainPhrase = main.some((field) => ` ${field} `.includes(` ${phrase} `));
        const examplePhrase = example.some((field) => ` ${field} `.includes(` ${phrase} `));
        const score = main.includes(phrase) ? 5
            : mainPhrase ? 4
            : terms.every(inMain) ? 3
            : examplePhrase ? 2
            : 1;

        matches.push({
            ...row, score,
            showExample: Boolean(row.exampleSpanish && (examplePhrase ||
                terms.some((term) => !inMain(term) && inExample(term)))),
        });
    }

    matches.sort((a, b) => b.score - a.score);
    const pages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
    const current = Math.min(page, pages);
    return {
        count: matches.length,
        pages,
        current,
        rows: matches.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE),
    };
}
