import { useEffect, useMemo, useState } from "react";
import { MODULES } from "../data/modules";
import { cardSearchPage, normalizeCardSearch, prepareCardSearch } from "../utils/cardSearch";

const urls = import.meta.glob("../data/card-search/*.json", {
    eager: true,
    import: "default",
    query: "?url&no-inline",
});
const indexes = new Map();
const availableModules = MODULES.filter((module) => module.available);

function loadIndex(language) {
    if (!indexes.has(language)) {
        const url = urls[`../data/card-search/${language}.json`];
        const request = (url ? fetch(url) : Promise.reject(new Error("Índice no disponible")))
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then((index) => prepareCardSearch(index, availableModules))
            .catch((error) => {
                indexes.delete(language);
                throw error;
            });
        indexes.set(language, request);
    }
    return indexes.get(language);
}

export default function CardSearch({ targetLang, query, page, onQuery, onPage, onSelectModule }) {
    const [loaded, setLoaded] = useState(null);
    const [attempt, setAttempt] = useState(0);
    const [opening, setOpening] = useState(null);
    const [openError, setOpenError] = useState("");
    const readyToSearch = normalizeCardSearch(query).length >= 2;
    const status = loaded?.language === targetLang && loaded?.attempt === attempt ? loaded : null;
    const index = status?.index;

    useEffect(() => {
        if (!readyToSearch) return;
        let ignore = false;
        loadIndex(targetLang).then(
            (index) => { if (!ignore) setLoaded({ language: targetLang, attempt, index }); },
            () => { if (!ignore) setLoaded({ language: targetLang, attempt, error: true }); },
        );
        return () => { ignore = true; };
    }, [targetLang, readyToSearch, attempt]);

    const results = useMemo(
        () => index && cardSearchPage({ index, query, page }),
        [index, query, page],
    );

    function changeQuery(value) {
        setOpenError("");
        onQuery(value);
    }

    async function openCard(result) {
        setOpening(result);
        setOpenError("");
        try {
            await onSelectModule(result.module, "study", result.id);
        } catch {
            setOpenError("No se pudo abrir la tarjeta. Vuelve a intentarlo.");
        } finally {
            setOpening(null);
        }
    }

    return (
        <section aria-labelledby="home-card-search-label">
            <div className="home-search">
                <label id="home-card-search-label" htmlFor="home-card-search">Buscar palabras y frases</label>
                <div className="home-search-row">
                    <input
                        id="home-card-search"
                        type="search"
                        value={query}
                        maxLength={160}
                        placeholder="Coladera, coladera baño…"
                        aria-describedby="home-card-search-hint"
                        onChange={(event) => changeQuery(event.target.value)}
                    />
                    {query && (
                        <button className="secondary-btn home-card-search-clear" type="button" onClick={() => changeQuery("")}>
                            Limpiar
                        </button>
                    )}
                </div>
                <p id="home-card-search-hint" className="home-muted">
                    Busca en todos los mazos, en español o en el idioma que seleccionaste. No necesitas escribir tildes.
                </p>
            </div>
            {!readyToSearch && query.trim() && (
                <p className="home-muted">Escribe al menos dos caracteres para buscar.</p>
            )}
            {openError && <p role="alert" className="home-empty">{openError}</p>}
            {readyToSearch && status?.error && (
                <div className="home-empty">
                    <p role="alert">No se pudo cargar la búsqueda.</p>
                    <button className="secondary-btn" type="button" onClick={() => setAttempt(attempt + 1)}>
                        Reintentar
                    </button>
                </div>
            )}
            {readyToSearch && !status && <p role="status" className="home-muted">Cargando búsqueda…</p>}
            {readyToSearch && results && (
                <>
                    <p role="status" className="home-muted">
                        {results.count === 0 ? "No encontramos tarjetas. Prueba con menos palabras o con otro término."
                            : `${results.count} ${results.count === 1 ? "tarjeta encontrada" : "tarjetas encontradas"}`}
                    </p>
                    <div className="home-topics">
                        {results.rows.map((result) => (
                            <article key={JSON.stringify([result.module.id, result.id])} className="home-topic">
                                <div className="home-topic-copy">
                                    <p className="home-topic-meta">{result.module.level} · {result.module.title}</p>
                                    <h4>{result.spanish}</h4>
                                    <p className="home-card-translation" lang={targetLang}>{result.translation}</p>
                                    {result.showExample && (
                                        <p className="home-muted home-card-search-example">
                                            <span>Ejemplo: </span>
                                            <span lang={targetLang}>{result.exampleTranslation}</span>
                                            <span> ({result.exampleSpanish})</span>
                                        </p>
                                    )}
                                </div>
                                <button
                                    className="secondary-btn home-open-card"
                                    type="button"
                                    aria-label={`Abrir tarjeta: ${result.spanish}, ${result.module.title}`}
                                    disabled={opening !== null}
                                    onClick={() => openCard(result)}
                                >
                                    {opening === result ? "Abriendo…" : "Abrir tarjeta"}
                                </button>
                            </article>
                        ))}
                    </div>
                    {results.pages > 1 && (
                        <nav className="home-pagination" aria-label="Páginas de tarjetas">
                            <button className="secondary-btn" type="button" disabled={results.current <= 1}
                                onClick={() => onPage(results.current - 1)}>Anterior</button>
                            <span className="home-page-indicator" aria-live="polite">{results.current} / {results.pages}</span>
                            <button className="secondary-btn" type="button" disabled={results.current >= results.pages}
                                onClick={() => onPage(results.current + 1)}>Siguiente</button>
                        </nav>
                    )}
                </>
            )}
        </section>
    );
}
