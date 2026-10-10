export default function Home({ onSelectModule }) {
    return (
        <main className="view">
            <div className="hero">
                <div className="hero-text">
                    <p className="hero-kicker">APRENDIZAJE GLOBAL</p>
                    <h2 className="hero-title">Elige tu <span>Nivel</span></h2>
                    <p className="hero-sub">Selecciona un tema para comenzar a estudiar con flashcards.</p>
                </div>
            </div>

            {/* Nivel A1 */}
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🟢 Nivel A1</span> — Principiante
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                    {/* Botón Tema Colores */}
                    <button
                        className="card theme-card-btn"
                        onClick={() => onSelectModule('a1_colors.json', 'study')}
                        style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                    >
                        <div>
                            <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>🎨 Colores Básicos</h4>
                            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Tonos esenciales y metálicos</p>
                        </div>
                        <span style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>➔</span>
                    </button>

                    {/* Contenedor de Números */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>🔢 Los Números</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Dígitos, decenas, millones y negativos</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_numeros.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_numeros.json', 'practice')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>🎮</span> Práctica
                            </button>
                        </div>
                    </div>
                    {/* Contenedor de Comidas y Bebidas */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>🍔 Comidas y Bebidas</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Frutas, verduras, despensa y más</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_comida.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_comida.json', 'practice')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>🎮</span> Práctica
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}