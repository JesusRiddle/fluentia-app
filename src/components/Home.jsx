import { useEffect, useState } from "react";
import { LEVELS, CATEGORIES, MODULES } from "../data/modules";
import "./Home.css";

const PAGE_SIZE = 8;
const STORAGE_KEY = "fluentia_home_navigation";

const normalize = (text) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

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
            query: typeof saved?.query === "string" ? saved.query : "",
            page: Number.isInteger(saved?.page) && saved.page > 0 ? saved.page : 1,
        };
    } catch {
        return { level: "A1", category: null, query: "", page: 1 };
    }
}

export default function Home({ onSelectModule }) {
    const [navigation, setNavigation] = useState(initialNavigation);
    const { level, category, query, page } = navigation;

    useEffect(() => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(navigation));
    }, [navigation]);

    const selectedLevel = LEVELS.find((item) => item.id === level);
    const selectedCategory = CATEGORIES.find((item) => item.id === category);
    const search = normalize(query.trim());
    const searching = search.length > 0;
    const showingTopics = searching || category !== null;

    const levelModules = MODULES.filter((item) => item.level === level);

    const visibleCategories = CATEGORIES.filter((item) =>
        levelModules.some((module) => module.category === item.id)
    );

    const matchingModules = searching
        ? MODULES.filter((item) => {
            const categoryTitle = CATEGORIES.find(
                (entry) => entry.id === item.category
            )?.title ?? "";

            return normalize(
                `${item.title} ${item.description} ${item.level} ${categoryTitle}`
            ).includes(search);
        })
        : levelModules.filter((item) => item.category === category);

    const pageCount = Math.max(
        1,
        Math.ceil(matchingModules.length / PAGE_SIZE)
    );
    const currentPage = Math.min(page, pageCount);
    const pageModules = matchingModules.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    function selectLevel(nextLevel) {
        setNavigation({
            level: nextLevel,
            category: null,
            query: "",
            page: 1,
        });
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
                            {" / "}{selectedCategory.title}
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
                    ? `${matchingModules.length} ${matchingModules.length === 1 ? "tema encontrado" : "temas encontrados"
                    }`
                    : `${visibleCategories.length} ${visibleCategories.length === 1 ? "categoría" : "categorías"
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
                                    <strong>{item.title}</strong>
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
            ) : pageModules.length > 0 ? (
                <div className="home-topics">
                    {pageModules.map((item) => {
                        const categoryTitle = CATEGORIES.find(
                            (entry) => entry.id === item.category
                        )?.title;

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
                                        onClick={() => onSelectModule(item.file, "study")}
                                    >
                                        <span className="home-action-icon" aria-hidden="true">📚</span>
                                        <span>Flashcards</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="secondary-btn"
                                        disabled={!item.available}
                                        aria-label={`Práctica: ${item.title}`}
                                        onClick={() => onSelectModule(item.file, "practice")}
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

            {showingTopics && pageCount > 1 && (
                <nav className="home-pagination" aria-label="Páginas de temas">
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

                    <span aria-live="polite">
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
        </main>
    );
}