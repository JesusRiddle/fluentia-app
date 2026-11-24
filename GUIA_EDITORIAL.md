# Guía editorial de Fluentia

Versión 1.0 · 23 de noviembre de 2026

## 1. Propósito y alcance

Esta guía es la referencia para crear, ampliar, corregir y auditar los módulos JSON de `public/data/`. Aplica a toda contribución humana o asistida por IA. Su objetivo es garantizar calidad lingüística, coherencia pedagógica e integridad de los datos sin congelar el contenido ni imponer cantidades fijas de tarjetas.

Clasificación: **O** = obligatoria; **C** = obligatoria cuando se cumple la condición indicada; **R** = recomendación editorial. Las decisiones pendientes no son requisitos vigentes.

## 2. Idiomas y equivalencia

| Clave | Idioma | Variante |
| --- | --- | --- |
| es | Español | México (referencia) |
| en | Inglés | Estados Unidos |
| fr | Francés | Francia |
| it | Italiano | Italia |
| pt | Portugués | Brasil |
| de | Alemán | Alemania |

- **IDI-01 (O).** Usar español mexicano como referencia semántica y respetar la variante regional de cada idioma objetivo.
- **IDI-02 (O).** Priorizar equivalencias naturales, idiomáticas y de uso real sobre traducciones literales. Conservar significado, intención, intensidad y registro.
- **IDI-03 (O).** Completar todas las traducciones de los idiomas habilitados para el módulo. No usar cadenas vacías, marcadores provisionales ni traducciones inventadas.
- **IDI-04 (C).** En módulos con alemán habilitado, completar el alemán de todas las tarjetas antes de publicar. En módulos anteriores aún no migrados, conservar su cobertura vigente; no declarar alemán disponible hasta completar la migración. No confundir ausencia prevista con contenido incompleto.
- **IDI-05 (R).** Verificar usos dudosos con diccionarios, gramáticas o fuentes lingüísticas confiables de la región correspondiente.

## 3. Integridad y mantenimiento de JSON

- **DAT-01 (O).** Usar JSON válido en UTF-8, sin comentarios, comas finales ni claves duplicadas.
- **DAT-02 (O).** Consultar el esquema y los consumidores reales del módulo antes de editarlo; conservar los tipos, campos obligatorios y estructura compatibles. No introducir campos nuevos sin verificar soporte.
- **DAT-03 (O).** Cada tarjeta tendrá un identificador único en el ámbito exigido por la aplicación. Conservar los identificadores existentes al corregir una tarjeta; asignar identificadores nuevos a conceptos nuevos, sin reutilizar los eliminados para otros conceptos.
- **DAT-04 (O).** Preservar `image_url`, imágenes asignadas y otros campos adicionales, excepto cuando exista una corrección explícita y justificada. No eliminar metadatos al reescribir el archivo.
- **DAT-05 (O).** Mantener el orden original salvo justificación pedagógica o temática. No renumerar ni reorganizar indiscriminadamente.
- **DAT-06 (C).** Al añadir un módulo, verificar su registro, ruta, configuración e integración con los conteos de tarjetas existentes.
- **DAT-07 (O).** Entregar el JSON completo y un registro de cambios que identifique altas, bajas, correcciones y reorganizaciones. No sustituir el archivo por fragmentos incompletos.

## 4. Artículos definidos

- **ART-01 (C).** En tarjetas de sustantivos, incluir el artículo definido cuando corresponda gramaticalmente. Respetar género, número, elisión y usos propios de cada idioma; no forzar artículos en nombres propios o expresiones donde no correspondan.
- **ART-02 (O).** No añadir artículos artificialmente a verbos, adjetivos o expresiones que no los requieran.

| Idioma | Forma esperada para el sustantivo aislado |
| --- | --- |
| es | La casa |
| en | The house |
| fr | La maison |
| it | La casa |
| pt | A casa |
| de | Das Haus |

Los ejemplos ilustran la convención de artículos, no una regla general de capitalización.

## 5. Género y variantes

