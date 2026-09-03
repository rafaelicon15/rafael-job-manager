# Guía de despliegue y puesta en marcha

Todo bajo la cuenta **rafaelicon15@gmail.com**.
Sigue los pasos en orden. Tiempo total: unos 15 minutos.

**Estado actual:**

- Código subido a GitHub: <https://github.com/rafaelicon15/rafael-job-manager> (privado)
- Rama de producción: `main`
- Autoría de los commits: `rafaelicon15 <rafaelicon15@gmail.com>`
- Falta: desplegar en Vercel, sacar la API key de Gemini e instalar la extensión

---

## Paso 1 — Desplegar en Vercel

> **Importante.** Tu cuenta actual de Vercel (`rafaellicon-7790's projects`) está
> conectada a **otra** cuenta de GitHub, llamada `rafaellicon`, no a
> `rafaelicon15`. Por eso Vercel no encuentra este repositorio. Tienes dos
> caminos; **el 1A es el que te recomiendo.**

### Opción 1A — Dar acceso a tu Vercel actual (recomendado)

1. Entra en <https://github.com/apps/vercel/installations/new>
2. Si te pregunta con qué cuenta continuar, elige **rafaelicon15**.
3. En "Repository access" marca **Only select repositories**.
4. En el desplegable elige **rafael-job-manager** y pulsa **Install** / **Save**.
5. Ve a <https://vercel.com/new>.
6. Debería aparecer ahora `rafaelicon15/rafael-job-manager`. Pulsa **Import**.
   - Si no aparece, pulsa **Adjust GitHub App Permissions** y repite el paso 3.
7. En la pantalla de configuración **no cambies nada**:
   - Framework Preset: `Next.js` (lo detecta solo)
   - Root Directory: `./`
   - Build Command / Output Directory / Install Command: déjalos por defecto
   - Environment Variables: **ninguna**. La app no usa variables de entorno;
     tus claves se guardan en tu navegador.
8. Pulsa **Deploy** y espera 2-3 minutos.
9. Al terminar te da una URL tipo `https://rafael-job-manager.vercel.app`.
   **Guárdala**: la vas a necesitar en el paso 3.

### Opción 1B — Cuenta de Vercel nueva con tu correo personal

Si prefieres que Vercel también quede bajo `rafaelicon15@gmail.com`:

1. Cierra sesión en Vercel.
2. Entra en <https://vercel.com/signup> y elige **Continue with GitHub**,
   iniciando sesión con la cuenta **rafaelicon15**.
3. Vercel te pedirá permiso para acceder a tus repositorios: concédelo.
4. Sigue desde el paso 5 de la opción 1A.

### Después del despliegue

Cada vez que hagas `git push` a la rama `main`, Vercel vuelve a desplegar solo.
No hay que hacer nada más.

---

## Paso 2 — Activar el motor de IA (obligatorio)

Sin esto la app abre y guarda vacantes, pero no analiza ni genera CVs.

1. Entra en <https://aistudio.google.com/apikey> con **rafaelicon15@gmail.com**.
2. Pulsa **Create API key** → elige o crea un proyecto → copia la clave
   (empieza por `AIza…`).
3. Abre tu app en Vercel → **Ajustes** → pega la clave en
   *API key de Google AI Studio*. Se guarda sola.
4. Vuelve al **Panel**: el aviso amarillo "Motor apagado" debe desaparecer.

### Ponle un límite de gasto a la clave (5 minutos, hazlo)

La clave se usa desde tu navegador, así que conviene limitarla:

1. Entra en <https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas>
   con la misma cuenta y selecciona el proyecto de la clave.
2. Busca la cuota de peticiones por minuto y por día y bájala a un número
   razonable (por ejemplo 60/min y 1.000/día).

Así, si alguien alguna vez te copiara la clave, no puede dispararte la factura.

---

## Paso 3 — Instalar la extensión de Chrome

Es lo que te deja capturar ofertas de LinkedIn, Computrabajo, InfoJobs o Indeed
con un clic.

1. Descarga o clona el repositorio en tu PC. Si ya lo tienes en
   `C:\Users\rafae\Documentos\Rafael\job-manager`, sáltate esto.
2. Abre Chrome y ve a `chrome://extensions`.
3. Arriba a la derecha, activa **Modo de desarrollador**.
4. Pulsa **Cargar descomprimida** (*Load unpacked*).
5. Selecciona la carpeta:
   `C:\Users\rafae\Documentos\Rafael\job-manager\extension`
6. Aparece la extensión "Job Manager — Capturar vacante". Fíjala a la barra
   con el icono del puzle 📌.
7. Pulsa el icono de la extensión. En **URL de tu Job Manager** pega la URL de
   Vercel del paso 1 (por ejemplo `https://rafael-job-manager.vercel.app`) y
   pulsa **Guardar URL**.

### Cómo se usa

1. Abre cualquier oferta en LinkedIn, Computrabajo, InfoJobs, Indeed…
2. Pulsa el icono de la extensión → **Capturar esta vacante**.
3. Se abre tu panel con la oferta ya cargada. Pulsa **Crear ficha**.

La extensión **solo lee el texto de la pestaña que tú ya tienes abierta**. No
inicia sesión, no navega y no postula por ti: por eso no viola los términos de
servicio de ningún portal y tu cuenta de LinkedIn no corre riesgo.

---

## Paso 4 — Fuentes de vacantes en español (opcional, muy recomendable)

