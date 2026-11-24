# Guía editorial de Fluentia

Versión 1.0 · 23 de noviembre de 2026

## 1. Propósito y alcance

Esta guía es la referencia para crear, ampliar, corregir y auditar los módulos JSON de `public/data/`. Aplica a toda contribución humana o asistida por IA. Su objetivo es garantizar calidad lingüística, coherencia pedagógica e integridad de los datos sin congelar el contenido ni imponer cantidades fijas de tarjetas.

Clasificación: **O** = obligatoria; **C** = obligatoria cuando se cumple la condición indicada; **R** = recomendación editorial. Las reglas específicas prevalecen sobre las generales en su ámbito; los ejemplos ilustran la regla sin imponer listas cerradas.

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
- **DAT-03 (O).** Cada tarjeta tendrá un identificador de texto no vacío, único dentro del módulo (incluida su representación como cadena). Conservar los identificadores existentes al corregir una tarjeta; asignar identificadores nuevos a conceptos nuevos, sin reutilizar los eliminados para otros conceptos.
- **DAT-04 (O).** Preservar `image_url`, imágenes asignadas y otros campos adicionales, excepto cuando exista una corrección explícita y justificada. No eliminar metadatos al reescribir el archivo.
- **DAT-05 (O).** Preservar o mejorar el orden semántico del arreglo `cards`, conforme a NOM-04; insertar nuevas tarjetas en su bloque temático sin renumerar identificadores ni reorganizar indiscriminadamente.
- **DAT-06 (C).** Al añadir un módulo, verificar su registro en `src/data/modules.js`, ruta, nivel, configuración e integración con los conteos de tarjetas existentes. No editar manualmente los conteos generados.
- **DAT-08 (O).** Preservar los valores de `module` y `level` de los módulos existentes: junto con el idioma son la clave de las tarjetas marcadas para repasar. No cambiar estos valores por motivos cosméticos; cualquier cambio de identidad requiere evaluar sus efectos y tratarlo por separado.
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

Los ejemplos aplican la convención de artículos y la capitalización de presentación de CAP-01.

## 5. Género y variantes

- **GEN-01 (O).** Escribir variantes completas separadas exactamente por ` / ` (espacio, barra, espacio). Ejemplos: `Rojo / Roja`, `Rosso / Rossa`, `Beau / Belle`. Evitar `Rojo(a)`, `Rosso/a` y `Beau/Belle`.
- **GEN-02 (C).** En adjetivos, incluir las formas de género pertinentes en el texto principal; no inventar flexiones en idiomas o palabras sin variación.
- **GEN-03 (C).** En sustantivos, conservar la forma principal y explicar las variantes pertinentes en las notas del idioma.
- **GEN-04 (O).** No crear tarjetas independientes únicamente por una flexión gramatical. Sí separar conceptos distintos, por ejemplo, la vaca y el toro cuando se enseñen como vocabulario diferenciado.
- **GEN-06 (C).** En oraciones completas, conservar la concordancia de género y número en cada alternativa. Repetir la expresión completa si una forma aislada perdería el sentido: `Estoy cansado. / Estoy cansada.`, no `Estoy cansado / cansada.` ni `Estoy cansado/a.`
- **GEN-05 (C).** Explicar en notas las terminaciones gramaticales del alemán cuando sean relevantes; distinguir la forma léxica de las flexiones dependientes del contexto.

## 6. Plurales

- **PLU-01 (C).** Incluir el plural de sustantivos contables en las notas del idioma objetivo, con su artículo cuando corresponda, mediante el formato parentético `(Plural: The houses)`, sin punto final. Aplicar mayúscula inicial de presentación al plural y respetar la ortografía del idioma.
- **PLU-02 (O).** No repetir innecesariamente el singular ni añadir notas de plural en español.
- **PLU-03 (O).** No forzar plurales de sustantivos incontables o predominantemente singulares cuando no tengan sentido en el concepto enseñado.

Ejemplo ilustrativo del objeto de notas, sujeto al esquema vigente del módulo:

```json
{
  "notes": {
    "en": "(Plural: The houses)",
    "fr": "(Plural: Les maisons)",
    "it": "(Plural: Le case)",
    "pt": "(Plural: As casas)",
    "de": "(Plural: Die Häuser)"
  }
}
```

## 7. Notas y aclaraciones

