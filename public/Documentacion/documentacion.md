# Documentación

## Componentes creados

### btnini.astro y btnini.css
Componente de interfaz único diseñado para mejorar la navegación global del sitio.
Estructura (btnini.astro): Importa localmente su hoja de estilos dedicada y renderiza un icono direccional.
Estilos (btnini.css): Se posiciona de forma absoluta en el viewport position: fixed, bottom: 30px, right: 30px con un índice Z elevado z-index: 9999 para garantizar su superposición sobre cualquier capa del DOM. Incluye una transición de color en el estado :hover para mejorar el feedback visual.
Decisión técnica: Implementación de scroll-behavior: smooth en el selector html dentro de su capa de estilos, transformando el salto en un desplazamiento fluido.

### botoncv.astro
Componente dinámico reutilizable estructurado mediante TypeScript.

Props implementadas: texto, rutaPDF, claseCSS. Todas las propiedades cuentan con valores por defecto robustos permitiendo su instanciación con cero configuración.
Decisión técnica: Abstracción de la lógica de descarga segura integrando los atributos nativos HTML download target="_blank y rel="noopener noreferrer" para prevenir vulnerabilidades.

### contactoinfo.astro
Componente presentacional estático, creado para encapsular y aislar los datos de contacto del portafolio.

Estructura: Renderiza una lista semántica que agrupa la ubicación, número telefónico y correo electrónico.
Decisión técnica: La extracción de esta información hacia un componente independiente reduciendo el ruido visual en la sección padre y facilitando la actualización de los datos.

### formularios.astro
Componente interactivo encargado de validar, recopilar y transmitir los datos del usuario.

Estructura: Define un formulario con validación nativa e importa su propia hoja de estilos formularios.css.
Decisión técnica: Implementa un script de cliente que intercepta el evento de envío. Utiliza la API nativa fetch para transmitir un objeto mediante el método post al endpoint.

### footer.astro
Componente de pie de página refactorizado para eliminar contenido duplicado y conectarse a EmDash para gestión dinámica de enlaces.

Estructura: Renderiza una lista de iconos sociales los enlaces de GitHub, LinkedIn y email se obtienen desde secciones de EmDash mediante getSection(), permitiendo su edición desde el panel de administración sin tocar el código.
Decisión técnica: Se eliminó una copia errónea de la sección de proyectos que había sido colocada dentro del footer, causando que los proyectos aparecieran duplicados en la página. La separación del contenido dinámico hacia EmDash centraliza la gestión de datos de contacto.

## Nuevas secciones desarrolladas

### contactoS.astro
Sección integradora que funciona como contenedor principal para el canal de comunicación con el usuario.

Estructura: Define un bloque semántico que orquesta un sistema de cuadrícula responsivo mediante la asignación de clases estructurales.
Composición: Instancia y distribuye componentes modulares Formularios y ContactoInfo.
Decisión técnica clave: Aplicación estricta del principio de Separación de Responsabilidades. La sección gestiona de forma exclusiva el layout y la narrativa de la interfaz, delegando toda la carga interactiva y de procesamiento a sus componentes hijos.

### proyectosS.astro
Sección dinámica que consume datos desde EmDash para renderizar las tarjetas de proyectos destacados.

Estructura: Filtra y ordena las secciones de EmDash cuyo slug comienza con proyecto-, luego mapea cada resultado al componente Cardporta pasando título, link de GitHub, imagen y descripción como props.
Decisión técnica: El uso de getSections() con filtrado por slug permite agregar, editar o eliminar proyectos directamente desde el panel de administración de EmDash sin modificar el código fuente.

temaOscuro.css
Hoja de estilos dedicada exclusivamente a los overrides visuales del tema oscuro, ubicada en public/assets/css/ junto a main.css.

Estructura: Define reglas CSS bajo el selector html.dark que sobreescriben los colores del tema claro: fondos, textos, encabezados, bordes, inputs, tablas y botones.

Decisión técnica: La separación del tema oscuro en su propio archivo preserva el CSS original de la plantilla Strata intacto, eliminando el riesgo de romper estilos existentes al no modificar main.css.

tema.js
Script de cliente encargado de gestionar el estado del tema visual del sitio, ubicado en public/assets/js/.

Estructura: Al cargar la página detecta la preferencia guardada en localStorage o la preferencia del sistema operativo mediante prefers-color-scheme. Escucha el evento click del botón para alternar la clase dark en el elemento html, actualizar el texto del botón y persistir la elección del usuario.