Cinco fuentes ya funcionan sin configurar nada (Remotive, RemoteOK, Arbeitnow,
Jobicy, WeWorkRemotely), pero son casi todo remoto global en inglés.

### Adzuna — España, EE. UU., Reino Unido, México y más

1. Entra en <https://developer.adzuna.com/signup>.
2. Regístrate con `rafaelicon15@gmail.com`. No pide tarjeta.
3. Te muestran un **App ID** y un **App Key**.
4. Pégalos en **Ajustes** de tu app, en los campos correspondientes.

### Jooble — Venezuela y LatAm

1. Entra en <https://jooble.org/api/about>.
2. Solicita la API key con `rafaelicon15@gmail.com` (te llega por correo).
3. Pégala en **Ajustes** → *Jooble API key*.

Cuando estén puestas, en **Buscar vacantes** verás que los botones "Adzuna" y
"Jooble" dejan de tener la llave 🔑 y pasan a azul.

---

## Paso 5 — Completa tu perfil maestro

Ve a **Perfil maestro**. Arriba te sale un aviso amarillo con lo que falta.
Hay tres cosas que debes rellenar sí o sí, porque el motor tiene **prohibido
inventarlas**:

1. **Fechas de cada experiencia.** Ahora están vacías. Sin ellas, el CV sale sin
   periodos y eso lo penaliza cualquier ATS. Formato: `Ene 2023` / `Actualidad`.
2. **Tu nivel real de inglés.** Ahora dice "Pendiente de definir". Como buscas
   remoto worldwide, esto sale en casi todas las entrevistas. Pon lo que puedas
   sostener en una llamada: `B1 conversacional`, `B2 profesional`, etc.
3. **Tu expectativa salarial** (mínimo y objetivo). Sin esto, cada vez que un
   formulario te pregunte por el sueldo el motor te dejará un
   `[COMPLETAR: expectativa salarial]` en lugar de responder.

Cuando los tengas, el aviso amarillo desaparece.

---

## Paso 6 — Rutina de uso

1. **Buscar** → escribe una keyword o toca una de las tuyas → **Buscar** →
   **Puntuar encaje con IA** → filtra por *Solo encaje ≥ 60* → **Guardar** las
   que valgan la pena.
2. En la ficha de cada vacante:
   - **Análisis** → mira el veredicto, las brechas y las banderas rojas.
     Si dice "No apliques", hazle caso y ahórrate el rato.
   - **CV a medida** → genera, revisa los avisos, **Descargar PDF**.
   - **Respuestas** → pega cada pregunta del formulario y copia la respuesta.
3. Postula en el portal y cambia el estado a **Postulada**. El sistema te crea
   solo un seguimiento a 6 días, que verás en el Panel.

Cuando la vacante llega por **mensaje** en vez de por portal:

1. **Conversaciones → Nueva conversación** → elige el canal (LinkedIn, correo,
   WhatsApp) y pega el hilo entero, sucio, tal como está.
2. El motor separa quién dijo qué, identifica al reclutador y, si el mensaje
   trae la oferta descrita, **registra la vacante y la enlaza sola**.
3. En el hilo revisa los tres avisos antes de responder:
   - **Afirmaciones que tu perfil no respalda** (rojo): lo que dijiste y no
     puedes sostener. Añádelo al perfil si es cierto, o usa la reformulación
     que te propone.
   - **Te lo pidieron y falta hacerlo**: la lista de lo que esperan de ti.
   - **Preguntas tuyas que esquivaron**: vuelve a plantearlas antes de invertir
     más tiempo en el proceso.
4. **Redactar como yo** → copia → envía → **Marcar como enviada** para que
   quede en el hilo.
4. **Respalda una vez por semana**: Ajustes → **Descargar respaldo**.

---

## Aviso importante sobre tus datos

Todo (vacantes, análisis, CVs generados, claves) vive en el
`localStorage` **del navegador desde el que entras**. Consecuencias reales:

- Si limpias la caché o los datos del sitio, **pierdes todo el historial**.
- Si entras desde el móvil o desde otro navegador, **estará vacío**.
- Nadie más puede ver tus datos, ni siquiera desde el servidor de Vercel.

Por eso: **Ajustes → Descargar respaldo** cada semana. El Panel te avisa solo si
pasan 7 días sin respaldar. Para restaurar: **Ajustes → Importar respaldo**.

Si algún día quieres que los datos te sigan entre dispositivos, hay que
migrarlos a una base de datos con login (Supabase). Es un cambio acotado y se
puede hacer sin rehacer la interfaz.

---

## Si algo falla

| Síntoma | Causa y arreglo |
|---|---|
| "El motor de IA está apagado" | Falta la API key en Ajustes (paso 2). |
| "Tu API key de Gemini no es válida" | Copiaste la clave con espacios o está revocada. Genera otra. |
| "Alcanzaste el límite de cuota" | Cuota gratuita agotada. Espera unos minutos o cambia a Flash Lite en Ajustes. |
| Buscar no trae nada en español | Faltan las claves de Adzuna y Jooble (paso 4). |
| Una fuente aparece en "no respondieron" | Ese agregador está caído en ese momento. El resto sigue funcionando; reintenta luego. |
| Pegar una URL de LinkedIn da error | LinkedIn bloquea la descarga sin sesión. Usa la extensión, o copia el texto y pégalo a mano. |
| El PDF sale sin fechas | No has rellenado las fechas en el Perfil maestro (paso 5). |
| La extensión dice "casi no tiene texto" | La página carga con JavaScript y aún no terminó. Espera a que cargue del todo y reintenta. |