- **NOT-01 (O).** Redactar todas las explicaciones en español, aunque pertenezcan a otro idioma. Los términos y ejemplos citados permanecen en el idioma explicado.
- **NOT-02 (O).** El campo `es` contiene el término o expresión principal. Trasladar aclaraciones editoriales entre paréntesis a las notas; conservar paréntesis que sean parte genuina de la expresión si corresponde.
- **NOT-03 (O).** Asociar cada nota al idioma al que se refiere, respetando el esquema existente.
- **NOT-04 (C).** Añadir notas para explicar género, número, formalidad, contexto, registro, gramática o diferencias relevantes entre equivalentes cuando aporten valor.
- **NOT-06 (O).** Mantener `notes` como objeto opcional con una cadena de texto por clave de idioma; combinar aclaraciones en esa misma cadena sin sobrescribir información útil. No introducir arreglos ni objetos anidados. Omitir claves de notas sin contenido.
- **NOT-05 (R).** Mantener notas breves, claras y adecuadas al espacio de las tarjetas. Usar ejemplos cortos solo cuando aporten valor pedagógico; evitar explicaciones obvias o redundantes.

## 8. Alternativas y pronunciación

- **ALT-01 (O).** Separar alternativas mediante ` / `, con palabras o expresiones completas.
- **ALT-02 (O).** Incluir solo alternativas naturales que correspondan al mismo concepto o intención; no acumular sinónimos indiscriminadamente ni mezclar sentidos incompatibles.
- **ALT-03 (O).** Las barras representan separación entre alternativas y deben producir pausas naturales en la síntesis de voz. No alterar el texto visible ni insertar caracteres artificiales para corregir la pronunciación; resolver la transformación en la capa de reproducción.
- **ALT-05 (O).** Cada alternativa debe poder leerse de forma autónoma cuando representa una palabra, número u oración completa. No abreviar segmentos compartidos si ello altera su significado o audio (p. ej. `Menos um / Menos uma`, no `Menos um / Uma`). Reservar ` / ` para alternativas; no modificar barras propias de fechas, fracciones o símbolos.
- **ALT-04 (C).** Si las alternativas difieren en registro o contexto, aclarar esa diferencia en las notas.

## 9. Duplicados y organización

- **DUP-01 (O).** Eliminar duplicados exactos y redundancias semánticas que no aporten aprendizaje, previa revisión del contexto y de los identificadores.
- **DUP-02 (O).** Mantener una tarjeta por concepto o intención comunicativa; conservar tarjetas distintas cuando exista una diferencia significativa de sentido, contexto o intención.
- **DUP-03 (C).** Revisar duplicidades dentro del módulo y entre módulos y niveles relacionados. Conservar repeticiones pedagógicamente justificadas; no aplicar deduplicación mecánica global.
- **DUP-04 (O).** Agrupar las tarjetas en un orden semántico que facilite su estudio, según NOM-04.

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
- [ ] Identificadores únicos y estables, identidad del módulo preservada y excepciones técnicas de números respetadas; imágenes y metadatos preservados.
- [ ] Cobertura de idiomas habilitados completa, incluidas todas las tarjetas nuevas; idiomas todavía no disponibles sin traducciones parciales.
- [ ] Rutas y registro correctos si se creó un módulo.

### Pasada 2: lingüística

- [ ] Traducciones naturales y equivalentes en las variantes regionales.
- [ ] Ortografía, capitalización, puntuación, gramática, artículos, género y plurales correctos.
- [ ] Infinitivos y construcciones pronominales naturales; sin notas de conjugación en tarjetas ordinarias.
- [ ] Alternativas completas con el separador establecido.
- [ ] Contracciones naturales, coloquialismos y abreviaturas en notas cuando corresponda; apóstrofos rectos.
- [ ] Notas en español, breves y asociadas al idioma pertinente; el campo `notes`, si se incluye, es un objeto de cadenas por idioma, no un arreglo de notas.
- [ ] Registro, intensidad y significado conservados; variantes de tratamiento ordenadas, etiquetas de registro y diferencias regionales significativas en notas.
- [ ] Falsos amigos relevantes aclarados en notas.
- [ ] Significados distintos separados y ambigüedades aclaradas mediante notas parentéticas cuando corresponda.

### Pasada 3: pedagógica

- [ ] Nivel, tema, utilidad y orden semántico coherentes, incluidas las nuevas tarjetas.
- [ ] Conceptos esenciales cubiertos sin inflar el conteo.
- [ ] Duplicados revisados; repeticiones entre módulos y niveles justificadas por autonomía temática, progresión o nuevos sentidos.
- [ ] Cambios de contenido documentados.
- [ ] Coincidencias y ambigüedades del modo práctica revisadas según PRA-01 a PRA-04.

