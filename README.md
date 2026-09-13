# Job Manager — Rafael Licón

Panel personal para **buscar, evaluar y ganar vacantes**. No es un tablero de
notas: es un analizador que cruza cada oferta contra un perfil maestro
verificable, genera un CV adaptado que atraviesa filtros ATS y redacta las
respuestas al reclutador en primera persona.

Guía de puesta en marcha paso a paso: **[DESPLIEGUE.md](DESPLIEGUE.md)**.

El motor es **Google Gemini**. Los datos viven en el navegador. Nada se guarda
en ningún servidor.

---

## Qué hace

| Módulo | Para qué sirve |
|---|---|
| **Panel** | Embudo de postulaciones, tasa de respuesta y seguimientos vencidos. |
| **Buscar vacantes** | Consulta 8 agregadores en paralelo y puntúa el encaje de cada oferta con IA antes de que pierdas tiempo leyendo. |
| **Ficha de vacante** | Análisis de encaje requisito por requisito, brechas con mitigación, keywords ATS, banderas rojas de la oferta y preguntas para el reclutador. |
| **CV a medida** | Reescribe y reordena tus logros reales para esa oferta y exporta un PDF ATS-friendly en español o inglés. |
| **Carta y mensaje** | Carta de presentación, línea de asunto y mensaje corto de LinkedIn para el reclutador, atando cada requisito a un hecho verificable. |
| **Respuestas** | Cualquier pregunta de formulario o de reclutador, respondida como tú, con variantes cortas para campos con límite de caracteres. |
| **Entrevista** | Guion para esa entrevista concreta: estrategia, datos a memorizar, preguntas probables con respuesta, y sobre todo las **preguntas incómodas** — requisitos que no cumples, solapamientos de fechas, título pendiente y salario. |
| **Conversaciones** | Las vacantes que llegan por mensaje. Pega el hilo de LinkedIn, correo o WhatsApp, enlázalo con una vacante y responde desde ahí. Detecta lo que te pidieron y no has hecho, las preguntas tuyas que esquivaron, y las afirmaciones del hilo que tu perfil no respalda. |
| **Perfil maestro** | La única fuente de verdad. Si un hecho no está aquí, el motor no puede afirmarlo. |
| **Extensión de Chrome** | Captura la oferta que tienes abierta en LinkedIn, Computrabajo, InfoJobs o Indeed y la manda al panel con un clic. |

### Cómo evita que te quemes en una entrevista

El sistema está diseñado para ser **persuasivo sin mentir**:

- El perfil maestro define **líneas rojas** que se inyectan en cada prompt
  (no inventar empleadores, fechas, métricas, niveles de idioma ni herramientas).
- Cada logro tiene un **id**. El motor debe declarar de qué id sale cada bullet
  del CV, y la app **verifica que ese id exista**: si cita uno inventado, el
  bullet se marca con un aviso en lugar de colarse en el PDF.
- Las habilidades llevan **nivel 1-4**. Lo que marcas como 2 no se vende como
  experiencia experta.
- Cuando falta un dato (tu nivel de inglés, una expectativa salarial), el motor
  deja un marcador `[COMPLETAR: …]` en vez de improvisar.
- En **Conversaciones** revisa lo que tú mismo escribiste en el hilo y marca en
  rojo cualquier cosa que hayas afirmado y el perfil no sostenga, con la
  reformulación honesta lista para la entrevista.

---

## Puesta en marcha

### 1. API key de Gemini (obligatoria)

