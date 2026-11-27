import { useEffect, useState } from "react";
import { LEVELS, CATEGORIES, MODULES } from "../data/modules";
import CardSearch from "./CardSearch";
import cardCounts from "../data/cardCounts.json";
import "./Home.css";

const SEARCH_PAGE_SIZE = 8;
const STORAGE_KEY = "fluentia_home_navigation";

const normalize = (text) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const categoryName = (entry, level) => entry?.titlesByLevel?.[level] ?? entry?.title;

const defaultNavigation = { level: "A1", category: null, query: "", page: 1, searchKind: "topics", cardQuery: "", cardPage: 1 };

function initialNavigation() {
    try {
        const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
        return {
            level: LEVELS.some((item) => item.id === saved?.level)
                ? saved.level
                : "A1",
            category: CATEGORIES.some((item) => item.id === saved?.category)
                ? saved.category
                : null,
            searchKind: saved?.searchKind === "cards" ? "cards" : "topics",
            cardQuery: typeof saved?.cardQuery === "string" ? saved.cardQuery : "",
            cardPage: Number.isInteger(saved?.cardPage) && saved.cardPage > 0 ? saved.cardPage : 1,
            query: typeof saved?.query === "string" ? saved.query : "",
            page: Number.isInteger(saved?.page) && saved.page > 0 ? saved.page : 1,
        };
    } catch {
        return defaultNavigation;
    }
}