Decisión técnica: El uso de localStorage garantiza que la preferencia del usuario persista entre sesiones sin necesidad de base de datos ni autenticación. La detección de prefers-color-scheme mejora la experiencia en la primera visita adaptándose automáticamente al sistema operativo del usuario.


## Integraciones implementadas

### EmDash como CMS
Se integró EmDash como sistema de gestión de contenido para administrar los datos del portafolio desde un panel visual.

Secciones gestionadas desde EmDash: proyectos destacados, enlaces del footer y contenido de la sección de presentación.
Campos utilizados por proyecto: title para el nombre, description para el enlace de GitHub, keywords para la ruta de la imagen y content.children.text para la descripción.
Decisión técnica: Centralizar el contenido en EmDash permite actualizar el portafolio sin necesidad de modificar ni redesplegar el código, reduciendo la fricción para mantener el sitio actualizado.

### Deploy en Netlify con Turso
Se configuró el despliegue del portafolio en Netlify utilizando Turso como base de datos SQLite en la nube, reemplazando el archivo local.db.

Proceso de migración: Se exportó la base de datos local a Turso usando turso db create --from-file, habilitando previamente el modo WAL con sqlite3. Se generaron las credenciales de conexión desde el CLI de Turso.
Configuración en astro.config.mjs: Se reemplazó el adaptador de Node por el adaptador de Netlify (@astrojs/netlify) y se configuró el adaptador de base de datos libsql de EmDash con detección de entorno: usa Turso en producción cuando la variable TURSO_URL está presente, y SQLite local en desarrollo.
Variables de entorno en Netlify: TURSO_URL con la URL de conexión libsql y TURSO_TOKEN con el token de autenticación, configuradas desde Project configuration → Environment variables.
Decisión técnica: La separación de adaptadores por entorno permite mantener un flujo de desarrollo ágil sin depender de conexión a la nube, mientras garantiza persistencia y escalabilidad en producción.


## Problemas encontrados

Salto brusco de navegación: Al implementar el botón de regreso al inicio se generaba un salto abrupto e instantáneo hacia la parte superior.

Recarga de página y envíos múltiples: En las pruebas iniciales del componente formularios.astro, el envío del formulario provocaba la recarga completa del sitio, interrumpiendo la navegación simulada. Además, un usuario podía hacer clic múltiples veces en el botón de enviar antes de que el servidor respondiera, generando peticiones duplicadas.

Proyectos duplicados en la página: El componente footer.astro contenía una copia de la sección de proyectos, lo que causaba que las tarjetas aparecieran dos veces: una en la sección correcta y otra debajo de la sección de contacto.

Base de datos incompatible con Netlify: El archivo local.db de SQLite no es accesible en el entorno serverless de Netlify, causando un error SQLITE_CANTOPEN al intentar cargar cualquier página.


## Soluciones aplicadas

Implementación de Scrolling: Para resolver la navegación abrupta, se inyectó la regla de CSS scroll-behavior: smooth al elemento raíz dentro de btnini.css, delegando al motor del navegador el cálculo y la ejecución de un desplazamiento vertical fluido.

Interceptación asíncrona y manejo de estado en el cliente: Se resolvió el problema del formulario interceptando el evento para los envíos múltiples, se inyectó lógica de estado en el botón de submit: inmediatamente al disparar el evento, se ejecuta btn.disabled = true y se actualiza el texto una vez que el bloque try/catch de la promesa fetch se resuelve, se procesa la respuesta del servidor manipulando las clases de un contenedor p#mensaje-estado para otorgar retroalimentación visual y se restablece el formulario.

Limpieza del footer: Se eliminó el código de proyectos del componente footer.astro, dejando únicamente los enlaces sociales los datos de contacto se conectaron a EmDash para permitir su edición desde el panel de administración.

Migración a Turso: Se migró la base de datos local a Turso usando el CLI, se configuró el adaptador libsql en EmDash con detección de entorno y se agregaron las variables de entorno en Netlify para establecer la conexión en producción.

## Prompts utilizados durante el desarrollo
Tengo un formulario de contacto en Astro. Ayúdame a escribir el script de cliente en TypeScript para enviar los datos por el método POST usando fetch y FormData hacia /api/contacto, evitando que la página se recargue con e.preventDefault().
¿Cómo puedo prevenir que un usuario envíe un formulario web múltiples veces haciendo doble clic rápido? Necesito deshabilitar el botón submit mientras la petición fetch se está procesando y cambiar su texto.
¿Cómo conecto EmDash a mi sección de proyectos en Astro para obtener los datos dinámicamente desde el CMS?
¿Cómo despliego un proyecto Astro con EmDash en Netlify usando Turso como base de datos en la nube?