Genera una gratis en [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
y pégala en **Ajustes**. Se guarda solo en tu navegador.

> **Dónde vive la clave.** Se guarda en el `localStorage` de tu navegador, no en
> el repositorio ni en variables de entorno. Las llamadas no van del navegador a
> Google: pasan por `/api/gemini`, la ruta del propio proyecto, que las emite
> desde el servidor (ver más abajo por qué). La clave viaja en el cuerpo de esa
> petición, se usa para esa llamada y no se guarda ni se registra en el
> servidor. Aun así, ponle un límite de cuota desde Google Cloud: sigue siendo
> legible para quien abra la consola en tu equipo.

### 2. Fuentes de vacantes (opcional pero recomendable)

Cinco fuentes funcionan sin configurar nada: Remotive, RemoteOK, Arbeitnow,
Jobicy y WeWorkRemotely. Son casi todo remoto global en inglés.

Para vacantes en español y ofertas no remotas, añade en **Ajustes**:

- **Adzuna** — [developer.adzuna.com/signup](https://developer.adzuna.com/signup).
  Gratis, sin tarjeta. Cubre España, EE. UU., Reino Unido, México y más.
- **Jooble** — [jooble.org/api/about](https://jooble.org/api/about).
  Cubre Venezuela y LatAm.
- **Careerjet** — [careerjet.com/partners/api](https://www.careerjet.com/partners/api).
  Gratuita, 1.000 peticiones/hora. Venezuela, España y LatAm.

### 3. Extensión de Chrome

1. Abre `chrome://extensions` y activa **Modo de desarrollador**.
2. Pulsa **Cargar descomprimida** y elige la carpeta `extension/`.
3. Abre el popup de la extensión, pega la URL de tu panel y pulsa **Guardar URL**.

Con eso, estando en cualquier oferta, un clic en **Capturar esta vacante** abre
la ficha ya rellenada.

La extensión **no inicia sesión ni postula por ti**: solo lee el texto de la
pestaña que tú ya tienes abierta. Nada que viole los términos de servicio de
LinkedIn o Computrabajo, y cero riesgo de que te baneen la cuenta.

---

## Desarrollo local

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>.

```bash
npm run build   # build de producción
```

---

## Arquitectura

```
app/
  page.tsx              Panel con KPIs y embudo
  buscar/               Agregador de vacantes + triaje con IA
  vacantes/             Lista y tablero de postulaciones
  vacantes/[id]/        Ficha: análisis, CV, respuestas, oferta, notas
  conversaciones/       Bandeja de hilos con reclutadores
  conversaciones/[id]/  Hilo: mensajes, vacante enlazada, redacción de respuesta
  asistente/            Respuestas y mensajes sin vacante asociada
  perfil/               Editor del perfil maestro
  ajustes/              Claves, modelo, respaldos
  capture/              Recibe las ofertas de la extensión
  api/jobs/             Proxy servidor -> 8 agregadores (evita CORS)
  api/extraer/          Descarga una URL de oferta y la pasa a texto plano
  api/gemini/           Proxy a Gemini: evita la restricción geográfica
lib/
  types.ts              Modelo de datos
  seed.ts               Perfil maestro precargado
  store.ts              Estado en localStorage + respaldos
  gemini.ts             Cliente de Gemini con salida estructurada
  prompts.ts            Prompts y reglas de honestidad
  pdf.ts                Generador de PDF ATS-friendly
extension/              Extensión de Chrome (MV3)
```

### Por qué el PDF es así

Los ATS leen la **capa de texto** del PDF. Un CV bonito exportado como imagen
(lo que produce `html2canvas` y compañía) llega al reclutador como una página en
blanco. Por eso el generador usa jsPDF escribiendo texto real, una sola columna,
fuente estándar, sin tablas, sin cajas de texto y sin encabezados ni pies.

### Cómo la app cuenta lo que está haciendo

Los tres estados básicos están en `components/ui.tsx` y se usan en toda la app:
`Cargando` (carga), `Alerta` (errores y avisos, en cuatro variantes) y `Vacio`
(estado vacío con acción sugerida). Encima de eso:

- **`AvisosMotor`** se monta una vez en el layout y escucha los eventos del
  motor, así que los fallos se ven aunque hayas hecho scroll o estés en otra
  pestaña de la ficha. Lo importante son los **reintentos**: en el plan gratuito
  de Gemini pueden sumar 45 segundos y sin aviso parece que la app se colgó.
  El toast dice el motivo, el intento y la cuenta atrás.
- **`app/error.tsx`** y **`app/global-error.tsx`** capturan cualquier excepción
  y ofrecen reintentar, en vez de dejar la pantalla de error genérica de Next.
- **`app/not-found.tsx`** para enlaces rotos a vacantes ya eliminadas.
- El triaje por lotes muestra **barra de progreso** ("Evaluando 30 de 60"),
  porque son varias llamadas seguidas que pueden tardar minutos.

### Por qué Gemini se llama desde el servidor

La API de Gemini está restringida geográficamente y responde
`FAILED_PRECONDITION: User location is not supported` a las peticiones que
salen de países no soportados, Venezuela entre ellos. Si el navegador llamara
a Google directamente, la petición saldría desde la IP del usuario y sería
rechazada. Por eso todas las llamadas pasan por `/api/gemini`, que las emite
desde los servidores de Vercel. La clave sigue viviendo en el navegador: viaja
en el cuerpo de la petición, se usa para esa llamada y no se guarda ni se
registra en el servidor.

Ojo: esto resuelve el bloqueo por IP, pero no el que va asociado al proyecto de
Google donde se creó la clave. Ese se arregla creando la clave en otro proyecto.

### Fiabilidad del motor

El plan gratuito de Gemini es inestable con prompts grandes, que son justo los
de esta app (perfil completo + oferta + hilo). Medido contra la API real:
`gemini-flash-latest` devolvía 503 en 2-3 de cada 3 intentos con cualquier
tamaño de prompt, mientras que `gemini-flash-lite-latest` respondió 6 de 6,
también con 36 KB. Por eso Flash Lite es el modelo por defecto, cada llamada
reintenta con espera creciente (distinguiendo saturación, límite por minuto y
cuota diaria agotada) y, si el modelo elegido no responde, se cae a Flash Lite
antes de rendirse.

### Dónde viven los datos

Todo en `localStorage`, bajo la clave `rjm:estado:v1`. Consecuencia directa:
**si limpias la caché del navegador, pierdes el historial.** Ajustes incluye
exportar e importar un `.json`, y el panel te avisa si llevas más de una semana
sin respaldar.

---

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Google Gemini
(`@google/genai`) · jsPDF · lucide-react

## Pruebas

```bash
npm test
```

70 pruebas sobre los módulos que deciden algo: deduplicación de tareas y de
vacantes, validación del perfil pegado, lectura de .docx y PDF, las reglas de
los prompts, el autorrelleno de formularios (en un DOM simulado) y el viaje de
datos entre la extensión y la app.

Las del autorrelleno son las que más importan: comprueban que no toca
contraseñas ni documentos de identidad, que no marca casillas, que no
sobrescribe lo ya escrito y que no mete un dato en el campo equivocado.
