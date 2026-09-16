/**
 * Lleva los cambios de este repositorio al público, quitando los datos
 * personales por el camino. Vive aquí y no en la plantilla porque es una
 * herramienta de mantenimiento: quien clona la plantilla no la necesita, y
 * dejarla allí publicaba las propias reglas de despersonalización.
 *
 *   node scripts-sincronizar.mjs ../job-manager-plantilla       # el último commit
 *   node scripts-sincronizar.mjs ../job-manager-plantilla lib/prompts.ts
 *
 * Existe porque copiar los ficheros a mano ya metió dos veces el nombre real
 * en el repositorio público, y una de esas veces también revirtió un arreglo
 * que solo existía aquí. Un script no se despista.
 *
 * NUNCA copia los ficheros de la lista PROPIOS: son los que difieren a
 * propósito entre los dos repositorios.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";

/** Ficheros que la plantilla tiene distintos a propósito. Jamás se copian. */
const PROPIOS = new Set([
  "lib/seed.ts", // perfil vacío en vez del real
  // La plantilla saca las iniciales y el nombre del perfil cargado, en vez de
  // llevarlos escritos. Al tocar la navegación hay que repetir el cambio allí
  // a mano, igual que con el README.
  "components/Navegacion.tsx",
  "README.md",
  "CONFIGURACION.md",
  "PROMPT-PERFIL.md",
  "DESPLIEGUE.md",
  "LICENSE",
  "package.json",
  "package-lock.json",
  "scripts-sincronizar.mjs",
  "scripts-generar-prompt.mjs",
]);

/**
 * Sustituciones que despersonalizan el código. Si aparece algo personal que no
 * está aquí contemplado, el script falla en lugar de publicarlo.
 */
const LIMPIEZAS = [
  // Los prompts se dirigen al candidato por su nombre; en la plantilla sale del perfil.
  [/cualquier cosa que Rafael deba completar/g, "cualquier cosa que ${p.nombre} deba completar"],
  [/CONTEXTO ADICIONAL QUE APORTA RAFAEL/g, "CONTEXTO ADICIONAL QUE APORTA EL CANDIDATO"],
  [/LO QUE RAFAEL QUIERE QUE DIGAS/g, "LO QUE EL CANDIDATO QUIERE QUE DIGAS"],
  [/una pregunta que Rafael ya hizo antes/g, "una pregunta que ${p.nombre} ya hizo antes"],
  [/la hora también a la de Rafael/g, "la hora también a la de ${p.nombre}"],
  [/preguntas que RAFAEL hizo en el hilo/g, "preguntas que EL CANDIDATO hizo en el hilo"],
  [/todo lo que Rafael afirmó en sus propios mensajes/g, "todo lo que ${p.nombre} afirmó en sus propios mensajes"],
  [/cualquier otra cosa que Rafael deba revisar/g, "cualquier otra cosa que ${p.nombre} deba revisar"],
  [/lista de lo que Rafael debe completar/g, "lista de lo que ${p.nombre} debe completar"],
  // Marca y comentarios
  [/el reclutador o Rafael\./g, "el reclutador o el candidato."],
  [/"Job Manager — Rafael Licón"/g, '"Job Manager"'],
  [/Mozilla\/5\.0 \(compatible; RafaelJobManager\/1\.0; \+https:\/\/github\.com\/rafaelicon15\)/g,
   "Mozilla/5.0 (compatible; JobManager/1.0)"],
  [/con la clave real de Rafael:/g, "con la clave real:"],
  [/ \* real de Rafael:/g, " * real:"],
  [/Dos cosas medidas contra la API real con la clave de Rafael:/g, "Dos cosas medidas contra su API real:"],
];

/** Cualquier rastro de esto en el resultado aborta la sincronización. */
const PROHIBIDO = /rafael|lic[oó]n|developer-ve|credly|linktr|licongrowth|AIzaSy|\+58 ?4/i;

const [destino, ...pedidos] = process.argv.slice(2);
if (!destino) {
  console.error("Uso: node scripts-sincronizar.mjs <ruta-al-repo-publico> [ficheros...]");
  process.exit(1);
}
if (!existsSync(destino)) {
  console.error(`No encuentro ${destino}`);
  process.exit(1);
}

// Sin lista explícita, se traen los ficheros del último commit de allí.
const ficheros = pedidos.length
  ? pedidos
  : execSync("git show --name-only --pretty=format: HEAD", { encoding: "utf8" })
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

let copiados = 0,
  saltados = 0,
  limpiados = 0;
const problemas = [];

for (const f of ficheros) {
  if (PROPIOS.has(f)) {
    console.log(`  — ${f} (propio de la plantilla, no se toca)`);
    saltados++;
    continue;
  }
  const desde = f;
  const hacia = join(destino, f);
  if (!existsSync(desde)) {
    console.log(`  — ${f} (ya no existe aquí; ¿borrado?)`);
    saltados++;
    continue;
  }

  mkdirSync(dirname(hacia), { recursive: true });

  // Los binarios se copian tal cual; el texto pasa por las limpiezas.
  if (/\.(png|jpg|jpeg|webp|ico|pdf|woff2?)$/i.test(f)) {
    copyFileSync(desde, hacia);
    copiados++;
    console.log(`  ✓ ${f}`);
    continue;
  }

  let texto = readFileSync(desde, "utf8");
  const original = texto;
  for (const [de, a] of LIMPIEZAS) texto = texto.replace(de, a);
  if (texto !== original) limpiados++;

  const sospechoso = texto
    .split("\n")
    .map((l, i) => [i + 1, l])
    .filter(([, l]) => PROHIBIDO.test(l));
  if (sospechoso.length) {
    problemas.push({ f, lineas: sospechoso });
    continue;
  }

  writeFileSync(hacia, texto, "utf8");
  copiados++;
  console.log(`  ✓ ${f}${texto !== original ? " (despersonalizado)" : ""}`);
}

console.log(
  `\n${copiados} copiados, ${limpiados} despersonalizados, ${saltados} saltados.`
);

if (problemas.length) {
  console.error("\n╳ ABORTADO: quedan datos personales sin regla de limpieza.\n");
  for (const { f, lineas } of problemas) {
    console.error(`  ${f}`);
    for (const [n, l] of lineas) console.error(`    ${n}: ${l.trim().slice(0, 110)}`);
  }
  console.error(
    "\nAñade la sustitución que falte en LIMPIEZAS y vuelve a ejecutarlo. Esos ficheros NO se han copiado."
  );
  process.exit(1);
}
