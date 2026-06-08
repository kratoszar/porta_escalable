# Documentación

Componentes creados

btnini.astro y btnini.css
Componente de interfaz único diseñado para mejorar la navegación global del sitio.
Estructura (btnini.astro): Importa localmente su hoja de estilos dedicada y renderiza un ancla interactiva con un icono direccional.
Estilos (btnini.css): Se posiciona de forma absoluta en el viewport position: fixed, bottom: 30px, right: 30px con un índice Z elevado z-index: 9999 para garantizar su superposición sobre cualquier capa del DOM. Incluye una transición de color en el estado :hover para mejorar el feedback visual.
Decisión técnica: Implementación de scroll-behavior: smooth en el selector html dentro de su capa de estilos, transformando el salto nativo del ancla en un desplazamiento fluido.

botoncv.astro
Componente dinámico y altamente reutilizable estructurado mediante tipado estricto con TypeScript.

Props implementadas: texto, rutaPDF, claseCSS. Todas las propiedades cuentan con valores por defecto robustos permitiendo su instanciación con cero configuración.
Decisión técnica: Abstracción de la lógica de descarga segura integrando los atributos nativos HTML download target="_blank y rel="noopener noreferrer" para prevenir vulnerabilidades.

contactoinfo.astro
Componente presentacional estático, creado para encapsular y aislar los datos de contacto del portafolio.

Estructura: Renderiza una lista semántica que agrupa la ubicación, número telefónico y correo electrónico del desarrollador.
Decisión técnica: La extracción de esta información hacia un componente independiente obedece al principio de modularidad, reduciendo el ruido visual en la sección padre y facilitando la actualización centralizada de los datos. Integra enlaces de acción directa.

formularios.astro
Componente interactivo encargado de validar, recopilar y transmitir los datos del usuario.

Estructura: Define un formulario HTML con validación nativa e importa su propia hoja de estilos formularios.css.
Decisión técnica: Implementa un script de cliente que intercepta el evento de envío. Utiliza la API nativa fetch asíncrona para transmitir un objeto mediante el método POST al endpoint. Incluye aserciones de TypeScript para la manipulación segura del DOM.

Nuevas secciones desarrolladas

contactoS.astro
Sección integradora que funciona como contenedor principal para el canal de comunicación con el usuario.

Estructura: Define un bloque semántico que orquesta un sistema de cuadrícula responsivo mediante la asignación de clases estructurales.
Composición: Instancia y distribuye espacialmente los componentes modulares Formularios y ContactoInfo.
Decisión técnica clave: Aplicación estricta del principio de Separación de Responsabilidades. La sección gestiona de forma exclusiva el layout y la narrativa de la interfaz, delegando toda la carga interactiva y de procesamiento a sus componentes hijos.

Problemas encontrados

Salto brusco de navegación: Al implementar el botón de regreso al inicio el anclaje predeterminado de HTML generaba un salto visualmente abrupto e instantáneo hacia la parte superior, afectando la experiencia de usuario.
Recarga de página y envíos múltiples: En las pruebas iniciales del componente formularios.astro, el envío del formulario provocaba la recarga completa del sitio, interrumpiendo la navegación simulada. Además, un usuario podía hacer clic múltiples veces en el botón de enviar antes de que el servidor respondiera, generando peticiones duplicadas.

Soluciones aplicadas

Implementación de Scrolling: Para resolver la navegación abrupta, se inyectó la regla de CSS scroll-behavior: smooth al elemento raíz dentro de btnini.css, delegando al motor del navegador el cálculo y la ejecución de un desplazamiento vertical fluido.
Interceptación asíncrona y manejo de estado en el cliente: Se resolvió el problema del formulario interceptando el evento para los envíos múltiples, se inyectó lógica de estado en el botón de submit: inmediatamente al disparar el evento, se ejecuta btn.disabled = true y se actualiza el texto una vez que el bloque try/catch de la promesa fetch se resuelve, se procesa la respuesta del servidor manipulando las clases de un contenedor <p id="mensaje-estado"> para otorgar retroalimentación visual y se restablece el formulario.

Prompts utilizados durante el desarrollo
Tengo un formulario de contacto en Astro. Ayúdame a escribir el script de cliente en TypeScript para enviar los datos por el método POST usando fetch y FormData hacia /api/contacto, evitando que la página se recargue con e.preventDefault().
¿Cómo puedo prevenir que un usuario envíe un formulario web múltiples veces haciendo doble clic rápido? Necesito deshabilitar el botón submit mientras la petición fetch se está procesando y cambiar su texto.