- **GEN-01 (O).** Escribir variantes completas separadas exactamente por ` / ` (espacio, barra, espacio). Ejemplos: `Rojo / Roja`, `Rosso / Rossa`, `Beau / Belle`. Evitar `Rojo(a)`, `Rosso/a` y `Beau/Belle`.
- **GEN-02 (C).** En adjetivos, incluir las formas de género pertinentes en el texto principal; no inventar flexiones en idiomas o palabras sin variación.
- **GEN-03 (C).** En sustantivos, conservar la forma principal y explicar las variantes pertinentes en las notas del idioma.
- **GEN-04 (O).** No crear tarjetas independientes únicamente por una flexión gramatical. Sí separar conceptos distintos, por ejemplo, la vaca y el toro cuando se enseñen como vocabulario diferenciado.
- **GEN-05 (C).** Explicar en notas las terminaciones gramaticales del alemán cuando sean relevantes; distinguir la forma léxica de las flexiones dependientes del contexto.

## 6. Plurales

- **PLU-01 (C).** Incluir el plural de sustantivos contables en las notas del idioma objetivo, con su artículo cuando corresponda.
- **PLU-02 (O).** No repetir innecesariamente el singular ni añadir notas de plural en español.
- **PLU-03 (O).** No forzar plurales de sustantivos incontables o predominantemente singulares cuando no tengan sentido en el concepto enseñado.

Ejemplo ilustrativo del objeto de notas, sujeto al esquema vigente del módulo:

```json
{
  "notes": {
    "en": "Plural: The houses",
    "fr": "Plural: Les maisons",
    "it": "Plural: Le case",
    "pt": "Plural: As casas",
    "de": "Plural: Die Häuser"
  }
}
```

## 7. Notas y aclaraciones

- **NOT-01 (O).** Redactar todas las explicaciones en español, aunque pertenezcan a otro idioma. Los términos y ejemplos citados permanecen en el idioma explicado.
- **NOT-02 (O).** El campo `es` contiene el término o expresión principal. Trasladar aclaraciones editoriales entre paréntesis a las notas; conservar paréntesis que sean parte genuina de la expresión si corresponde.
- **NOT-03 (O).** Asociar cada nota al idioma al que se refiere, respetando el esquema existente.
- **NOT-04 (C).** Añadir notas para explicar género, número, formalidad, contexto, registro, gramática o diferencias relevantes entre equivalentes cuando aporten valor.
- **NOT-05 (R).** Mantener notas breves, claras y adecuadas al espacio de las tarjetas. Usar ejemplos cortos solo cuando aporten valor pedagógico; evitar explicaciones obvias o redundantes.

## 8. Alternativas y pronunciación

- **ALT-01 (O).** Separar alternativas mediante ` / `, con palabras o expresiones completas.
- **ALT-02 (O).** Incluir solo alternativas naturales que correspondan al mismo concepto o intención; no acumular sinónimos indiscriminadamente ni mezclar sentidos incompatibles.
- **ALT-03 (O).** Las barras representan separación entre alternativas y deben producir pausas naturales en la síntesis de voz. No alterar el texto visible ni insertar caracteres artificiales para corregir la pronunciación; resolver la transformación en la capa de reproducción.
- **ALT-04 (C).** Si las alternativas difieren en registro o contexto, aclarar esa diferencia en las notas.

## 9. Duplicados y organización

- **DUP-01 (O).** Eliminar duplicados exactos y redundancias semánticas que no aporten aprendizaje, previa revisión del contexto y de los identificadores.
- **DUP-02 (O).** Mantener una tarjeta por concepto o intención comunicativa; conservar tarjetas distintas cuando exista una diferencia significativa de sentido, contexto o intención.
- **DUP-03 (C).** Revisar duplicidades dentro del módulo y entre módulos y niveles relacionados. Conservar repeticiones pedagógicamente justificadas; no aplicar deduplicación mecánica global.
- **DUP-04 (R).** Agrupar las tarjetas en un orden semántico que facilite su estudio.

## 10. Progresión pedagógica

El Marco Común Europeo de Referencia (MCER) orienta la complejidad comunicativa; la dificultad de una palabra depende también de su uso y contexto.

| Nivel | Enfoque |
| --- | --- |
| A1 | Vocabulario y expresiones elementales |
| A2 | Situaciones cotidianas y comunicación básica |
| B1 | Comunicación autónoma |
| B2 | Expresiones complejas y matices comunicativos |
| C1 | Dominio avanzado, precisión y registros |
| C2 | Sofisticación lingüística y dominio idiomático |

