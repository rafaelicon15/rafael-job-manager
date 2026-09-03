import type { Analisis, Idioma, PerfilMaestro, Vacante } from "./types";

/**
 * Serializa el perfil maestro a un bloque compacto que el modelo pueda citar.
 * Cada logro lleva su id: el modelo está obligado a devolver el id de origen
 * de cada afirmación, y la app verifica que ese id exista de verdad.
 */
export function perfilComoTexto(p: PerfilMaestro): string {
  const exp = p.experiencias
    .map((e) => {
      const periodo = [e.desde, e.hasta].filter(Boolean).join(" – ") || "(fechas sin definir)";
      const logros = e.logros
        .map(
          (l) =>
            `    - [${l.id}] ${l.texto}${l.metrica ? ` (MÉTRICA VERIFICADA: ${l.metrica})` : ""} | ángulos: ${l.angulos.join(", ")} | keywords: ${l.keywords.join(", ")}`
        )
        .join("\n");
      return `  * ${e.puesto} — ${e.empresa} (${e.ubicacion}, ${e.modalidad}) [${periodo}]\n${logros}`;
    })
    .join("\n");

  const skills = p.habilidades
    .map(
      (g) =>
        `  * ${g.categoria}: ${g.items
          .map(
            (i) =>
              `${i.nombre} (nivel ${i.nivel}/4${i.anios ? `, ${i.anios} años` : ""})`
          )
          .join("; ")}`
    )
    .join("\n");

  const certs = p.certificaciones
    .map((c) => `  * ${c.nombre} — ${c.emisor}`)
    .join("\n");

  const psico = p.psicometria
    .map(
      (r) =>
        `  * ${r.titulo} (${r.etiquetas.join(", ")}): ${r.implicaciones.join("; ")}`
    )
    .join("\n");

  return `
IDENTIDAD
  Nombre: ${p.nombre}
  Titular actual (ES): ${p.titular}
  Titular actual (EN): ${p.titularEn}
  Email: ${p.email} | Teléfono: ${p.telefono} | Ubicación: ${p.ubicacion}
  Enlaces: ${p.links.map((l) => `${l.etiqueta}: ${l.url}`).join(" | ")}

RESUMEN (ES): ${p.resumen}
RESUMEN (EN): ${p.resumenEn}

EXPERIENCIA (única fuente de verdad; cada logro tiene un id entre corchetes)
${exp}

EDUCACIÓN
${p.educacion.map((e) => `  * ${e.titulo} — ${e.institucion} — ESTADO: ${e.estado}`).join("\n")}

CERTIFICACIONES
${certs}

HABILIDADES (nivel 1=nociones, 2=funcional, 3=sólido, 4=experto)
${skills}

IDIOMAS
${p.idiomas.map((i) => `  * ${i.idioma}: ${i.nivel}`).join("\n")}

PERFIL PSICOMÉTRICO (informe Wonderlic Select, resultado real de un test)
${psico}

PREFERENCIAS
  Modalidad: ${p.preferencias.modalidad}
  Disponibilidad: ${p.preferencias.disponibilidad}
  Salario mínimo: ${p.preferencias.salarioMin || "sin definir"}
  Salario objetivo: ${p.preferencias.salarioObjetivo || "sin definir"}
  Roles objetivo: ${p.preferencias.rolesObjetivo.join(", ")}
`.trim();
}

/** Reglas que aplican a TODA generación. Esto es lo que evita que te quemes. */
export function reglasDeHonestidad(p: PerfilMaestro): string {
  return `
REGLAS INVIOLABLES
${p.lineasRojas.map((r, i) => `${i + 1}. ${r}`).join("\n")}

Cómo persuadir sin mentir:
  - Puedes reencuadrar, priorizar y reordenar hechos reales para que encajen con la vacante.
  - Puedes traducir una tarea al vocabulario del sector de la empresa.
  - Puedes inferir una capacidad adyacente SOLO si la marcas como transferible y nombras el hecho real que la sostiene.
  - NO puedes convertir "nivel 2/4" en "experto", ni "2 años" en "5 años", ni una herramienta parecida en la herramienta pedida.
  - Ante la duda entre sonar impresionante y ser exacto, elige ser exacto.
`.trim();
}

export function promptParsearVacante(textoCrudo: string): string {
  return `Eres un extractor de datos. Recibes el texto crudo de una oferta de empleo (puede venir sucio, con menús, cookies y basura de la web).

Devuelve SOLO los datos de la oferta. Si un campo no aparece en el texto, devuelve cadena vacía; NO lo inventes.
En "descripcion" reconstruye la oferta limpia y completa: misión del puesto, responsabilidades, requisitos obligatorios, requisitos deseables, condiciones y beneficios. Conserva el idioma original de la oferta.

TEXTO CRUDO:
"""
${textoCrudo.slice(0, 60000)}
"""`;
}

