import type { PerfilMaestro, Ajustes, EstadoApp } from "./types";

// Perfil maestro precargado con los datos reales de Rafael (CV ES, Gems.txt y
// el informe Wonderlic Select). Todo aquí debe ser verificable: el motor de IA
// tiene prohibido afirmar nada que no esté en este archivo.

export const PERFIL_INICIAL: PerfilMaestro = {
  nombre: "Rafael A. Licón",
  titular:
    "Especialista en Automatización de Marketing, CRO e IA | Desarrollador Web | PPC & SEO",
  titularEn:
    "Marketing Automation, CRO & AI Specialist | Web Developer | PPC & SEO",
  email: "rafaelicon15@gmail.com",
  telefono: "+58 424 3454919",
  ubicacion: "Maracay, Aragua, Venezuela",
  links: [
    { etiqueta: "Portafolio", url: "https://rafael.developer-ve.com" },
    { etiqueta: "LinkedIn", url: "https://linkedin.com/in/rafaelicon" },
    { etiqueta: "Sitio web", url: "https://licongrowthpartners.com" },
    { etiqueta: "Credly", url: "https://www.credly.com/users/rafael-licon" },
    {
      etiqueta: "Accredible",
      url: "https://www.credential.net/profile/rafaelicon15/wallet",
    },
    { etiqueta: "BioLink", url: "https://linktr.ee/rafaelicon15" },
    {
      etiqueta: "Certificados (Drive)",
      url: "https://drive.google.com/drive/u/0/folders/1_hK6xwZ6SvFORelIb6OMB-RRTBOFUEND",
    },
  ],
  resumen:
    "Profesional con más de 8 años de experiencia en la intersección de Tecnologías de la Información, Desarrollo Web y Marketing Digital Avanzado. Especializado en optimización de la tasa de conversión (CRO) y en el desarrollo de ecosistemas digitales para e-commerce y servicios con Shopify, WordPress (Elementor) y GoHighLevel. Integro agentes de Inteligencia Artificial para automatizar investigación de mercado, auditorías SEO y flujos de trabajo. Gestiono y optimizo campañas PPC en Google Ads y Meta Ads orientadas a maximizar el ROI.",
  resumenEn:
    "Digital professional with 8+ years across IT, Web Development and Advanced Digital Marketing. Specialized in Conversion Rate Optimization (CRO) and building digital ecosystems for e-commerce and services using Shopify, WordPress (Elementor) and GoHighLevel. I integrate autonomous AI agents to automate market research, SEO audits and internal workflows, and I run Google Ads and Meta Ads campaigns focused on maximizing ROI.",
  experiencias: [
    {
      id: "exp-latam",
      puesto: "Paid Media Specialist",
      empresa: "Latam Business School",
      ubicacion: "Remoto",
      modalidad: "Remoto, jornada parcial",
      desde: "May 2026",
      hasta: "Sep 2026",
      resumen:
        "Paid media, auditoría del ecosistema de captación y contenido, en paralelo con Cohen & Aguirre Lobby Solutions. Ciclo cerrado el 7 de septiembre de 2026.",
      logros: [
        {
          id: "l-latam-1",
          texto:
            "Planifiqué, ejecuté y optimicé campañas digitales de paid media orientadas a los objetivos de captación y crecimiento de la escuela.",
          angulos: ["ppc"],
          keywords: [
            "paid media",
            "campañas digitales",
            "optimización de campañas",
            "captación",
            "growth",
          ],
          evidencia: [
            { tipo: "referencia", descripcion: "Verificable en LinkedIn y con Latam Business School" },
          ],
        },
        {
          id: "l-latam-2",
          texto:
            "Analicé el rendimiento de las campañas y me coordiné con el equipo de Marketing para fortalecer la generación de leads.",
          angulos: ["ppc", "cro"],
          keywords: [
            "análisis de rendimiento",
            "generación de leads",
            "reporting",
          ],
        },
        {
          id: "l-latam-3",
          texto:
            "Audité el flujo completo del CRM e identifiqué los puntos de fricción del recorrido del lead, entregando los hallazgos documentados al equipo.",
          angulos: ["cro", "ppc"],
          keywords: [
            "auditoría de CRM",
            "flujo de leads",
            "puntos de fricción",
            "recorrido del lead",
          ],
        },
        {
          id: "l-latam-4",
          texto:
            "Audité la integración de herramientas de Inteligencia Artificial en la atención de nuevos leads, evaluando su efecto sobre la captación.",
          angulos: ["ia", "cro"],
          keywords: [
            "integración de IA",
            "atención de leads",
            "automatización",
            "auditoría",
          ],
        },
        {
          id: "l-latam-5",
          texto:
            "Creé y estandaricé las plantillas de WhatsApp del equipo comercial para acelerar el primer contacto y el seguimiento de leads.",
          angulos: ["cro", "ppc"],
          keywords: [
            "WhatsApp",
            "plantillas",
            "speed to lead",
            "seguimiento comercial",
          ],
        },
        {
          id: "l-latam-6",
          texto:
            "Ejecuté auditorías del contenido orgánico y de la competencia para detectar brechas de posicionamiento y oportunidades de mercado.",
          angulos: ["seo", "cro"],
          keywords: [
            "auditoría SEO",
            "contenido orgánico",
            "análisis de competencia",
            "brechas de posicionamiento",
          ],
        },
        {
          id: "l-latam-7",
          texto:
            "Corregí contenido e imágenes del sitio web y desarrollé piezas publicitarias y material de apoyo en coordinación directa con el equipo de diseño.",
          angulos: ["web", "ppc"],
          keywords: [
            "corrección de contenido",
            "optimización de imágenes",
            "piezas publicitarias",
            "trabajo con equipo de diseño",
          ],
        },
        {
          id: "l-latam-8",
          texto:
            "Elaboré y entregué al equipo de diseño la guía de contenido de prueba de agosto, definiendo la línea editorial del canal.",
          angulos: ["seo", "web"],
          keywords: [
            "guía de contenido",
            "calendario editorial",
            "planificación de contenidos",
          ],
        },
        {
          id: "l-latam-9",
          texto:
            "Documenté y reporté los fallos técnicos y operativos detectados en el ecosistema digital para su resolución por el equipo correspondiente.",
          angulos: ["ti", "cro"],
          keywords: [
            "reportes de fallo",
            "troubleshooting",
            "documentación técnica",
          ],
        },
      ],
    },
    {
      id: "exp-cohen",
      puesto: "Especialista en CRO y Marketing",
      empresa: "Cohen & Aguirre Lobby Solutions",
      ubicacion: "Madrid, España",
      modalidad: "Remoto, jornada completa",
      desde: "Dic 2025",
      hasta: "Actualidad",
      resumen:
        "Responsable de conversión, analítica y automatización con IA para la captación de leads legales.",
      logros: [
        {
          id: "l-cohen-1",
          texto:
            "Analicé el comportamiento del usuario y los embudos de venta con mapas de calor y grabaciones de sesión en Microsoft Clarity, cruzados con Google Analytics, reduciendo la fricción en la captación de leads legales.",
          angulos: ["cro", "ia"],
          keywords: [
            "CRO",
            "Microsoft Clarity",
            "Google Analytics",
            "mapas de calor",
            "embudos",
            "análisis de comportamiento",
          ],
          evidencia: [
            { tipo: "referencia", descripcion: "Puesto actual en Cohen & Aguirre" },
          ],
        },
        {
          id: "l-cohen-2",
          texto:
            "Implementé cadenas de trabajo con agentes autónomos de IA (Manus, Perplexity, Claude, Gemini) para ejecutar auditorías SEO, analizar el tráfico de competidores y estructurar reportes de mercado.",
          angulos: ["ia", "cro", "seo"],
          keywords: [
            "agentes de IA",
            "automatización",
            "auditoría SEO",
            "análisis de competencia",
            "prompt engineering",
            "Claude",
            "Gemini",
          ],
          evidencia: [
            { tipo: "referencia", descripcion: "Puesto actual en Cohen & Aguirre" },
          ],
        },
        {
          id: "l-cohen-3",
          texto:
            "Construí landing pages de alta conversión en WordPress (Elementor) y GoHighLevel, integrando investigación previa de audiencia para redactar copy persuasivo.",
          angulos: ["cro", "web"],
          keywords: [
            "WordPress",
            "Elementor",
            "GoHighLevel",
            "landing pages",
            "copywriting",
            "investigación de audiencia",
          ],
        },
        {
          id: "l-cohen-4",
          texto:
            "Diseñé, automaticé y testeé de forma continua embudos de captación en GoHighLevel mediante pruebas A/B, optimizando cada etapa del recorrido para maximizar el ROI.",
          angulos: ["cro", "ppc"],
          keywords: [
            "pruebas A/B",
            "funnels",
            "GoHighLevel",
            "automatización de marketing",
            "ROI",
          ],
        },
      ],
    },
    {
      // Esta entrada es la que explica los solapamientos de fechas: el trabajo
      // por cuenta propia corre en paralelo a los empleos desde 2022.
      id: "exp-freelance",
      puesto: "Digital Marketing (profesional independiente)",
      empresa: "Profesional independiente",
      ubicacion: "Venezuela",
      modalidad: "Freelance, por proyectos",
      desde: "Jul 2022",
      hasta: "Actualidad",
      resumen:
        "Proyectos de marketing digital y desarrollo web por cuenta propia, en paralelo a los empleos a jornada completa.",
      logros: [
        {
          id: "l-free-1",
          texto:
            "Desarrollé el sitio web corporativo de The Factory HKA República Dominicana en WordPress y Elementor, con una interfaz alineada a la identidad de marca y orientada a la experiencia de usuario.",
          angulos: ["web", "cro"],
          keywords: ["WordPress", "Elementor", "desarrollo web", "UX", "sitio corporativo"],
          evidencia: [
            {
              tipo: "proyecto",
              descripcion: "The Factory HKA República Dominicana (2025)",
              url: "https://rafael.developer-ve.com",
            },
          ],
        },
        {
          id: "l-free-2",
          texto:
            "Construí una tienda online de repuestos de motos con catálogo, procesamiento de pedidos en tiempo real y administración de inventario, usando Google Apps Script como backend sin servidor y Google Sheets como base de datos.",
          angulos: ["web"],
          keywords: [
            "e-commerce",
            "Google Apps Script",
            "gestión de inventario",
            "catálogo de productos",
          ],
          evidencia: [
            {
              tipo: "proyecto",
              descripcion: "Tienda online de repuestos de motos (2025)",
              url: "https://rafael.developer-ve.com",
            },
          ],
        },
        {
          id: "l-free-3",
          texto:
            "Desarrollé un sistema de gestión escolar en Laravel que automatiza procesos administrativos y la gestión de calificaciones y asistencia.",
          angulos: ["web", "ti"],
          keywords: ["Laravel", "MySQL", "sistema de gestión", "automatización de procesos"],
          evidencia: [
            {
              tipo: "proyecto",
              descripcion: "Sistema de gestión escolar (2024)",
              url: "https://rafael.developer-ve.com",
            },
          ],
        },
        {
          id: "l-free-4",
          texto:
            "Diseñé un sistema de gestión de inventarios en Google Apps Script con actualización de stock en tiempo real y generación automática de reportes.",
          angulos: ["web", "ti"],
          keywords: [
            "Google Apps Script",
            "Google Sheets",
            "automatización de reportes",
            "control de stock",
          ],
          evidencia: [
            {
              tipo: "proyecto",
              descripcion: "Sistema de gestión de inventarios (2025)",
              url: "https://rafael.developer-ve.com",
            },
          ],
        },
      ],
    },
    {
      id: "exp-websell",
      puesto: "Performance Marketing Manager | Paid Media Specialist (Meta & Google Ads)",
      empresa: "The WebSell",
      ubicacion: "Maracay, Estado Aragua, Venezuela",
      modalidad: "Presencial, jornada completa",
      desde: "Abr 2025",
      hasta: "Jun 2026",
      resumen:
        "Gestión integral de campañas de paid media y análisis de rendimiento.",
      logros: [
        {
          id: "l-ws-1",
          texto:
            "Planifiqué, configuré y ejecuté campañas publicitarias en Google Ads y Meta Ads, desde la investigación exhaustiva de palabras clave hasta la optimización continua de presupuestos.",
          angulos: ["ppc"],
          keywords: [
            "Google Ads",
            "Meta Ads",
            "PPC",
            "keyword research",
            "gestión de presupuesto",
            "SEM",
          ],
        },
        {
          id: "l-ws-2",
          texto:
            "Monitoreé y analicé métricas clave (ROI, CPA, ROAS, CTR) para generar insights accionables, elaborar reportes de rendimiento y ejecutar ajustes que mejoraran la rentabilidad.",
          angulos: ["ppc", "cro"],
          keywords: [
            "ROAS",
            "CPA",
            "CTR",
            "ROI",
            "reporting",
            "analítica de campañas",
          ],
        },
        {
          id: "l-ws-3",
          texto:
            "Evalué los procesos de atención al cliente y seguimiento de leads para asegurar la calidad del servicio y aumentar la tasa de cierre.",
          angulos: ["ppc", "cro"],
          keywords: [
            "gestión de leads",
            "tasa de cierre",
            "CRM",
            "procesos comerciales",
          ],
        },
      ],
    },
    {
      id: "exp-maxiplast",
      puesto: "IT Infrastructure Manager | SysAdmin & Network Specialist",
      empresa: "Envases Maxiplast",
      ubicacion: "Estado Aragua, Venezuela",
      modalidad: "Presencial",
      desde: "Feb 2023",
      hasta: "Jul 2025",
      resumen:
        "Infraestructura TI, redes y seguridad electrónica en entorno industrial.",
      logros: [
        {
          id: "l-mx-1",
          texto:
            "Optimicé el rendimiento de la infraestructura tecnológica reduciendo tiempos de inactividad mediante planes de mantenimiento preventivo y correctivo.",
          angulos: ["ti"],
          keywords: [
            "infraestructura TI",
            "mantenimiento preventivo",
            "uptime",
            "soporte técnico",
          ],
        },
        {
          id: "l-mx-2",
          texto:
            "Implementé sistemas de seguridad corporativa (CCTV, control de acceso biométrico) y resolví incidencias complejas en redes, servidores e impresoras industriales.",
          angulos: ["ti"],
          keywords: [
            "CCTV",
            "control de acceso",
            "redes",
            "servidores",
            "troubleshooting",
          ],
        },
      ],
    },
    {
      id: "exp-frontinos",
      puesto: "Diseñador Gráfico & Marketing Digital",
      empresa: "Frontinos Tec",
      ubicacion: "Venezuela",
      modalidad: "Remoto",
      desde: "Ene 2020",
      hasta: "Feb 2023",
      resumen:
        "Marketing digital, e-commerce y diseño de contenido visual.",
      logros: [
        {
          id: "l-ft-1",
          texto:
            "Incrementé las conversiones en un 87% mediante la gestión estratégica de campañas publicitarias y la redacción persuasiva de secuencias de email marketing.",
          metrica: "+87% conversiones",
          angulos: ["cro", "ppc"],
          keywords: [
            "email marketing",
            "conversiones",
            "campañas",
            "copywriting",
          ],
          evidencia: [
            {
              tipo: "referencia",
              descripcion:
                "Resultado declarado en CV; contrastable con Frontinos Tec",
            },
          ],
        },
        {
          id: "l-ft-2",
          texto:
            "Desarrollé y administré tiendas online en Shopify, optimizando la experiencia de usuario y el recorrido de compra para maximizar el volumen de ventas.",
          angulos: ["web", "cro"],
          keywords: ["Shopify", "e-commerce", "UX", "customer journey"],
        },
        {
          id: "l-ft-3",
          texto:
            "Aumenté la interacción en redes sociales en un 85% mediante el diseño de contenido visual de alto impacto (posts, stories, flyers).",
          metrica: "+85% interacción",
          angulos: ["web"],
          keywords: [
            "diseño gráfico",
            "redes sociales",
            "contenido visual",
            "engagement",
          ],
        },
      ],
    },
    {
      id: "exp-kc",
      puesto: "IT Infrastructure Manager | SysAdmin & Network Specialist",
      empresa: "Kimberly-Clark",
      ubicacion: "Venezuela",
      modalidad: "Presencial",
      desde: "May 2018",
      hasta: "Ene 2021",
      resumen: "Soporte técnico corporativo y mantenimiento de infraestructura.",
      logros: [
        {
          id: "l-kc-1",
          texto:
            "Garanticé la operatividad de la infraestructura tecnológica mediante mantenimiento proactivo de hardware y software corporativo.",
          angulos: ["ti"],
          keywords: [
            "hardware",
            "software corporativo",
            "mantenimiento proactivo",
          ],
        },
        {
          id: "l-kc-2",
          texto:
            "Brindé soporte técnico de primer y segundo nivel a usuarios, asegurando la continuidad operativa del negocio.",
          angulos: ["ti"],
          keywords: [
            "help desk",
            "soporte N1",
            "soporte N2",
            "continuidad operativa",
          ],
        },
      ],
    },
  ],
  educacion: [
    {
      titulo: "Técnico Superior en Informática",
      institucion:
        "Universidad Politécnica Territorial del Estado Aragua Federico Brito Figueroa",
      estado: "2022 – 2025; cursado, pendiente la presentación del proyecto final",
    },
  ],
  certificaciones: [
    {
      id: "c1",
      nombre: "Impulsa tu marketing con el píxel de Facebook",
      emisor: "Facebook Blueprint",
    },
    {
      id: "c2",
      nombre: "Políticas de privacidad para contenido y segmentación",
      emisor: "Facebook Blueprint",
    },
    {
      id: "c3",
      nombre: "Fundamentos de Marketing Digital",
      emisor: "Google Digital Garage",
    },
    { id: "c4", nombre: "Manager de influencers", emisor: "DRIM" },
    {
      id: "c5",
      nombre: "Seguridad de la marca de la familia de aplicaciones de Facebook",
      emisor: "Meta Blueprint",
    },
    {
      id: "c6",
      nombre: "Medición y análisis en las tecnologías de Meta",
      emisor: "Meta Blueprint",
    },
    {
      id: "c7",
      nombre: "Privacidad y datos en la publicidad digital",
      emisor: "Meta Blueprint",
    },
    { id: "c8", nombre: "Acelerador de Carrera con Power BI", emisor: "Zakidata" },
    {
      id: "c9",
      nombre: "Protege tu Negocio: Ciberseguridad en el Teletrabajo",
      emisor: "Google Activate",
    },
    { id: "c10", nombre: "Programación desde Cero", emisor: "Egg" },
    {
      id: "c11",
      nombre: "Fundamentos y Aplicaciones de la Inteligencia Artificial",
      emisor: "Netzun",
    },
    {
      id: "c12",
      nombre: "Conceptos básicos de redes",
      emisor: "Cisco Networking Academy",
    },
    {
      id: "c13",
      nombre: "Conceptos básicos del hardware",
      emisor: "Cisco Networking Academy",
    },
    {
      id: "c14",
      nombre: "Introducción al desarrollo web: HTML y CSS",
      emisor: "Google",
    },
    { id: "c15", nombre: "Excel Desde Cero", emisor: "Claseflix" },
    { id: "c16", nombre: "Posicionamiento en Buscadores (SEO)", emisor: "Platzi" },
    { id: "c17", nombre: "Google Ads", emisor: "Platzi" },
    { id: "c18", nombre: "Google Ads Search", emisor: "Platzi" },
    {
      id: "c19",
      nombre: "Introducción a la Inteligencia Artificial",
      emisor: "Platzi",
    },
    { id: "c20", nombre: "Meta Ads Avanzado", emisor: "Platzi" },
  ],
  habilidades: [
    {
      categoria: "Inteligencia Artificial y Automatización",
      items: [
        { nombre: "Agentes autónomos (Manus)", nivel: 3 },
        { nombre: "Ingeniería de prompts", nivel: 4 },
        { nombre: "Claude", nivel: 4 },
        { nombre: "Gemini", nivel: 3 },
        { nombre: "Perplexity", nivel: 3 },
        { nombre: "Automatización de reportes e investigación", nivel: 3 },
        { nombre: "Make", nivel: 3 },
        { nombre: "n8n", nivel: 3 },
      ],
    },
    {
      categoria: "Marketing y Embudos",
      items: [
        { nombre: "GoHighLevel", nivel: 4 },
        { nombre: "Diseño de funnels", nivel: 4 },
        { nombre: "Email marketing", nivel: 3 },
        { nombre: "ManyChat", nivel: 3 },
        { nombre: "Kommo", nivel: 3 },
        { nombre: "Wasapi", nivel: 3 },
        { nombre: "Gestión de CRM", nivel: 3 },
      ],
    },
    {
      categoria: "Publicidad Digital (PPC/SEM)",
      items: [
        { nombre: "Google Ads", nivel: 4 },
        { nombre: "Meta Ads", nivel: 4 },
        { nombre: "TikTok Ads", nivel: 3 },
        { nombre: "Pruebas A/B", nivel: 3 },
        { nombre: "Análisis de métricas (ROI, CPA, ROAS)", nivel: 4 },
        { nombre: "Meta Business Suite", nivel: 3 },
      ],
    },
    {
      categoria: "Analítica y CRO",
      items: [
        { nombre: "Google Analytics", nivel: 4 },
        { nombre: "Google Tag Manager", nivel: 3 },
        { nombre: "Microsoft Clarity", nivel: 4 },
        { nombre: "Optimización de tasa de conversión", nivel: 4 },
      ],
    },
    {
      categoria: "SEO",
      items: [
        { nombre: "Semrush", nivel: 3 },
        { nombre: "Google Search Console", nivel: 3 },
        { nombre: "Rank Math", nivel: 3 },
        { nombre: "Yoast SEO", nivel: 3 },
        { nombre: "Keyword research", nivel: 4 },
        { nombre: "SEO semántico", nivel: 3 },
      ],
    },
    {
      categoria: "Desarrollo Web y E-commerce",
      items: [
        { nombre: "Shopify", nivel: 4, anios: 2 },
        { nombre: "WordPress (Elementor)", nivel: 4 },
        { nombre: "Google Apps Script", nivel: 3 },
        { nombre: "Astro", nivel: 2 },
        { nombre: "Next.js", nivel: 2 },
        { nombre: "React", nivel: 2 },
        { nombre: "Laravel", nivel: 2 },
        { nombre: "Node.js", nivel: 2 },
        { nombre: "TypeScript", nivel: 2 },
        { nombre: "JavaScript", nivel: 2 },
        { nombre: "Python", nivel: 2 },
        { nombre: "TailwindCSS", nivel: 2 },
        { nombre: "Bootstrap", nivel: 2 },
        { nombre: "Git", nivel: 2 },
        { nombre: "HTML", nivel: 3 },
        { nombre: "CSS", nivel: 3 },
        { nombre: "MySQL", nivel: 2 },
      ],
    },
    {
      categoria: "Diseño y Contenido",
      items: [
        { nombre: "Adobe Photoshop", nivel: 3 },
        { nombre: "Adobe Illustrator", nivel: 3 },
        { nombre: "Canva", nivel: 3 },
        { nombre: "Diseño de contenido para redes sociales", nivel: 3 },
      ],
    },
    {
      categoria: "Tecnologías de la Información",
      items: [
        { nombre: "Soporte técnico N1/N2", nivel: 4 },
        {
          nombre: "Microcontroladores (ESP32/ESP8266/Arduino/Raspberry)",
          nivel: 3,
        },
        { nombre: "Redes (Mikrotik, Cisco)", nivel: 3 },
        { nombre: "Servidores Windows / Linux", nivel: 3 },
        { nombre: "Google Cloud Platform", nivel: 2 },
        { nombre: "Power BI", nivel: 3 },
        { nombre: "Excel avanzado", nivel: 3 },
        { nombre: "Cisco Packet Tracer", nivel: 3 },
        { nombre: "Office 365", nivel: 3 },
        { nombre: "Google Workspace", nivel: 3 },
      ],
    },
  ],
  idiomas: [
    { idioma: "Español", nivel: "Nativo" },
    { idioma: "Inglés", nivel: "Pendiente de definir" },
  ],
  psicometria: [
    {
      titulo: "Highly Candid",
      etiquetas: ["Crítico", "Directo", "Independiente"],
      implicaciones: [
        "Comunicación directa y al grano",
        "Plantea los desacuerdos en lugar de callarlos",
        "Enfoque lógico y estructurado; da feedback explícito",
        "Dispuesto a tomar decisiones impopulares pero necesarias",
      ],
    },
    {
      titulo: "Driven by Persuasive Work",
      etiquetas: ["Convincente", "Enérgico", "Comunicativo"],
      implicaciones: [
        "Rinde en roles que implican persuadir y conseguir buy-in",
        "Orientado a rentabilidad y productividad",
        "Motivado por recompensas ligadas al desempeño",
      ],
    },
    {
      titulo: "Capable Problem-Solver",
      etiquetas: ["Analítico", "Comprensivo", "Resolutivo"],
      implicaciones: [
        "Cómodo resolviendo problemas de complejidad media sin supervisión constante",
        "Aprende rápido con formación o guía",
        "Aplica aprendizajes previos a problemas nuevos",
      ],
    },
  ],
  lineasRojas: [
    "Nunca inventar empleadores, cargos, fechas, títulos ni certificaciones.",
    "Nunca afirmar un nivel de idioma que no esté declarado en el perfil.",
    "Nunca inventar métricas: solo usar las que existen en los logros del perfil.",
    "Nunca declarar el título universitario como finalizado (está pendiente el proyecto final).",
    "Nunca afirmar experiencia con una herramienta que no esté en Habilidades.",
    "Si falta un requisito, decirlo y proponer cómo compensarlo, no maquillarlo.",
  ],
  preferencias: {
    modalidad: "100% remoto, cualquier país",
    disponibilidad: "Inmediata",
    // Declarado por él mismo en la entrevista con Grupo Index (7 sep 2026).
    salarioMin: "600 USD/mes a media jornada",
    salarioObjetivo: "1.200 - 1.500 USD/mes a jornada completa, según carga",
    rolesObjetivo: [
      "CRO Specialist",
      "Marketing Automation Specialist",
      "AI Automation Specialist",
      "Growth Marketer",
      "PPC / Paid Media Specialist",
      "Performance Marketing Manager",
      "SEO Specialist",
      "Shopify / WordPress Developer",
      "E-commerce Manager",
    ],
    keywordsBusqueda: [
      "CRO",
      "conversion rate optimization",
      "marketing automation",
      "growth marketing",
      "paid media",
      "google ads",
      "meta ads",
      "performance marketing",
      "shopify",
      "gohighlevel",
      "seo specialist",
      "ai automation",
    ],
  },
};

export const AJUSTES_INICIALES: Ajustes = {
  geminiApiKey: "",
  modelo: "gemini-flash-lite-latest",
  modeloGeneracion: "gemini-flash-lite-latest",
  adzunaAppId: "",
  adzunaAppKey: "",
  joobleKey: "",
  idiomaPorDefecto: "es",
};

export const ESTADO_INICIAL: EstadoApp = {
  version: 1,
  perfil: PERFIL_INICIAL,
  vacantes: [],
  conversaciones: [],
  ajustes: AJUSTES_INICIALES,
};