- **PED-01 (O).** Respetar el nivel y la delimitación temática del módulo.
- **PED-02 (O).** Priorizar utilidad, frecuencia de uso y progresión real. No añadir tarjetas únicamente para aumentar el conteo.
- **PED-03 (C).** Incorporar conceptos imprescindibles omitidos y corregir contenidos fuera de nivel o tema cuando se detecten durante una auditoría.
- **PED-04 (R).** Organizar de lo general a lo específico o de lo simple a lo complejo cuando resulte útil.
- **PED-05 (O).** Permitir altas, bajas y reorganizaciones justificadas. No convertir cantidades de tarjetas, listas cerradas ni ejemplos de esta guía en restricciones editoriales inmutables.

## 11. Expresiones idiomáticas y lenguaje coloquial

- **REG-01 (O).** Priorizar la equivalencia comunicativa sobre la literalidad, especialmente en modismos.
- **REG-02 (O).** Conservar intensidad, intención y registro; distinguir formal, informal, coloquial, vulgar y ofensivo cuando corresponda. No suavizar ni intensificar injustificadamente.
- **REG-03 (C).** Usar las etiquetas `Literal:` y `Uso real:` en las notas cuando la diferencia entre significado literal y uso idiomático aporte valor.
- **REG-04 (C).** Aclarar restricciones de contexto y posibles connotaciones ofensivas cuando sean necesarias para evitar usos inapropiados.

## 12. Procedimiento de creación y actualización

1. Identificar módulo, nivel, tema, idiomas habilitados y esquema real.
2. Revisar contenido existente y módulos relacionados para detectar omisiones y redundancias.
3. Aplicar las reglas editoriales correspondientes, preservando metadatos e identificadores.
4. Realizar tres pasadas diferenciadas de revisión.
5. Resolver hallazgos, repetir las comprobaciones afectadas y entregar el archivo completo con registro de cambios.

### Pasada 1: estructural

- [ ] JSON válido, codificación, campos y tipos compatibles.
- [ ] Identificadores únicos y estables; imágenes y metadatos preservados.
- [ ] Cobertura de idiomas habilitados completa.
- [ ] Rutas y registro correctos si se creó un módulo.

### Pasada 2: lingüística

- [ ] Traducciones naturales y equivalentes en las variantes regionales.
- [ ] Ortografía, capitalización, puntuación, gramática, artículos, género y plurales correctos.
- [ ] Infinitivos y construcciones pronominales naturales; sin notas de conjugación en tarjetas ordinarias.
- [ ] Alternativas completas con el separador establecido.
- [ ] Contracciones naturales, coloquialismos y abreviaturas en notas cuando corresponda; apóstrofos rectos.
- [ ] Notas en español, breves y asociadas al idioma pertinente.
- [ ] Registro, intensidad y significado conservados; variantes de tratamiento ordenadas y etiquetas de registro en notas.
- [ ] Falsos amigos relevantes aclarados en notas.
- [ ] Significados distintos separados y ambigüedades aclaradas mediante notas parentéticas cuando corresponda.

### Pasada 3: pedagógica

- [ ] Nivel, tema, utilidad y orden coherentes.
- [ ] Conceptos esenciales cubiertos sin inflar el conteo.
- [ ] Duplicados revisados y repeticiones justificadas.
- [ ] Cambios de contenido documentados.

**Criterio de cierre:** no publicar un módulo con errores conocidos sin resolver. Las dudas lingüísticas pendientes deben documentarse y verificarse; no dar por realizada una revisión que no se efectuó. La revisión es manual/editorial: esta versión no introduce pruebas automatizadas ni cambios en el pipeline.

## 13. Capitalización y puntuación

