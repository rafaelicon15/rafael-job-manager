"use client";

import { GoogleGenAI, Type } from "@google/genai";
import type {
  Analisis,
  Conversacion,
  Idioma,
  Incoherencia,
  PerfilMaestro,
  Vacante,
} from "./types";
import {
  promptAnalizar,
  promptCV,
  promptParsearVacante,
  promptRespuesta,
  promptTriaje,
  promptParsearConversacion,
  promptHilo,
} from "./prompts";

export const MODELOS = [
  { id: "gemini-flash-latest", label: "Gemini Flash (recomendado)" },
  { id: "gemini-flash-lite-latest", label: "Gemini Flash Lite (más barato)" },
  { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash (versión fija)" },
  { id: "gemini-pro-latest", label: "Gemini Pro (más potente, gasta más cuota)" },
];

export class ErrorGemini extends Error {
  constructor(mensaje: string, readonly causa?: unknown) {
    super(mensaje);
    this.name = "ErrorGemini";
  }
}

function cliente(apiKey: string) {
  if (!apiKey.trim()) {
    throw new ErrorGemini(
      "Falta tu API key de Gemini. Ve a Ajustes y pégala para activar el motor."
    );
  }
  return new GoogleGenAI({ apiKey: apiKey.trim() });
}

/** Traduce los errores crudos de la API a algo accionable. */
function traducirError(e: unknown): ErrorGemini {
  const msg = e instanceof Error ? e.message : String(e);
  if (/API key not valid|API_KEY_INVALID|400.*key/i.test(msg))
    return new ErrorGemini("Tu API key de Gemini no es válida. Revísala en Ajustes.");
  if (/429|RESOURCE_EXHAUSTED|quota/i.test(msg))
    return new ErrorGemini(
      "Alcanzaste el límite de cuota de Gemini. Espera unos minutos o cambia a un modelo más ligero en Ajustes."
    );
  if (/503|UNAVAILABLE|overloaded/i.test(msg))
    return new ErrorGemini("Gemini está saturado ahora mismo. Reintenta en un momento.");
  if (/SAFETY|blocked/i.test(msg))
    return new ErrorGemini("Gemini bloqueó la respuesta por filtros de seguridad. Prueba a reformular el texto de entrada.");
  return new ErrorGemini(`Fallo al llamar a Gemini: ${msg}`, e);
}

async function generarJSON<T>(
  apiKey: string,
  modelo: string,
  prompt: string,
  schema: object
): Promise<T> {
  try {
    const ai = cliente(apiKey);
    const res = await ai.models.generateContent({
      model: modelo,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.4,
      },
    });
    const texto = res.text;
    if (!texto) throw new ErrorGemini("Gemini devolvió una respuesta vacía.");
    return JSON.parse(texto) as T;
  } catch (e) {
    if (e instanceof ErrorGemini) throw e;
    if (e instanceof SyntaxError)
      throw new ErrorGemini("Gemini devolvió un JSON malformado. Reintenta.");
    throw traducirError(e);
  }
}

// ---------------------------------------------------------------- esquemas

const S = Type;
const listaTexto = { type: S.ARRAY, items: { type: S.STRING } };

const esquemaVacante = {
  type: S.OBJECT,
  properties: {
    titulo: { type: S.STRING },
    empresa: { type: S.STRING },
    ubicacion: { type: S.STRING },
    modalidad: { type: S.STRING, description: "Remoto, Híbrido, Presencial o vacío" },
    salario: { type: S.STRING },
    descripcion: { type: S.STRING },
  },
  required: ["titulo", "empresa", "descripcion"],
};

const esquemaAnalisis = {
  type: S.OBJECT,
  properties: {
    puntaje: { type: S.INTEGER },
    veredicto: {
      type: S.STRING,
      enum: ["aplicar_ya", "aplicar", "dudoso", "no_aplicar"],
    },
    razonVeredicto: { type: S.STRING },
    anguloRecomendado: { type: S.STRING },
    titularSugerido: { type: S.STRING },
    requisitos: {
      type: S.ARRAY,
      items: {
        type: S.OBJECT,
        properties: {
          requisito: { type: S.STRING },
          cubierto: { type: S.STRING, enum: ["si", "parcial", "no"] },
          evidencia: { type: S.STRING },
          comoResponder: { type: S.STRING },
        },
        required: ["requisito", "cubierto", "evidencia"],
      },
    },
    fortalezas: listaTexto,
    brechas: {
      type: S.ARRAY,
      items: {
        type: S.OBJECT,
        properties: {
          brecha: { type: S.STRING },
          mitigacion: { type: S.STRING },
        },
        required: ["brecha", "mitigacion"],
      },
    },
    keywordsATS: listaTexto,
    banderasRojas: listaTexto,
    preguntasParaElReclutador: listaTexto,
  },
  required: [
    "puntaje",
    "veredicto",
    "razonVeredicto",
    "anguloRecomendado",
    "titularSugerido",
    "requisitos",
    "fortalezas",
    "brechas",
    "keywordsATS",
    "banderasRojas",
    "preguntasParaElReclutador",
  ],
};

