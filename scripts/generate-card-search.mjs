import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { MODULES } from "../src/data/modules.js";

const output = new URL("../src/data/card-search/", import.meta.url);
const data = new URL("../public/data/", import.meta.url);
const languages = ["en", "fr", "it", "pt", "de"];

mkdirSync(output, { recursive: true });
const decks = MODULES.filter((module) => module.available).map((module) => ({
    id: module.id,
    cards: JSON.parse(readFileSync(new URL(module.file, data), "utf8")).cards,
}));

for (const language of languages) {
    const index = Object.fromEntries(decks
        .filter(({ cards }) => cards[0]?.translations?.[language]?.trim())
        .map(({ id, cards }) => [id, cards
            .filter((card) => card.translations?.[language]?.trim())
            .map((card) => {
                const row = [card.id, card.es, card.translations[language]];
                const example = card.examples?.[language];
                if (example?.text?.trim() && example?.es?.trim()) {
                    row.push(example.es, example.text);
                }
                return row;
            })]));
    writeFileSync(new URL(`${language}.json`, output), JSON.stringify(index) + "\n");
}
