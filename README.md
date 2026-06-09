# ☕ Origen | Sitio Web Frontend con IA

¡Bienvenido al repositorio oficial del proyecto **Origen**! Este sitio web ha sido diseñado y desarrollado en el marco del *Taller de Desarrollo Web Frontend con IA*. El proyecto ha sido abordado bajo la modalidad de trabajo en parejas, aplicando metodologías ágiles, enfoque *Mobile-First*, diseño responsivo nativo y asistencia avanzada mediante Ingeniería de Prompts con Inteligencia Artificial.


## 🔗 Historial de Conversaciones y Prompts (Evidencias)
Para garantizar la transparencia y el cumplimiento de los requisitos del taller, se adjuntan los accesos directos a los hilos de conversación completos con la IA:

https://claude.ai/share/cd829890-a494-43a1-a72c-6b76c12d913d
https://claude.ai/share/7cdac47c-6051-4de2-a27b-723d105b1371


## 📊 Vista General y Estructura de la Propuesta

**Infusión – Código Cafeinado** es una tienda y cafetería de especialidad ubicada estratégicamente dentro de un entorno de oficinas y coworking. Su propósito fundamental es optimizar y enriquecer la experiencia diaria de profesionales, desarrolladores y estudiantes durante sus jornadas de alta exigencia mental. 

La interfaz web ha sido estructurada de manera modular siguiendo una arquitectura limpia en una SPA (*Single Page Application*) semántica, segmentada de la siguiente forma:

1. **Página de Inicio (Hero Section):** Captación inmediata con un eslogan disruptivo, banner inmersivo de alta fidelidad y un Llamado a la Acción (*CTA*) enfocado en la conversión.
2. **Sección Institucional (Sobre Nosotros):** Identidad corporativa profunda que describe la Misión, Visión y Valores de la empresa, alineando la cultura del software con la pasión por el café.
3. **Catálogo de Productos:** Despliegue interactivo en cuadrícula (Grid) con 6 productos premium, precios, descripciones dinámicas y componentes de tarjeta estilizados.
4. **Servicio Innovador (Propuesta de Valor Única):** Un módulo exclusivo que presenta una solución tecnológica/gastronómica disruptiva aprobada por el docente.
5. **Sección de Contacto:** Formulario de captura funcional con validación en tiempo de ejecución de lado de cliente mediante JavaScript, junto a redes sociales y datos de geolocalización simulada.

## 🛠️ Tecnologías y Prácticas Frontend Utilizadas

* **HTML5 Semántico:** Uso riguroso de etiquetas estructurales (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) para garantizar un SEO técnico óptimo y accesibilidad universal (estándares WCAG).
* **CSS3 Avanzado (Modern Layouts):**
  * Metodología **Mobile-First** como núcleo del diseño adaptativo.
  * Implementación de **CSS Flexbox** para componentes lineales y sistemas de navegación.
  * Implementación de **CSS Grid Layout** para el catálogo adaptivo de productos y la sección de arquitectura del servicio innovador.
  * Uso de **Variables CSS (Custom Properties)** para una gestión centralizada y escalable de la paleta de colores y tipografías.
* **Vanilla JavaScript (ES6+):**
  * Manipulación dinámica del DOM para la interacción del menú móvil (hamburguesa).
  * Lógica del simulador interactivo del servicio *SyntaxBrew*.
  * Validaciones avanzadas en el formulario de contacto para evitar envíos vacíos o estructuras de correo inválidas.

## 📂 Arquitectura de Archivos del Proyecto

El proyecto mantiene una estructura modular, estricta y limpia, facilitando su mantenimiento futuro:

```text
Web-de-Infusion/
│
├── index.html           
│
├── css/
│   ├── origen-coffee-styles.css
│   └── styles.css        
│
├── js/
│   ├── origen-coffee-main.js
│   └── main.js      
│
└── README.md           

```
## 👥 Equipo de Desarrollo
**Luis Alejandro Abreo Carrillo** - Desarrollador Frontend & Prompt Engineer

**Juan Felipe Montoya Acosta** - Desarrollador Frontend & Prompt Engineer