import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const dataDirectory = new URL("../public/data/", import.meta.url);
const counts = {};

for (const file of readdirSync(dataDirectory)) {
    if (!file.endsWith(".json")) continue;

    const data = JSON.parse(
        readFileSync(new URL(file, dataDirectory), "utf8")
    );

    if (!Array.isArray(data.cards)) {
        throw new Error(`${file}: falta el array cards.`);
    }

    counts[file] = data.cards.length;
}

writeFileSync(
    new URL("../src/data/cardCounts.json", import.meta.url),
    JSON.stringify(counts, null, 2) + "\n",
    "utf8"
);