**Criterio de cierre:** no publicar un módulo con errores conocidos sin resolver. Las dudas lingüísticas pendientes deben documentarse y verificarse; no dar por realizada una revisión que no se efectuó. La revisión es manual/editorial: esta versión no introduce pruebas automatizadas ni cambios en el pipeline.

## 13. Capitalización y puntuación

- **CAP-01 (O).** Utilizar mayúscula inicial de presentación en cada tarjeta y en cada alternativa separada por ` / `. Respetar las mayúsculas y minúsculas ortográficas propias de cada idioma en el resto del texto (por ejemplo, sustantivos alemanes, días y meses ingleses). Conservar grafías cuyo aprendizaje depende de la distinción de caja, como letras del alfabeto, símbolos y unidades (`m`, `mm`, `kg`); los números y signos no requieren capitalización.
- **CAP-02 (O).** No añadir punto final a palabras aisladas, frases nominales ni saludos breves: `Lunes`, `La casa`, `Rojo / Roja`, `Buenos días`.
- **CAP-03 (O).** Añadir punto final a las oraciones declarativas completas y a las notas redactadas como oraciones; las etiquetas y aclaraciones nominales no requieren punto final (PLU-01, POL-02 y TRA-03). Usar los signos de interrogación y exclamación y sus espacios según la ortografía del idioma: `¿Cómo estás?`, `How are you?`, `Comment vas-tu ?`.
- **CAP-04 (O).** En ejemplos dentro de notas, aplicar la ortografía natural del idioma, sin trasladar artificialmente la mayúscula inicial de presentación.

## 14. Verbos: infinitivos, reflexivos e irregulares

- **VER-01 (O).** Presentar los verbos aislados en infinitivo; en inglés incluir `To` en cada alternativa que sea un infinitivo. Ejemplo: `Comer`, `To eat`, `Manger`, `Mangiare`, `Comer`, `Essen`.
- **VER-02 (C).** Respetar las excepciones gramaticales, como los modales ingleses sin infinitivo propio: `Can / To be able to`, nunca `To can`. Las tarjetas de expresiones y oraciones mantienen la forma verbal natural del contexto.
- **VER-03 (O).** Conservar los pronombres reflexivos o pronominales cuando los requiera cada idioma, sin imponerlos por calco del español. Ejemplo: `Despertarse`, `To wake up`, `Se réveiller`, `Svegliarsi`, `Acordar / Despertar`, `Aufwachen`.
- **VER-04 (O).** No añadir notas de conjugación a las tarjetas ordinarias de vocabulario, ni siquiera para verbos irregulares. Ejemplo: `Ir` → `To go`, sin listar `went` ni `gone`. Las notas semánticas, de uso y de registro siguen permitidas conforme a las reglas generales.
- **VER-05 (C).** Reservar los paradigmas, formas irregulares y explicaciones de conjugación para la futura sección específica de verbos comunes. Su estructura y alcance se definirán al crear dicha sección; no duplicar anticipadamente ese contenido en los módulos ordinarios.

## 15. Contracciones, abreviaturas y siglas