- **CAP-01 (O).** Utilizar mayúscula inicial de presentación en cada tarjeta y en cada alternativa separada por ` / `. Respetar las mayúsculas y minúsculas ortográficas propias de cada idioma en el resto del texto (por ejemplo, sustantivos alemanes, días y meses ingleses).
- **CAP-02 (O).** No añadir punto final a palabras aisladas, frases nominales ni saludos breves: `Lunes`, `La casa`, `Rojo / Roja`, `Buenos días`.
- **CAP-03 (O).** Añadir punto final a las oraciones declarativas completas y notas explicativas. Usar los signos de interrogación y exclamación y sus espacios según la ortografía del idioma: `¿Cómo estás?`, `How are you?`, `Comment vas-tu ?`.
- **CAP-04 (O).** En ejemplos dentro de notas, aplicar la ortografía natural del idioma, sin trasladar artificialmente la mayúscula inicial de presentación.

## 14. Verbos: infinitivos, reflexivos e irregulares

- **VER-01 (O).** Presentar los verbos aislados en infinitivo; en inglés incluir `To` en cada alternativa que sea un infinitivo. Ejemplo: `Comer`, `To eat`, `Manger`, `Mangiare`, `Comer`, `Essen`.
- **VER-02 (C).** Respetar las excepciones gramaticales, como los modales ingleses sin infinitivo propio: `Can / To be able to`, nunca `To can`. Las tarjetas de expresiones y oraciones mantienen la forma verbal natural del contexto.
- **VER-03 (O).** Conservar los pronombres reflexivos o pronominales cuando los requiera cada idioma, sin imponerlos por calco del español. Ejemplo: `Despertarse`, `To wake up`, `Se réveiller`, `Svegliarsi`, `Acordar / Despertar`, `Aufwachen`.
- **VER-04 (O).** No añadir notas de conjugación a las tarjetas ordinarias de vocabulario, ni siquiera para verbos irregulares. Ejemplo: `Ir` → `To go`, sin listar `went` ni `gone`. Las notas semánticas, de uso y de registro siguen permitidas conforme a las reglas generales.
- **VER-05 (C).** Reservar los paradigmas, formas irregulares y explicaciones de conjugación para la futura sección específica de verbos comunes. Su estructura y alcance se definirán al crear dicha sección; no duplicar anticipadamente ese contenido en los módulos ordinarios.

## 15. Contracciones, abreviaturas y siglas

- **CON-01 (O).** Usar contracciones habituales y naturales del idioma sin duplicar sistemáticamente la forma completa. Respetar las elisiones y contracciones gramaticalmente obligatorias: `I'm leaving`, `J'ai un problème`, `È l'una`.
- **CON-02 (C).** Usar la forma estándar en el texto principal y registrar las variantes coloquiales pertinentes en las notas del idioma correspondiente con la etiqueta `Coloquial:`. Ejemplos: `Coloquial: Gonna.`, `Coloquial: Tô.`, `Coloquial: Pra.` Incluir una aclaración breve de contexto o registro cuando sea necesaria. No añadir variantes coloquiales indiscriminadamente. Si la propia expresión coloquial es el objeto explícito de aprendizaje, puede aparecer en el texto principal con su registro aclarado en notas.
- **CON-03 (C).** Presentar la forma completa de abreviaturas y siglas en el texto principal y consignar la abreviatura o sigla en notas, respetando su grafía convencional (por ejemplo, `Abreviatura: Dr.`, `Sigla: ASAP.`). Si la abreviatura o sigla es el objeto explícito de aprendizaje, puede aparecer en el texto principal y explicarse en notas.
- **CON-04 (O).** Usar apóstrofo recto ASCII (`'`, U+0027) en los textos lingüísticos y notas de los JSON, en lugar del apóstrofo tipográfico (`’`, U+2019). No confundir apóstrofos con otros signos ortográficos ni modificar identificadores, URLs o metadatos ajenos al contenido lingüístico.

## 16. Imágenes y representación de colores

- **IMG-01 (O).** Priorizar el contenido lingüístico. Las tarjetas ordinarias se diseñan para funcionar únicamente con texto; no se requiere buscar, generar ni asignar imágenes al crear o actualizar módulos.
- **IMG-02 (O).** Conservar el campo `image_url` conforme al esquema vigente, con valor vacío en tarjetas nuevas. Las imágenes y rutas existentes no se eliminarán automáticamente durante una revisión editorial; su retirada de los contenidos o de la interfaz deberá tratarse como un cambio explícito independiente.
- **IMG-03 (C).** El módulo de colores es la excepción visual: utilizar el campo `hex` para representar los colores y tonalidades mediante muestras cromáticas, sin archivos de imagen. Usar códigos hexadecimales válidos y adecuados al color representado; conservar el valor vacío cuando el concepto no tenga un color concreto (por ejemplo, claro u oscuro).
- **IMG-04 (O).** No condicionar la publicación de módulos lingüísticos a la disponibilidad de imágenes.