export function promptAnalizar(p: PerfilMaestro, v: Vacante): string {
  return `Eres un reclutador técnico veterano y a la vez el agente de carrera de ${p.nombre}. Tu trabajo es decirle la verdad, no darle ánimos.

${perfilComoTexto(p)}

${reglasDeHonestidad(p)}

VACANTE A EVALUAR
  Puesto: ${v.titulo}
  Empresa: ${v.empresa}
  Ubicación: ${v.ubicacion} | Modalidad: ${v.modalidad} | Salario: ${v.salario || "no publicado"}
  Fuente: ${v.fuente}
  Descripción:
  """
  ${v.descripcion.slice(0, 30000)}
  """

Analiza el encaje real y devuelve el JSON pedido. Instrucciones por campo:

- puntaje: 0-100. Sé severo. 90+ solo si cumple prácticamente todo lo obligatorio. Si falta un requisito excluyente (título exigido por ley, idioma que no tiene, años de experiencia en una herramienta concreta que no domina, presencialidad en otro país), el puntaje NO puede pasar de 45.
- veredicto: "aplicar_ya" (encaje fuerte, prioridad alta), "aplicar" (buen encaje, vale el esfuerzo), "dudoso" (tiro largo, solo si hay pocas opciones), "no_aplicar" (pierde el tiempo).
- razonVeredicto: 2-3 frases directas. Sin adornos.
- anguloRecomendado: qué perfil vender aquí. Uno de: "CRO y Conversión", "Automatización con IA", "Paid Media / PPC", "SEO", "Desarrollo Web / E-commerce", "Soporte TI e Infraestructura", o una combinación de dos.
- titularSugerido: el titular del CV para ESTA vacante, en el idioma de la oferta. Máx. 110 caracteres.
- requisitos: TODOS los requisitos detectables. Para cada uno di si está cubierto ("si" | "parcial" | "no"), con qué hecho concreto del perfil (cita el id del logro o la habilidad y su nivel), y cómo responder si el reclutador pregunta por él.
- fortalezas: 3-5 puntos donde es claramente más fuerte que el candidato promedio a esta vacante.
- brechas: cada carencia real con una mitigación honesta y accionable.
- keywordsATS: 12-20 términos literales de la oferta que el CV debe contener y que el perfil respalda de verdad. No incluyas keywords que obligarían a mentir.
- banderasRojas: señales de alarma de la propia oferta (salario ausente y sospechoso, "familia", pago en comisiones, requisitos absurdos para el nivel, empresa sin rastro, ofertas que huelen a estafa). Si no hay, devuelve lista vacía.
- preguntasParaElReclutador: 3-4 preguntas inteligentes que lo posicionen como profesional serio.

Responde en español, salvo titularSugerido que va en el idioma de la oferta.`;
}

export function promptCV(
  p: PerfilMaestro,
  v: Vacante,
  a: Analisis | undefined,
  idioma: Idioma
): string {
  const lang = idioma === "en" ? "inglés" : "español";
  return `Eres un redactor de CVs especializado en superar filtros ATS (Applicant Tracking Systems) sin recurrir a trucos ni a mentiras.

${perfilComoTexto(p)}

${reglasDeHonestidad(p)}

VACANTE OBJETIVO
  Puesto: ${v.titulo} — ${v.empresa}
  Descripción:
  """
  ${v.descripcion.slice(0, 30000)}
  """

${a ? `ANÁLISIS PREVIO\n  Ángulo a vender: ${a.anguloRecomendado}\n  Titular sugerido: ${a.titularSugerido}\n  Keywords ATS obligatorias: ${a.keywordsATS.join(", ")}\n  Fortalezas a destacar: ${a.fortalezas.join(" | ")}` : ""}

Construye el CV en ${lang}. Reglas de redacción:

1. Cada bullet empieza con un verbo de acción en pasado (o presente si el puesto es actual) y termina en un resultado o en el "para qué".
2. Integra las keywords ATS de forma natural dentro de los bullets. Nada de listas de keywords sueltas ni texto oculto.
3. Reordena y reescribe los logros para que los más relevantes a ESTA vacante vayan primero, dentro de cada experiencia y entre experiencias.
4. Puedes fusionar dos logros del perfil en un bullet, o partir uno en dos, pero el contenido factual debe salir del perfil.
5. Cada bullet debe declarar en "origen" el id (o los ids) del logro del perfil de donde sale. Si un bullet es puramente de contexto y no sale de un logro, pon "perfil".
6. Longitud: máximo 6 bullets en la experiencia más relevante, 2-4 en las demás. Las experiencias de TI antiguas se comprimen a 1-2 bullets salvo que la vacante sea de TI.
7. En "habilidades" incluye solo categorías relevantes a la vacante, con los items ordenados por relevancia. No listes herramientas de nivel 1-2 como si fueran fuertes.
8. En "certificaciones" incluye solo las que aporten a esta vacante (máx. 8).
9. El resumen profesional: 3-4 líneas, en primera persona implícita, cargado de las keywords principales, terminando en la propuesta de valor para esta empresa concreta.
10. "periodo" de cada experiencia: usa exactamente las fechas del perfil. Si están vacías, escribe "" y NO inventes fechas.
11. En "avisos" lista cualquier cosa que Rafael deba completar o verificar a mano antes de enviar (fechas faltantes, nivel de idioma sin definir, una keyword de la oferta que no pudiste incluir por honestidad).`;
}

