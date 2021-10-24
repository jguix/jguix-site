---
title: 'Creando una extensión de Chrome'
description: 'En este post, te mostraré cómo crear una simple Chrome extension, usando solo JavaScript, HTML y CSS. También resumiré lo que una extensión de Chrome puede hacer, y también voy a explicar cómo crear extensiones más complejas basadas en JavaScript, React, Angular o Vue.'
published: true
datePublished: '2020-06-01T09:00:00.000Z'
author: Juangui Jordán
tags:
  - javascript
authorPhoto: /img/authors/jguix.jpeg
authorTwitter: jguixer
bannerPhoto: '/img/blog/2020-05_creating-a-chrome-extension/creating-a-chrome-extension.jpg'
thumbnailPhoto: '/img/blog/2020-05_creating-a-chrome-extension/creating-a-chrome-extension.jpg'
canonicalUrl: https://juanguijordan.com/blog/2020-05_creating-a-chrome-extension
---

En este post, te mostraré cómo crear una simple [Chrome extension](https://chrome.google.com/webstore/category/extensions). Resumiré lo que una extensión de Chrome puede hacer, y también voy a explicar cómo crear extensiones más complejas basadas en JavaScript, React, Angular o Vue.

¿Qué es una extensión de Chrome? Las extensiones de Google Chrome son como pequeñas aplicaciones que viven en tu navegador, basadas en tecnologías web estándar, como HTML, CSS y JavaScript. Aprovechan algunas API de Chrome, proporcionando las bases para construir una aplicación, como el almacenamiento y la mensajería. Las extensiones de Google Chrome pueden interactuar con las páginas web abiertas en las pestañas de tu navegador, pero en realidad no están pensadas para ello. Pueden "vivir" por sí solas y proporcionar cualquier tipo de funcionalidad, más allá de la experiencia de navegación. Puedes crear cualquier cosa, desde una agenda, pasando por un temporizador pomodoro, hasta un web image scrapper. Puedes pensar en Chrome como la plataforma Electron, proporcionando una base para construir aplicaciones JavaScript que pueden interactuar con la experiencia de navegación.

Las extensiones de Chrome pueden permanecer inactivas hasta que algún trigger las despierte, haciendo que se inyecte algún contenido o script, se ejecute o se muestre algún popup. Estos scripts viven en algo llamado "Mundos Aislados" en relación con las páginas web que se están navegando, lo que significa que una extensión de Chrome sólo puede compartir el DOM con una página en particular, pero no las variables o funciones del script. Por lo tanto, las extensiones de Chrome pueden modificar el DOM, inyectar scripts CSS o JavaScript adicionales que interactúan con el mismo DOM, pero no pueden modificar directamente la página original CSS o JavaScript. Por otro lado, las extensiones pueden comunicarse con la página a través de mensajes, por lo que puede crear una página que interactúe con una extensión de Chrome.

## Capacidades de la extensión

Este es un resumen incompleto de lo que puede hacer una extensión:

- **Mostrar un icono**. El icono de la extensión puede ser modificado en tiempo de ejecución, o mostrar una insignia sobre él, con un fondo de color y un texto de 4 letras en él.
- **Mostrar un popup**. Al hacer clic en el icono de la extensión se puede activar un popup con contenido.
- **Mostrar un menú secundario**. Haciendo clic con el botón derecho del ratón en el icono de la extensión puede activar un menú secundario.
- **Responder a atajos de teclado**. Los atajos de teclado pueden asociarse a las acciones de extensión (CTRL+SHIFT+V).
- **Responder a acciones de la barra de direcciones** (la así llamada omnibox). Los atajos de texto pueden usarse en la omnibox para activar acciones en la extensión (p.ej. “myext+<TAB>").
- **Responder a la visita a cierta página web**. Por ejemplo, modificar el estado del icono o el contenido de la ventana emergente
  Modifica el contenido de un sitio web. Por ejemplo, modificar el DOM por un script de contenido o aplicar archivos CSS adicionales.
- **Tener una página de opciones** para la configuración de la extensión.
- **Reemplazar la página de Historial, Favoritos o Nueva Pestaña** de Google Chrome.
- **Intercambiar mensajes** con un sitio web o consigo mismo. Una extensión puede utilizar la mensajería para hablar con alguna página web que se esté navegando, o para comunicarse entre partes de la propia extensión.
- **Almacenar información** en el almacenamiento local, el almacenamiento Chrome (almacenamiento que se sincroniza a través de diferentes dispositivos donde el usuario está conectado) o cualquier almacenamiento nativo de JS, por ejemplo sessionStoragef.
- **Mostrar notificaciones** como un "toast".
- **Usar varias APIs proporcionadas por Google Chrome**.
- **Ser gratis, o de pago**. Al crear una extensión de pago, puedes elegir usar la tienda Chrome o tus propios medios de pago.

## Lo básico

El único archivo obligatorio de una extensión de Chrome es el manifiesto. Debe estar colocado en el directorio raíz, y comunica los metadatos de la extensión, los permisos y otros archivos involucrados.

El formato del manifiesto tiene un montón de opciones, que se pueden ver en esta página (https://developer.chrome.com/extensions/manifest), pero nos centraremos en los más importantes. Presentemos el manifiesto de la extensión "Cat detector":

```json
{
  "name": "Cat detector",
  "description": "Spots cats in the page you are browsing",
  "manifest_version": 2,
  "version": "1.0",
  "background": {
    "persistent": false,
    "scripts": ["background.js"]
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ],
  "browser_action": {
    "default_popup": "popup.html"
  },
  "icons": {
    "16": "images/footprint-16.png",
    "32": "images/footprint-32.png",
    "48": "images/footprint-48.png",
    "128": "images/footprint-128.png"
  },
  "permissions": ["activeTab"]
}
```

El manifiesto declara algunas capacidades que serán utilizadas por la extensión:

- Declara un background script. Los background scripts pueden activarse en cualquier momento, pero no tienen acceso directo al contenido de los tabs.
- Declara un content script. Los scripts de contenido se implementan en la misma página en la que se está navegando y tienen acceso al contenido. Una expresión de coincidencia es usada para determinar cuándo el script es inyectado. En este caso elegimos `<all urls>`, lo que significa que se implementa en cualquier página web.
- Declara una acción del navegador, es decir, una extensión que es capaz de funcionar independientemente de la página por la que se está navegando. Si quisiéramos crear una extensión que sólo se activa cuando se cumplen algunas condiciones en la página que se está navegando, utilizaríamos una "page action". La razón por la que elegimos la acción de navegación es que los gatos se pueden ver casi en todas partes en Internet. Una segunda razón es que queremos mostrar un badge sobre el icono de la extensión, y eso sólo es posible usando una acción del navegador.
- Dentro de la acción del navegador, declara un popup que se abrirá al hacer clic en el icono de la extensión.
- Declara los iconos. Los más pequeños se utilizan para el icono del navegador, dependiendo de la resolución de la pantalla, y los más grandes se usan en el menú de extensiones de Chrome y el Chrome Store.

## Nuestra extensión de ejemplo

Vamos al grano de este post: esta page action utiliza un background script que, al cargar la página, envía un mensaje al content script, que a su vez cuenta el número de veces que las palabras "cat", "kitten" o "kitty" aparecen en nuestra página. Después de recibir una respuesta, la tarea de background muestra un badge sobre el icono para comunicar el número de gatitos que aparecen. Al hacer clic en el icono de la extensión, se mostrará un popup con una imagen de un gatito feliz junto con el contador.

Echemos un vistazo a la estructura de los archivos de extensión:

```
-audios
 |-meow_0.mp3
 |-meow_1.mp3
 |-meow_2.mp3
 |-meow_3.mp3
 |-meow_4.mp3
 |-meow_5.mp3
 |-meow_6.mp3
-images
 |-footprint-16.png
 |-footprint-32.png
 |-footprint-48.png
 |-footprint-128.png
-background.js
-content.js
-manifest.js
-popup.html
-popup.js
```

Incluye los iconos de extensión, algunos archivos de audio, el manifiesto, el background script, el content script y los archivos del popup html y js.

Así queda el background script. Se han incluido comentarios para señalar las cosas importantes:

```
const maxMeows = 6;

// The extension listens to the onUpdated event, and executes when the page is loaded
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    detectCats(tabId);
  }
});

// It executes the cat detection as well when we switch tabs on the active tab
chrome.tabs.onActivated.addListener((activeTab) => detectCats(activeTab.tabId));

const detectCats = (tabId) => {
  // Here we clear the badge
  chrome.browserAction.setBadgeText({ text: "" });
  // Then we send a message to the content script, together with a callback
  chrome.tabs.sendMessage(tabId, { text: "cat_count" }, onCatCount);
};

// This is the callback called by the content script
const onCatCount = (catNumber) => {
  if (!catNumber) {
    deactivateIcon();
  } else {
    // When cats are detected, show an animation on the badge
    animateBadge(catNumber);
  }
};

const deactivateIcon = () => {
  // Here we detect what the active tab is and disable the action
  chrome.tabs.query({ active: true, currentWindow: true }, (activeTab) => {
    chrome.browserAction.disable(activeTab[0].id);
  });
};

const animateBadge = (catNumber) => {
  // Limit meows, we don't want 1000 sounds to be played
  let i = catNumber - maxMeows > 0 ? catNumber - maxMeows : 1;
  let j = 0;
  // Cats will meow at random times
  for (; i <= catNumber - 1; i++, j++) {
    updateBadge(i, j * Math.random() * 400);
  }
  // Last cat should come last, let's give it the highest delay
  updateBadge(catNumber, j * 500);
};

const updateBadge = (catIndex, delay) => {
  // After some specified delay display a number on the badge and play a meow sound
  setTimeout(() => {
    (
      new Audio(chrome.runtime.getURL(`audios/meow_${catIndex % 7}.mp3`))
    ).play();
    chrome.browserAction.setBadgeText({ text: catIndex.toString() });
  }, delay);
};
```

El content script básicamente recibe el mensaje `cat_count` y responde a él. Se ha incluido algo de lógica para contar los gatos con una expresión regex:

```
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.text === "cat_count") {
    sendResponse(countCats());
  }
});

const countCats = () => {
  var content =
    document.body["innerText" in document.body ? "innerText" : "textContent"];
  content = removeScriptsFromContent(content);
  var regex = /(cat|cats|kitten|kittens|kitty|kitties)[\s.,]/gi;

  return content.match(regex)?.length || 0;
};

const removeScriptsFromContent = (strCode) => {
  return strCode.replace(/<script.*?>.*?<\/script>/gim, "");
};
```

El archivo html del popup simplemente muestra una imagen y declara el fichero javascript:

```
<html>
  <body>
    <img id="cat_image" />
    <script src="popup.js"></script>
  </body>
</html>
```

El archivo js ejecuta una función en la carga que a su vez envía un mensaje al content script para contar gatos de nuevo. Esto se debe a que los popups no "viven" hasta que se abren, así que si hay que hacer alguna actualización en el popup, es el popup el que debe iniciar la acción:

```
window.onload = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (activeTab) => {
    const tabId = activeTab[0].id;
    chrome.tabs.sendMessage(tabId, { text: "cat_count" }, onCatCount);
  });
};

const onCatCount = (catNumber) => {
  document.getElementById(
    "cat_image"
  ).src = `https://cataas.com/c/s/${catNumber}%20happy%20cats%20detected?t=sq&width=350`;
};
```

ChanChanChan, este es el resultado de la extensión del detector de gatos en acción:

![Cat extension](/img/blog/2020-05_creating-a-chrome-extension/cat_extension.png)

## Probando localmente nuestra extensión

Si quieres probar tu extensión en tu máquina local, sólo tienes que ir al menu item More Tools —> Extensions, luego hacer click en Load Unpacked, y seleccionar la carpeta donde está tu manifiesto y el resto de los archivos.

![Loading the extension for testing](/img/blog/2020-05_creating-a-chrome-extension/load_extension.png)

## Debugging

El proceso de debugging se vuelve particularmente compleja ya que cada extensión debe ser inspeccionada de manera diferente.

En cuanto a los background scripts, se inspeccionan en las extensiones. Para abrir las herramientas de desarrollo es necesario hacer clic en el enlace "página en segundo plano" en los detalles de la extensión.

![Opening the extension dev tools](/img/blog/2020-05_creating-a-chrome-extension/extension_info.png)

Los content scripts se inspeccionan en la página web que estás navegando, ya que se inyectan en la página. Se muestran en una pestaña de **Content Scripts**.

![Debugging content scripts](/img/blog/2020-05_creating-a-chrome-extension/debugging_content_scripts.png)

No pude encontrar la forma de inspeccionar los popup scripts, incluso los logs de la consola se perdían en algún lugar, así que mostrar una alerta fue la única forma de comprobar que el popup estaba "vivo" y activo.

## Publicando la extensión

Para publicar una extensión de Google Chrome es necesario registrarse como desarrollador de Chrome, pagar 5 dólares y rellenar algunos datos sobre el nombre de la extensión, la descripción y las imágenes o vídeos. El proceso es muy similar al que se sigue para publicar una aplicación en Google Play. Después de enviar tu extensión para la aprobación, tienes que esperar una respuesta. Las respuestas negativas son bastante rápidas -mi primera extensión fue rechazada sin razón alguna, y tuve que enviar un correo electrónico para pedir una revisión humana-, las positivas pueden tardar unas horas o días.

## Ir más allá...

El sitio de desarrollo de Chrome para extensiones proporciona un gran número de extensiones de muestra. Estas son extensiones simples que abordan características muy específicas que pueden ayudar a aprender a construir extensiones.

https://developer.chrome.com/extensions/samples

Hay muchos proyectos de boilerplate por ahí para ayudarte a desarrollar extensiones más complejas usando React, Angular o Vue. Toma los siguientes enlaces como punto de partida:

- https://github.com/lxieyang/chrome-extension-boilerplate-react
- https://github.com/larscom/ng-chrome-extension
- https://github.com/Kocal/vue-web-extension

## Recap

Crear extensiones de Chrome puede ser divertido, y también puedes encontrar muchos escenarios productivos para ellas. Desarrollar extensiones es fácil si conoces las tecnologías web básicas como HTML, CSS y JavaScript. Te mostramos los fundamentos de una extensión de Chrome y te guiamos en la creación de una simple extensión.

Si quiere comprobar el código de extensión completo, ¡échale un vistazo! [github repository](https://github.com/jguix/chrome-cat-detector).

¿Puedes imaginarte algo que pueda ser entregado como una extensión de Chrome? Compártenos tu idea...

## Crédits

Fotografía de Markus Winkler en [Unsplash](https://unsplash.com/).