## 17. Falsos amigos

- **FAL-01 (O).** Mantener en el texto principal la equivalencia semántica correcta, sin traducir por semejanza ortográfica o fonética con el español.
- **FAL-02 (C).** Cuando exista un riesgo real de confusión para un hispanohablante, añadir una nota en el idioma correspondiente con la etiqueta `Falso amigo:`. Explicar brevemente el significado erróneo que debe evitarse y, cuando resulte útil, indicar la equivalencia correcta de la palabra española confundida.
- **FAL-03 (O).** No presentar como falsos amigos términos que compartan un significado válido sin aclarar el sentido concreto en que difieren.

Ejemplo: `En realidad` → `Actually`. Nota en inglés: `Falso amigo: No significa «actualmente». Para expresar «actualmente» se utiliza «currently».`

## 18. Homónimos y polisemia

- **POL-01 (O).** Crear tarjetas independientes para cada significado relevante de una palabra cuando cambie el concepto o la equivalencia lingüística. El separador ` / ` se reserva para alternativas del mismo significado, conforme a ALT-02.
- **POL-02 (C).** Cuando el texto principal sea ambiguo, añadir una aclaración breve entre paréntesis en las notas correspondientes, sin la etiqueta «Contexto:». Para fragmentos nominales no usar punto: `(Entidad financiera)`, `(Asiento para varias personas)`. Si la nota parentética constituye una oración completa autónoma, colocar el punto antes del cierre: `(Se refiere a una entidad financiera.)`.
- **POL-03 (R).** Preferir expresiones naturales que desambigüen por sí mismas, sin añadir aclaraciones redundantes: `La llave de agua`, `La llave de paso`, `La planta de interior`.
- **POL-04 (C).** Mantener la aclaración accesible en la cara de la tarjeta que presenta la ambigüedad, especialmente en la nota española cuando el término de referencia admite varios sentidos.

## 19. Formalidad y tratamiento personal

- **TRA-01 (O).** Agrupar las variantes de tratamiento de una misma intención comunicativa en una tarjeta, separadas por ` / `, primero la informal y después la formal. No repetir una traducción idéntica cuando el idioma no distinga ambos tratamientos.
- **TRA-02 (C).** Mantener tarjetas independientes cuando se enseñen expresiones inherentemente distintas por registro, no meras flexiones de tratamiento. Trasladar las aclaraciones de registro del texto principal a las notas.
- **TRA-03 (C).** Indicar registros mediante aclaraciones parentéticas breves sin punto final: `(Formal)`, `(Informal)`, `(Coloquial)`, `(Vulgar)`, `(Ofensivo)`, `(Despectivo)`. Añadir explicaciones de uso cuando sea necesario. Conservar la etiqueta `Coloquial:` para variantes alternativas según CON-02.

## 20. Decisiones pendientes

Los siguientes temas requieren una definición posterior y no constituyen nuevas reglas obligatorias:

- Convenciones culturales de tratamiento y criterios de inclusión de variantes regionales en notas (pendiente de aprobación).
- Confirmar si el formato de plural se cambia a aclaración parentética, por ejemplo, `(Plural: The houses)`.
- Criterios específicos de repetición entre niveles.
- Nomenclatura de archivos e identificadores nuevos.
- Incorporación de futuros idiomas y plan de migración de módulos al alemán.

## 21. Mantenimiento de la guía

Actualizar este documento cuando se acuerde una nueva regla editorial. Registrar las excepciones justificadas en el cambio correspondiente. Los ejemplos son ilustrativos, no listas exhaustivas ni esquemas alternativos. Ante una incompatibilidad técnica, resolverla explícitamente antes de cambiar el formato de los JSON.

Esta guía no exige modificar retroactivamente todos los módulos en una sola intervención; debe aplicarse a los nuevos contenidos y a las revisiones de los existentes.