- **CON-01 (O).** Usar contracciones habituales y naturales del idioma sin duplicar sistemáticamente la forma completa. Respetar las elisiones y contracciones gramaticalmente obligatorias: `I'm leaving`, `J'ai un problème`, `È l'una`.
- **CON-02 (C).** Usar la forma estándar en el texto principal y registrar las variantes coloquiales pertinentes en las notas del idioma correspondiente con la etiqueta `Coloquial:`. Ejemplos: `Coloquial: Gonna`, `Coloquial: Tô`, `Coloquial: Pra` Incluir una aclaración breve de contexto o registro cuando sea necesaria. No añadir variantes coloquiales indiscriminadamente. Si la propia expresión coloquial es el objeto explícito de aprendizaje, puede aparecer en el texto principal con su registro aclarado en notas.
- **CON-03 (C).** Presentar la forma completa de abreviaturas y siglas en el texto principal y consignar la abreviatura o sigla en notas, respetando su grafía convencional (por ejemplo, `Abreviatura: Dr.`, `Sigla: ASAP`). Si la abreviatura o sigla es el objeto explícito de aprendizaje, puede aparecer en el texto principal y explicarse en notas.
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
- **POL-02 (C).** Cuando el texto principal sea ambiguo, añadir una aclaración breve entre paréntesis en las notas correspondientes, sin la etiqueta «Contexto:». Para fragmentos nominales no usar punto: `(Entidad financiera)`, `(Asiento para varias personas)`. Si la aclaración parentética constituye una oración completa autónoma en español, colocar el punto después del cierre: `(Se refiere a una entidad financiera).` Véase el [DPD, «paréntesis»](https://www.rae.es/dpd/par%C3%A9ntesis).
- **POL-03 (R).** Preferir expresiones naturales que desambigüen por sí mismas, sin añadir aclaraciones redundantes: `La llave de agua`, `La llave de paso`, `La planta de interior`.
- **POL-04 (C).** Mantener la aclaración accesible en la cara de la tarjeta que presenta la ambigüedad, especialmente en la nota española cuando el término de referencia admite varios sentidos.

## 19. Formalidad y tratamiento personal

- **TRA-01 (O).** Agrupar las variantes de tratamiento de una misma intención comunicativa en una tarjeta, separadas por ` / `, primero la informal y después la formal. No repetir una traducción idéntica cuando el idioma no distinga ambos tratamientos.
- **TRA-02 (C).** Mantener tarjetas independientes cuando se enseñen expresiones inherentemente distintas por registro, no meras flexiones de tratamiento. Trasladar las aclaraciones de registro del texto principal a las notas.
- **TRA-03 (C).** Indicar registros mediante aclaraciones parentéticas breves sin punto final: `(Formal)`, `(Informal)`, `(Coloquial)`, `(Vulgar)`, `(Ofensivo)`, `(Despectivo)`. Añadir explicaciones de uso cuando sea necesario. Conservar la etiqueta `Coloquial:` para variantes alternativas según CON-02.

- **TRA-04 (O).** Respetar las convenciones culturales de tratamiento de cada variante regional; no asumir correspondencias exactas entre idiomas. Por ejemplo, `Você` es de uso cotidiano en Brasil y no equivale necesariamente al trato formal de «usted».
- **TRA-05 (C).** Mantener la variante regional establecida en IDI-01 como texto principal. Cuando otra variante presente una diferencia léxica significativa, de utilidad práctica o con riesgo de confusión, consignarla en la nota del idioma correspondiente mediante una aclaración parentética sin punto final: `(Portugal: O comboio)`, `(Reino Unido: The lift)`. No acumular diferencias regionales menores ni sustituir la variante principal.

## 20. Repeticiones entre módulos y niveles

- **REP-01 (C).** Permitir repeticiones exactas entre módulos cuando el vocabulario o la expresión sean imprescindibles para que cada módulo pueda estudiarse de manera independiente. Evitar copiar grandes bloques de contenido sin justificación.
- **REP-02 (O).** Permitir que un concepto reaparezca en niveles superiores cuando aporte progresión lingüística, mayor complejidad, matices o nuevas estructuras comunicativas. Ejemplo: `El problema` (A1) frente a `El problema radica en la falta de coordinación.` (B2).
- **REP-03 (O).** Permitir que una palabra reaparezca cuando se enseñe un significado adicional o un uso figurado distinto. Ejemplo: `Romper un vaso`, `Romper una promesa`, `Romper el hielo`.
- **REP-04 (O).** Eliminar las repeticiones que no tengan justificación temática, comunicativa, semántica o pedagógica. No repetir contenido como relleno ni establecer un porcentaje máximo fijo de duplicados: evaluar cada caso según las necesidades de los módulos.
- **REP-05 (C).** Durante la auditoría, documentar las repeticiones relevantes que se conservan y su justificación, sin eliminar automáticamente coincidencias entre módulos.

## 21. Nomenclatura e identificadores

- **NOM-01 (O).** Nombrar los nuevos archivos como `nivel_nombre_del_tema.json`, en español, minúsculas, sin acentos ni espacios y con guiones bajos entre palabras. Ejemplo: `a2_cocina_y_recetas.json`. No renombrar archivos existentes solo para uniformar su nomenclatura.
- **NOM-02 (O).** Para módulos nuevos, usar un prefijo temático único seguido de guion bajo y número consecutivo de al menos tres dígitos, por ejemplo `via_001`. En módulos existentes, respetar su convención de IDs.
- **NOM-03 (O).** Los identificadores son únicos, permanentes e independientes de la posición. No renumerarlos al reorganizar tarjetas ni reutilizar identificadores eliminados para otros conceptos.
- **NOM-04 (O).** Organizar las tarjetas semánticamente dentro del arreglo `cards`. Insertar toda tarjeta nueva en su bloque temático correspondiente, independientemente de su identificador numérico. No añadirla al final por mera conveniencia ni ordenar por ID. Ejemplo: insertar `food_6` (El melón) junto a las frutas, antes de `food_4` (La zanahoria), sin cambiar los IDs existentes.
- **NOM-05 (O).** Asignar nuevos números independientemente de la posición, comprobando que no se hayan utilizado previamente; consultar el historial cuando sea necesario. Excepción técnica: en `a1_numeros.json` los IDs `n` seguidos del valor entero (p. ej. `n21`, `n-1`) son interpretados por `src/utils/numberRanges.js` para filtrar rangos. Mantener esa correspondencia y no sustituirla por una secuencia arbitraria. No incorporar un campo de orden adicional: la posición dentro de `cards` define el orden de estudio.

## 22. Incorporación de idiomas

Esta sección documenta la estrategia existente de Fluentia; no requiere cambios funcionales ni pruebas automatizadas.

- **IDI-06 (O).** Mantener un único JSON multilingüe por módulo. Incorporar el idioma mediante su clave en `translations` y, cuando corresponda, en `notes`, sin crear archivos independientes por idioma.
- **IDI-07 (O).** Definir antes de incorporar un idioma su clave, variante regional, sistema de escritura y convenciones lingüísticas pertinentes. Documentar las reglas particulares cuando se decida incorporar ese idioma.
- **IDI-08 (O).** Incorporar nuevos idiomas progresivamente, módulo por módulo, como se hace actualmente con alemán. Traducir y revisar todas las tarjetas del módulo antes de publicar el idioma en él. No publicar traducciones parciales ni añadir una traducción provisional a la primera tarjeta. Al añadir una tarjeta a un módulo existente, completar todos los idiomas ya disponibles en ese módulo, incluido alemán cuando corresponda, antes de publicar. Para un idioma todavía no disponible, omitir su clave de traducción de todas las tarjetas publicadas hasta completar la migración; no dejar un módulo parcialmente traducido.
- **IDI-09 (O).** Preservar los identificadores, el orden semántico, las traducciones y notas de los demás idiomas y los metadatos existentes. No eliminar conceptos por dificultad de traducción. Realizar las tres pasadas de auditoría antes de publicar.
- **IDI-10 (C).** Cuando se incorpore efectivamente un idioma nuevo a la aplicación, registrar su opción en el selector de `src/App.jsx` y su configuración regional de síntesis de voz en `src/components/StudyMode.jsx` y `src/components/PracticeMode.jsx`. Esta guía no modifica dichas configuraciones actuales.

### Disponibilidad en la implementación actual

`src/App.jsx` comprueba si la primera tarjeta contiene una traducción no vacía para el idioma seleccionado:

```javascript
const languageAvailable = Boolean(
    activeModule?.cards?.[0]?.translations?.[targetLang]?.trim()
);
```

Si la primera traducción existe, la aplicación considera disponible el módulo completo; si no existe, muestra «Idioma no disponible». No comprueba individualmente todas las tarjetas. Por ello, la integridad de la traducción completa es un requisito editorial previo a publicar y no debe confundirse con una validación automática.

Los módulos que aún no se hayan migrado al alemán conservan su cobertura anterior. La migración se realizará por módulos completos, sin imponer un calendario ni alterar la arquitectura existente.

## 23. Compatibilidad con el modo práctica

El modo práctica selecciona distractores por ID, reproduce la traducción del idioma objetivo y muestra como opciones el texto español. Las notas se muestran después de acertar. Por tanto, dos tarjetas con distinto ID pueden producir respuestas indistinguibles o igualmente correctas.

- **PRA-01 (O).** Revisar coincidencias del texto español y de las traducciones completas o alternativas dentro del mismo módulo, por cada idioma disponible. Distinguir duplicados editoriales de equivalencias lingüísticas legítimas; no eliminar estas últimas automáticamente.
- **PRA-02 (R).** Preferir expresiones naturales que aporten contexto suficiente para distinguir conceptos cuando ello no cambie el objetivo de aprendizaje.
- **PRA-03 (O).** Documentar las ambigüedades legítimas que no puedan resolverse sin alterar el contenido o la lógica de práctica. No inventar diferencias de traducción ni introducir cambios funcionales para resolverlas dentro de una actualización editorial.
- **PRA-04 (C).** Para módulos destinados también a práctica, considerar que la implementación necesita al menos cuatro tarjetas con IDs distintos para generar preguntas. Este es un requisito técnico de ese modo, no una cuota editorial de tarjetas.

## 24. Mantenimiento de la guía

Actualizar este documento cuando se acuerde una nueva regla editorial. Registrar las excepciones justificadas en el cambio correspondiente. Los ejemplos son ilustrativos, no listas exhaustivas ni esquemas alternativos. Ante una incompatibilidad técnica, resolverla explícitamente antes de cambiar el formato de los JSON.

Esta guía no exige modificar retroactivamente todos los módulos en una sola intervención; debe aplicarse a los nuevos contenidos y a las revisiones de los existentes.
