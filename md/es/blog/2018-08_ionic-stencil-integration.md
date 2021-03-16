---
title: "Usando componentes web generados con Stencil en Ionic"
excerpt: "Esta publicación tiene como objetivo proporcionar instrucciones claras sobre cómo usar componentes creados y compilados con Stencil en una aplicación Ionic. Te guiaré en el proceso de hacer que un componente web esté disponible en tus templates Ionic, sin necesidad de registrarlos en el registro npm o agregar feos tags script a tu índice."
published: true
datePublished: 1536735600000
date: "2018-09-12T10:00:00.000Z"
author: Juangui Jordán
tags:
  - javascript
authorPhoto: /img/authors/jguix.jpeg
bannerPhoto: "/img/blog/2018-08_ionic-stencil-integration/ionic-stencil-integration.jpg"
thumbnailPhoto: "/img/blog/2018-08_ionic-stencil-integration/ionic-stencil-integration.jpg"
canonicalUrl: https://juanguijordan.com/blog/2018-08_ionic-stencil-integration
---

Esta publicación tiene como objetivo proporcionar instrucciones claras sobre cómo usar componentes creados y compilados con Stencil en una aplicación Ionic. Te guiaré en el proceso de hacer que un componente web esté disponible en tus templates Ionic, sin necesidad de registrarlos en el registro npm o agregar feos tags script a tu índice.

## Motivación

Creado por el [equipo de Ionic Framework](http://ionicframework.com/), uno esperaría que el uso de componentes web Stencil en proyectos Ionic sería, si no automático e integrado en el framework mediante algún comando CLI, al menos bien documentado.

Bueno, ese no es el caso, ya que los chicos de Ionic proporcionan [instrucciones de integración del framework](https://stenciljs.com/docs/framework-integration) para Angular, React, Vue y Ember, pero no los proporcionan para Ionic. Tal vez descuidé algo obvio, pero tuve que investigar un poco para que mis componentes Stencil funcionaran en un proyecto Ionic, y el esfuerzo fue lo suficientemente grande como para hacerme pensar en crear una publicación, esperando que pueda ayudar a alguien.

## Requisitos

Como requisito, debes crear un componente Stencil, una tarea para la que puedes encontrar la documentación adecuada en el sitio web de Stencil. El componente Stencil tampoco necesita estar registrado en el registro npm.

## Proceso de integración

Si integramos componentes web registrados en npm, el proceso es más sencillo. Afrontemos en esta sección el caso en el que desarrollamos un componente personalizado, pero no lo estamos publicando en el registro npm. Nuestro objetivo es una integración limpia sin etiquetas de script en el archivo `index.html`.

El proceso consta de tres pasos.

- Primero construimos el componente y copiamos los archivos de distribución a nuestro proyecto.
- Luego le decimos al lado Angular de las cosas cómo usar el componente.
- Por último, le decimos al lado Ionic de las cosas que incluya el componente cuando construya el paquete. La forma en que hablamos con Angular (realmente Ionic-Angular) depende de si estamos cargando páginas de forma _anticipada_ o de forma _diferida_.

### Paso 1. Generar y copiar componente

Construya el componente y copie el contenido de la carpeta dist a una carpeta en nuestro proyecto. En este ejemplo, elegimos la carpeta `@img/lib/components/my-google-maps`.

### Paso 2. Importar en el app.module.ts

Primero, necesitas importar el `CUSTOM_ELEMENTS_SCHEMA`, y agregarlo a la sección` schemas` del `@NgModule`. Si importas `CUSTOM_ELEMENTS_SCHEMA` en uno de los módulos de tu página, el compilador Angular aceptará elementos que no reconoce (de lo contrario, arrojará un error). Si realizas una carga diferida, debes importar este esquema en cada módulo de página en el que desees utilizar el componente web. Si estás cargando con anticipación, solo necesitas importar el esquema en `app.module.ts`.

Luego, agrega un import a la carpeta `dist/mycomponent`. Este import no carga todo el componente web. Solo carga una pequeña parte del código que permite a Ionic cargar el componente web completo más tarde, cuando una plantilla lo solicita.

Cuando hayas realizado ambos pasos, tu `app.module.ts` debería parecerse al siguiente si estás cargando con anticipación.

```typescript
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"; // add this import
import "@img/lib/components/my-google-maps/dist/mycomponent"; // add this import

@NgModule({
  declarations: [],
  imports: [],
  bootstrap: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // add this line
})
export class AppModule {}
```

Si usas lazy loading, importa solo el componente web en `app.module.ts`, y solo el esquema en los módulos individuales cargados de forma diferida.

### Paso 3. Usar ionic-app-scripts para incluir el componente en el build

Crearemos un archivo `copy.config.js` que definirá algunas reglas para copiar el componente web a nuestra compilación final. Una buena práctica es crearlo en una carpeta de configuración, para separarlo de otros archivos estándar como `package.json` o `ionic.config.json`.

Este archivo puede indicarle a los scripts de aplicaciones Ionic que incluyan contenido adicional cuando compile una aplicación iónica. Si creas el archivo, ponlo en una carpeta llamada `config` que esté en el mismo nivel de directorio que la carpeta `src`. En primer lugar, declaremos el archivo en `package.json`. Esto le dirá a los scripts de la aplicación que usen este archivo. Agrega el siguiente campo a tu `package.json`:

```json
"config": {
    "ionic_copy": "./config/copy.config.js"
}
```

Luego, pon esto dentro de `config\copy.config.js`:

```javascript
module.exports = {
  copyTimeAgoWebComponent: {
    src: [
      "{{ROOT}}/src/img/lib/components/my-google-maps/dist/mycomponent**/*",
    ],
    dest: "{{BUILD}}",
  },
};
```

Una vez que hayas realizado esos cambios, los app-scripts sabrán cómo incluir el componente web en sus compilaciones.
Ahora puedes utilizar componentes web Stencil en tus plantillas Ionic como cualquier otro componente web.