export default function Home({ onSelectModule, targetLang }) {
    const [navigation, setNavigation] = useState(initialNavigation);
    const { level, category, query, page, searchKind, cardQuery, cardPage } = navigation;

    useEffect(() => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(navigation));
    }, [navigation]);

    const selectedLevel = LEVELS.find((item) => item.id === level);
    const selectedCategory = CATEGORIES.find((item) => item.id === category);
    const search = normalize(query.trim());
    const searching = search.length > 0;
    const showingTopics = searching || category !== null;

    const levelModules = MODULES.filter((item) => item.level === level);

    const availableTopicsCount = levelModules.filter(
        (item) => item.available
    ).length;

    const visibleCategories = CATEGORIES.filter((item) =>
        levelModules.some((module) => module.category === item.id)
    );

    const matchingModules = searching
        ? MODULES.filter((item) => {
            const entry = CATEGORIES.find((category) => category.id === item.category);
            const categoryTitle = categoryName(entry, item.level) ?? "";

            return normalize(
                `${item.title} ${item.description} ${item.level} ${categoryTitle} ${entry?.title ?? ""}`
            ).includes(search);
        })
        : levelModules.filter((item) => item.category === category);

    const pageCount = searching
        ? Math.max(1, Math.ceil(matchingModules.length / SEARCH_PAGE_SIZE))
        : 1;
    const currentPage = Math.min(page, pageCount);
    const displayedModules = searching
        ? matchingModules.slice(
            (currentPage - 1) * SEARCH_PAGE_SIZE,
            currentPage * SEARCH_PAGE_SIZE
        )
        : matchingModules;

    function selectLevel(nextLevel) {
        setNavigation((current) => ({
            ...current,
            level: nextLevel,
            category: null,
            query: "",
            page: 1,
        }));
    }

    function selectCategory(nextCategory) {
        setNavigation((current) => ({
            ...current,
            category: nextCategory,
            query: "",
            page: 1,
        }));
    }

    function backToCategories() {
        setNavigation((current) => ({
            ...current,
            category: null,
            query: "",
            page: 1,
        }));
    }

    return (
        <main className="view home-explorer">
            <div className="hero">
                <div className="hero-text">
                    <p className="hero-kicker">APRENDIZAJE GLOBAL</p>
                    <h2 className="hero-title">
                        Explora tus <span>temas</span>
                    </h2>
                    <p className="hero-sub">
                        Elige un nivel y una categoría para comenzar.
                    </p>
                </div>
            </div>

            <nav className="home-search-modes" aria-label="Tipo de búsqueda">
                <button type="button" className="home-level" aria-pressed={searchKind === "topics"}
                    onClick={() => setNavigation((current) => ({ ...current, searchKind: "topics" }))}>
                    Temas
                </button>
                <button type="button" className="home-level" aria-pressed={searchKind === "cards"}
                    onClick={() => setNavigation((current) => ({ ...current, searchKind: "cards" }))}>
                    Palabras y frases
                </button>
            </nav>

            {searchKind === "cards" && (
                <CardSearch
                    targetLang={targetLang}
                    query={cardQuery}
                    page={cardPage}
                    onQuery={(value) => setNavigation((current) => ({ ...current, cardQuery: value, cardPage: 1 }))}
                    onPage={(value) => setNavigation((current) => ({ ...current, cardPage: value }))}
                    onSelectModule={onSelectModule}
                />
            )}

            <div hidden={searchKind !== "topics"}>
                <nav className="home-levels" aria-label="Nivel de aprendizaje">
                    {LEVELS.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className="home-level"
                            aria-pressed={level === item.id}
                            onClick={() => selectLevel(item.id)}
                        >
                            {item.id}
                        </button>
                    ))}
                </nav>

                <div className="home-search">
                    <label htmlFor="home-topic-search">Buscar tema</label>

                    <div className="home-search-row">
                        <input
                            id="home-topic-search"
                            type="search"
                            value={query}
                            placeholder="Saludos, restaurante, colores…"
                            aria-describedby="home-search-hint"
                            onChange={(event) =>
                                setNavigation((current) => ({
                                    ...current,
                                    query: event.target.value,
                                    page: 1,
                                }))
                            }
                        />

                        {query && (
                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={() =>
                                    setNavigation((current) => ({
                                        ...current,
                                        query: "",
                                        page: 1,
                                    }))
                                }
                            >
                                Limpiar
                            </button>
                        )}
                    </div>

                    <p id="home-search-hint" className="home-muted">
                        Busca en todos los niveles.
                    </p>
                </div>

                <div className="home-section-heading">
                    <h3>
                        {searching
                            ? "Resultados en todos los niveles"
                            : `${level} — ${selectedLevel.title}`}
                        {!searching && selectedCategory && (
                            <span className="home-category-label">
                                {" / "}{categoryName(selectedCategory, level)}
                            </span>
                        )}
                    </h3>

                    {showingTopics && (
                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={backToCategories}
                        >
                            ← Categorías
                        </button>
                    )}
                </div>

                <p className="home-muted" role="status" aria-live="polite">
                    {showingTopics
                        ? `${matchingModules.length} ${matchingModules.length === 1
                            ? "tema encontrado"
                            : "temas encontrados"
                        }`
                        : `${visibleCategories.length} ${visibleCategories.length === 1
                            ? "categoría"
                            : "categorías"
                        } · ${availableTopicsCount} ${availableTopicsCount === 1 ? "tema" : "temas"
                        }`}
                </p>

                {!showingTopics ? (
                    visibleCategories.length > 0 ? (
                        <div className="home-categories">
                            {visibleCategories.map((item) => {
                                const topics = levelModules.filter(
                                    (module) => module.category === item.id
                                );
                                const availableCount = topics.filter(
                                    (module) => module.available
                                ).length;

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className="home-category"
                                        onClick={() => selectCategory(item.id)}
                                    >
                                        <span className="home-category-icon" aria-hidden="true">
                                            {item.icon}
                                        </span>
                                        <strong>{categoryName(item, level)}</strong>
                                        <span className="home-muted">
                                            {topics.length} {topics.length === 1 ? "tema" : "temas"}
                                            {" · "}{availableCount} disponibles
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="home-empty">
                            Todavía no hay temas registrados para este nivel.
                        </p>
                    )
                ) : displayedModules.length > 0 ? (
                    <div className="home-topics">
                        {displayedModules.map((item) => {
                            const entry = CATEGORIES.find((category) => category.id === item.category);
                            const categoryTitle = categoryName(entry, item.level);

                            return (
                                <article key={item.id} className="home-topic">
                                    <div className="home-topic-copy">
                                        {searching && (
                                            <p className="home-topic-meta">
                                                {item.level} · {categoryTitle}
                                            </p>
                                        )}

                                        <h4>
                                            <span aria-hidden="true">{item.icon}</span> {item.title}
                                        </h4>
                                        <p className="home-muted">{item.description}</p>
                                        {item.available && Number.isInteger(cardCounts[item.file]) && (
                                            <p className="home-card-count">
                                                {cardCounts[item.file].toLocaleString("es-MX")}{" "}
                                                {cardCounts[item.file] === 1 ? "tarjeta" : "tarjetas"}
                                            </p>
                                        )}

                                        {!item.available && (
                                            <span className="home-pending">Próximamente</span>
                                        )}
                                    </div>

                                    <div className="home-topic-actions">
                                        <button
                                            type="button"
                                            className="secondary-btn"
                                            disabled={!item.available}
                                            aria-label={`Flashcards: ${item.title}`}
                                            onClick={() => onSelectModule(item, "study")}
                                        >
                                            <span className="home-action-icon" aria-hidden="true">📚</span>
                                            <span>Flashcards</span>
                                        </button>

                                        <button
                                            type="button"
                                            className="secondary-btn"
                                            disabled={!item.available}
                                            aria-label={`Práctica: ${item.title}`}
                                            onClick={() => onSelectModule(item, "practice")}
                                        >
                                            <span className="home-action-icon" aria-hidden="true">🎮</span>
                                            <span>Práctica</span>
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <p className="home-empty">
                        No encontramos temas. Prueba con otra palabra.
                    </p>
                )}

                {searching && pageCount > 1 && (
                    <nav className="home-pagination" aria-label="Páginas de resultados">
                        <button
                            type="button"
                            className="secondary-btn"
                            disabled={currentPage === 1}
                            onClick={() =>
                                setNavigation((current) => ({
                                    ...current,
                                    page: currentPage - 1,
                                }))
                            }
                        >
                            Anterior
                        </button>

                        <span className="home-page-indicator" aria-live="polite">
                            {currentPage} / {pageCount}
                        </span>

                        <button
                            type="button"
                            className="secondary-btn"
                            disabled={currentPage === pageCount}
                            onClick={() =>
                                setNavigation((current) => ({
                                    ...current,
                                    page: currentPage + 1,
                                }))
                            }
                        >
                            Siguiente
                        </button>
                    </nav>
                )}
            </div>
        </main>
    );
}