const esquemaCV = {
  type: S.OBJECT,
  properties: {
    titular: { type: S.STRING },
    resumen: { type: S.STRING },
    experiencias: {
      type: S.ARRAY,
      items: {
        type: S.OBJECT,
        properties: {
          puesto: { type: S.STRING },
          empresa: { type: S.STRING },
          ubicacion: { type: S.STRING },
          periodo: { type: S.STRING },
          bullets: {
            type: S.ARRAY,
            items: {
              type: S.OBJECT,
              properties: {
                texto: { type: S.STRING },
                origen: { type: S.STRING },
              },
              required: ["texto", "origen"],
            },
          },
        },
        required: ["puesto", "empresa", "periodo", "bullets"],
      },
    },
    habilidades: {
      type: S.ARRAY,
      items: {
        type: S.OBJECT,
        properties: {
          categoria: { type: S.STRING },
          items: listaTexto,
        },
        required: ["categoria", "items"],
      },
    },
    certificaciones: listaTexto,
    educacion: listaTexto,
    idiomas: listaTexto,
    avisos: listaTexto,
  },
  required: [
    "titular",
    "resumen",
    "experiencias",
    "habilidades",
    "certificaciones",
    "educacion",
    "idiomas",
    "avisos",
  ],
};

const esquemaRespuesta = {
  type: S.OBJECT,
  properties: {
    respuesta: { type: S.STRING },
    variantes: listaTexto,
    avisos: listaTexto,
  },
  required: ["respuesta", "variantes", "avisos"],
};

const esquemaTriaje = {
  type: S.OBJECT,
  properties: {
    resultados: {
      type: S.ARRAY,
      items: {
        type: S.OBJECT,
        properties: {
          id: { type: S.STRING },
          puntaje: { type: S.INTEGER },
          motivo: { type: S.STRING },
        },
        required: ["id", "puntaje", "motivo"],
      },
    },
  },
  required: ["resultados"],
};

// ------------------------------------------------------------------- tipos

export interface CVGenerado {
  titular: string;
  resumen: string;
  experiencias: {
    puesto: string;
    empresa: string;
    ubicacion?: string;
    periodo: string;
    bullets: { texto: string; origen: string }[];
  }[];
  habilidades: { categoria: string; items: string[] }[];
  certificaciones: string[];
  educacion: string[];
  idiomas: string[];
  avisos: string[];
}

export interface RespuestaGenerada {
  respuesta: string;
  variantes: string[];
  avisos: string[];
}

export interface VacanteParseada {
  titulo: string;
  empresa: string;
  ubicacion?: string;
  modalidad?: string;
  salario?: string;
  descripcion: string;
}

// --------------------------------------------------------------- funciones

export function parsearVacante(
  apiKey: string,
  modelo: string,
  textoCrudo: string
) {
  return generarJSON<VacanteParseada>(
    apiKey,
    modelo,
    promptParsearVacante(textoCrudo),
    esquemaVacante
  );
}

export async function analizarVacante(
  apiKey: string,
  modelo: string,
  perfil: PerfilMaestro,
  vacante: Vacante
): Promise<Analisis> {
  const bruto = await generarJSON<Omit<Analisis, "generadoEn" | "modelo">>(
    apiKey,
    modelo,
    promptAnalizar(perfil, vacante),
    esquemaAnalisis
  );
  return {
    ...bruto,
    puntaje: Math.max(0, Math.min(100, Math.round(bruto.puntaje))),
    generadoEn: new Date().toISOString(),
    modelo,
  };
}

/**
 * Genera el CV y verifica que cada bullet cite un id de logro que exista.
 * Los bullets con origen inventado se marcan como aviso en lugar de colarse.
 */
export async function generarCV(
  apiKey: string,
  modelo: string,
  perfil: PerfilMaestro,
  vacante: Vacante,
  idioma: Idioma
): Promise<CVGenerado> {
  const cv = await generarJSON<CVGenerado>(
    apiKey,
    modelo,
    promptCV(perfil, vacante, vacante.analisis, idioma),
    esquemaCV
  );
  const idsValidos = new Set(
    perfil.experiencias.flatMap((e) => e.logros.map((l) => l.id))
  );
  const huerfanos: string[] = [];
  for (const exp of cv.experiencias) {
    for (const b of exp.bullets) {
      const ids = b.origen.split(/[,\s]+/).filter(Boolean);
      const desconocidos = ids.filter(
        (id) => id !== "perfil" && !idsValidos.has(id)
      );
      if (desconocidos.length) huerfanos.push(`"${b.texto.slice(0, 70)}…"`);
    }
  }
  if (huerfanos.length) {
    cv.avisos = [
      `Verifica a mano estos bullets: el motor no pudo rastrearlos a un logro registrado de tu perfil — ${huerfanos.join(", ")}`,
      ...cv.avisos,
    ];
  }
  return cv;
}

