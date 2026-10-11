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
                    {/* Contenedor de Saludos y Despedidas */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>👋🏻 Saludos y Despedidas</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Formales, Informales y del día</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_saludos_despedidas.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_saludos_despedidas.json', 'practice')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>🎮</span> Práctica
                            </button>
                        </div>
                    </div>

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

                    {/* Contenedor de Colores */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>🎨 Colores Básicos</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Tonos esenciales y metálicos</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_colors.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_colors.json', 'practice')}
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

                    {/* Contenedor de El Tiempo y el Calendario */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>🕖 El Tiempo y el Calendario</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Días, meses, frecuencia y expresiones para ubicarte en el pasado, presente y futuro</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_tiempo_calendario.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_tiempo_calendario.json', 'practice')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>🎮</span> Práctica
                            </button>
                        </div>
                    </div>

                    {/* Contenedor de El Alfabeto y Fonética */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>🔤 El Alfabeto y Fonética</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Letras, sonidos básicos y cómo deletrear tu nombre.</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_alfabeto.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_alfabeto.json', 'practice')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>🎮</span> Práctica
                            </button>
                        </div>
                    </div>

                    {/* Contenedor de Presentaciones y Nacionalidades */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>🌍 Presentaciones y Nacionalidades</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Países, idiomas, profesiones y datos personales.</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_presentaciones.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_presentaciones.json', 'practice')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>🎮</span> Práctica
                            </button>
                        </div>
                    </div>

                    {/* Contenedor de La Familia y Relaciones */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>👨‍👩‍👧‍👦 La Familia y Relaciones</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Miembros de la familia, parentescos y estado civil.</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_familia.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_familia.json', 'practice')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>🎮</span> Práctica
                            </button>
                        </div>
                    </div>

                    {/* Contenedor de Restaurantes y Frases en la Mesa */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>🗣️ Restaurantes y Frases en la Mesa</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Objetos, personal, gustos, reservas, llegada, pedidos, restricciones básicas y pago.</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a2_restaurantes_y_mesa.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a2_restaurantes_y_mesa.json', 'practice')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>🎮</span> Práctica
                            </button>
                        </div>
                    </div>

                    {/* Contenedor de Restaurantes: peticiones e imprevistos */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>🗣️ Restaurantes: peticiones e imprevistos</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Ingredientes, preparación, restricciones detalladas, recomendaciones, modificaciones, errores y reclamaciones.</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('b1_restaurantes_peticiones_e_imprevistos.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('b1_restaurantes_peticiones_e_imprevistos.json', 'practice')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>🎮</span> Práctica
                            </button>
                        </div>
                    </div>

                    {/* Contenedor de Descripciones Físicas y Adjetivos */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>👤 Descripciones Físicas y Adjetivos</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Apariencia, estados de ánimo y rasgos de personalidad básicos.</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_descripciones.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_descripciones.json', 'practice')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>🎮</span> Práctica
                            </button>
                        </div>
                    </div>

                    {/* Contenedor de La Ropa y Objetos Cotidianos */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>👕 La Ropa y Objetos Cotidianos</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Prendas de vestir, calzado, accesorios y cosas de bolsillo.</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_ropa_objetos.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_ropa_objetos.json', 'practice')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>🎮</span> Práctica
                            </button>
                        </div>
                    </div>

                    {/* Contenedor de Las Partes del Cuerpo y Salud */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>🏃‍♂️ Las Partes del Cuerpo y Salud</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Anatomía básica y cómo expresar dolor o malestar físico.</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_cuerpo_salud.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_cuerpo_salud.json', 'practice')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>🎮</span> Práctica
                            </button>
                        </div>
                    </div>

                    {/* Contenedor de La Casa y el Hogar */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>🏠 La Casa y el Hogar</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Habitaciones, muebles principales y tareas domésticas sencillas.</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_casa.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_casa.json', 'practice')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>🎮</span> Práctica
                            </button>
                        </div>
                    </div>

                    {/* Contenedor de Lugares de la Ciudad y Direcciones */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>🏙️ Lugares de la Ciudad y Direcciones</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Tiendas, edificios públicos y preposiciones de lugar (cerca, lejos, enfrente).</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_ciudad.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_ciudad.json', 'practice')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>🎮</span> Práctica
                            </button>
                        </div>
                    </div>

                    {/* Contenedor de Pasatiempos y Tiempo Libre */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>🎨 Pasatiempos y Tiempo Libre</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Deportes, entretenimiento, música y actividades de fin de semana.</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_pasatiempos.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_pasatiempos.json', 'practice')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>🎮</span> Práctica
                            </button>
                        </div>
                    </div>

                    {/* Contenedor de El Clima y las Estaciones */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>🌦️ El Clima y las Estaciones</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Fenómenos meteorológicos, temperatura y las cuatro estaciones.</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_clima.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_clima.json', 'practice')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>🎮</span> Práctica
                            </button>
                        </div>
                    </div>

                    {/* Contenedor de Verbos de Acción y Supervivencia */}
                    <div className="card" style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>🆘 Verbos de Acción y Supervivencia</h4>
                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Verbos indispensables (querer, necesitar, poder, tener) y frases de emergencia.</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_verbos.json', 'study')}
                                style={{ padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                            >
                                <span>📚</span> Flashcards
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => onSelectModule('a1_verbos.json', 'practice')}
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