export function promptRespuesta(
  p: PerfilMaestro,
  v: Vacante,
  pregunta: string,
  idioma: Idioma,
  tono: string,
  extra: string
): string {
  const lang = idioma === "en" ? "inglés" : "español";
  return `Responde EN PRIMERA PERSONA COMO SI FUERAS ${p.nombre}. No hables de él en tercera persona, no digas "el candidato". Eres él escribiendo.

${perfilComoTexto(p)}

${reglasDeHonestidad(p)}

CONTEXTO DE LA VACANTE
  Puesto: ${v.titulo} — ${v.empresa}
  Modalidad: ${v.modalidad} | Ubicación: ${v.ubicacion}
  Descripción:
  """
  ${v.descripcion.slice(0, 20000)}
  """
${v.analisis ? `  Ángulo a vender: ${v.analisis.anguloRecomendado}\n  Brechas conocidas: ${v.analisis.brechas.map((b) => b.brecha).join("; ")}` : ""}

PREGUNTA DEL RECLUTADOR O DEL FORMULARIO:
"""
${pregunta}
"""
${extra ? `\nCONTEXTO ADICIONAL QUE APORTA RAFAEL:\n"""\n${extra}\n"""` : ""}

Cómo debes sonar (basado en su perfil Wonderlic real): directo y al grano, seguro sin arrogancia, persuasivo, orientado a resultados y a rentabilidad. Nada de relleno corporativo ni de "soy un apasionado de".

Reglas de la respuesta:
- Idioma: ${lang}.
- Tono: ${tono}.
- Longitud: la mínima que responda bien. Si es una pregunta de formulario, 2-5 frases. Si es una pregunta abierta de entrevista, usa estructura situación-acción-resultado sin nombrar el método.
- Apóyate en hechos concretos del perfil. Nombra herramientas, métricas y empresas reales.
- Si la pregunta toca una brecha real, reconócela en una frase corta y pivota de inmediato a lo que sí tiene y a cómo lo cubriría. No la escondas.
- Si la pregunta pide un dato que no está en el perfil (salario exacto, nivel de inglés, fechas), NO lo inventes: usa un marcador tipo [COMPLETAR: expectativa salarial] y menciónalo en "avisos".
- Devuelve además 2 variantes más cortas por si el formulario tiene límite de caracteres.`;
}

export function promptTriaje(p: PerfilMaestro, lote: { id: string; titulo: string; empresa: string; extracto: string }[]): string {
  return `Eres el filtro de entrada del buscador de empleo de ${p.nombre}. Tienes que descartar rápido y sin piedad.

PERFIL RESUMIDO
  Titular: ${p.titular}
  Roles objetivo: ${p.preferencias.rolesObjetivo.join(", ")}
  Fuerte en: ${p.habilidades.flatMap((g) => g.items.filter((i) => i.nivel >= 3).map((i) => i.nombre)).join(", ")}
  Modalidad requerida: ${p.preferencias.modalidad}
  Idiomas: ${p.idiomas.map((i) => `${i.idioma} (${i.nivel})`).join(", ")}

Para cada vacante del lote devuelve un puntaje 0-100 y un motivo de máximo 12 palabras.
Penaliza duro: puestos presenciales fuera de Venezuela, roles senior de ingeniería de software pura, roles que exigen inglés nativo o un título universitario finalizado, y ofertas fuera de su especialidad.

LOTE:
${lote.map((j) => `[${j.id}] ${j.titulo} — ${j.empresa}\n${j.extracto.slice(0, 900)}`).join("\n\n---\n\n")}`;
}