export function generarRespuesta(
  apiKey: string,
  modelo: string,
  perfil: PerfilMaestro,
  vacante: Vacante,
  pregunta: string,
  idioma: Idioma,
  tono: string,
  extra: string
) {
  return generarJSON<RespuestaGenerada>(
    apiKey,
    modelo,
    promptRespuesta(perfil, vacante, pregunta, idioma, tono, extra),
    esquemaRespuesta
  );
}

export async function triarLote(
  apiKey: string,
  modelo: string,
  perfil: PerfilMaestro,
  lote: { id: string; titulo: string; empresa: string; extracto: string }[]
) {
  const r = await generarJSON<{
    resultados: { id: string; puntaje: number; motivo: string }[];
  }>(apiKey, modelo, promptTriaje(perfil, lote), esquemaTriaje);
  return r.resultados;
}

// ------------------------------------------------------- conversaciones

const esquemaConversacion = {
  type: S.OBJECT,
  properties: {
    asunto: { type: S.STRING },
    contacto: {
      type: S.OBJECT,
      properties: {
        nombre: { type: S.STRING },
        cargo: { type: S.STRING },
        empresa: { type: S.STRING },
        handle: { type: S.STRING },
      },
      required: ["nombre"],
    },
    mensajes: {
      type: S.ARRAY,
      items: {
        type: S.OBJECT,
        properties: {
          de: { type: S.STRING, enum: ["ellos", "yo"] },
          texto: { type: S.STRING },
          fecha: { type: S.STRING },
        },
        required: ["de", "texto", "fecha"],
      },
    },
    contieneOferta: { type: S.BOOLEAN },
    ofertaDetectada: {
      type: S.OBJECT,
      properties: {
        titulo: { type: S.STRING },
        empresa: { type: S.STRING },
        ubicacion: { type: S.STRING },
        modalidad: { type: S.STRING },
        salario: { type: S.STRING },
        descripcion: { type: S.STRING },
      },
      required: ["titulo", "empresa", "descripcion"],
    },
  },
  required: ["asunto", "contacto", "mensajes", "contieneOferta", "ofertaDetectada"],
};

const esquemaHilo = {
  type: S.OBJECT,
  properties: {
    respuesta: { type: S.STRING },
    asunto: { type: S.STRING },
    variantes: listaTexto,
    pendientes: listaTexto,
    preguntasSinResponder: listaTexto,
    incoherencias: {
      type: S.ARRAY,
      items: {
        type: S.OBJECT,
        properties: {
          afirmacion: { type: S.STRING },
          problema: { type: S.STRING },
          comoCorregir: { type: S.STRING },
        },
        required: ["afirmacion", "problema", "comoCorregir"],
      },
    },
    avisos: listaTexto,
  },
  required: [
    "respuesta",
    "asunto",
    "variantes",
    "pendientes",
    "preguntasSinResponder",
    "incoherencias",
    "avisos",
  ],
};

export interface ConversacionParseada {
  asunto: string;
  contacto: { nombre: string; cargo?: string; empresa?: string; handle?: string };
  mensajes: { de: "ellos" | "yo"; texto: string; fecha: string }[];
  contieneOferta: boolean;
  ofertaDetectada: VacanteParseada & {
    ubicacion?: string;
    modalidad?: string;
    salario?: string;
  };
}

export interface RespuestaHilo {
  respuesta: string;
  asunto: string;
  variantes: string[];
  pendientes: string[];
  preguntasSinResponder: string[];
  incoherencias: Incoherencia[];
  avisos: string[];
}

export function parsearConversacion(
  apiKey: string,
  modelo: string,
  textoCrudo: string,
  canal: string
) {
  return generarJSON<ConversacionParseada>(
    apiKey,
    modelo,
    promptParsearConversacion(textoCrudo, canal),
    esquemaConversacion
  );
}

export function redactarEnHilo(
  apiKey: string,
  modelo: string,
  perfil: PerfilMaestro,
  conversacion: Conversacion,
  vacante: Vacante | undefined,
  instrucciones: string,
  idioma: Idioma,
  tono: string
) {
  const contacto = [
    conversacion.contacto.nombre,
    conversacion.contacto.cargo,
    conversacion.contacto.empresa,
  ]
    .filter(Boolean)
    .join(" — ");
  return generarJSON<RespuestaHilo>(
    apiKey,
    modelo,
    promptHilo(
      perfil,
      conversacion.canal,
      contacto || "Reclutador",
      // Los borradores sin enviar no son parte del hilo real.
      conversacion.mensajes
        .filter((m) => !m.borrador)
        .map((m) => ({ de: m.de, texto: m.texto, fecha: m.fecha })),
      vacante,
      instrucciones,
      idioma,
      tono
    ),
    esquemaHilo
  );
}
