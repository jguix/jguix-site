---
title: "Desplegando un proyecto Angular CLI en Github Pages y Stackblitz"
description: "Aprende a implementar fácilmente un proyecto angular CLI en Github Pages, así como a compartir una versión en live edit mode con Stackblitz"
published: true
datePublished: 1522047600000
date: "2018-03-26T10:00:00.000Z"
author: Juangui Jordán
tags:
  - javascript
authorPhoto: /img/authors/jguix.jpeg
bannerPhoto: "/img/blog/2018-03_angular-cli-github-pages-stackblitz/angular-cli-github-pages-stackblitz.jpg"
thumbnailPhoto: "/img/blog/2018-03_angular-cli-github-pages-stackblitz/angular-cli-github-pages-stackblitz.jpg"
canonicalUrl: https://juanguijordan.com/blog/2018-03_angular-cli-github-pages-stackblitz
---

¿Estás ansioso por mostrarle al mundo tu prueba de concepto, proyecto paralelo, idea…?
Esta receta de bash de 5 líneas pondrá tu trabajo en el escaparate en cuestión de segundos.

Así que acabas de terminar de crear el proyecto más genial con [Angular CLI](https://cli.angular.io/) y quieres compartirlo con tus colegas, o quizás escribir una publicación al respecto, pero quieres evitarles a tus colegas el dolor de bajarse el código, instalar dependencias y ejecutar la aplicación (lo sé, casi no puede ser más fácil hoy en día) y no tienes un servidor web, o tal vez eres tan vago como tus colegas y no te apetece poner mucho esfuerzo en desplegar el código en algún sitio.

Bien, ¡[Github Pages](https://pages.github.com/) al rescate!

## GitHub Pages

Voy a asumir que ya creaste el proyecto con Angular CLI, por lo que tu proyecto ya está versionado con git.
Supongamos también que ya tienes una **cuenta de GitHub** con cierto `NICKNAME`.
Dirígete a GitHub y crea un nuevo proyecto, llamémoslo `MY_PROJECT`.
No coloques ningún archivo en él, puedes volver más tarde y agregar el `README` y la licencia deseada,
pero por ahora será más fácil si lo dejas en blanco.

Luego, conecta tu repositorio de git local con el nuevo repositorio remoto y haz push de los cambios:

```bash
git remote add origin https://github.com/NICKNAME/MY_PROJECT.git
git push origin master
```

Ahora, si ya conocíaa GitHub Pages, estarás tentado a activarlas manualmente en el archivo `index.html` de tu proyecto.
**¡NO HAGAS ESO! ¡¡No funcionará!!**

Tu proyecto aún debe ser generado para producción,
lo cual creará una carpeta `dist` desde la cual podrás servir tus páginas de GitHub, pero **¡NO LO HAGAS! ¡¡¡No funcionará!!!**

Parece que GitHub Pages no son adecuadas para SPA, ya que redirigen las rutas de su aplicación a una página 404.
Pero algunos tipos muy majos desarrollaron [angular-cli-ghpages](https://www.npmjs.com/package/angular-cli-ghpages).
Este paquete npm llenará los huecos y hará que tu aplicación funcione en GitHub Pages.

Instálalo con:

```bash
npm install -g angular-cli-ghpages
```

Luego ejecuta estos 2 comandos:

```bash
ng build --prod --base-href "https://NICKNAME.github.io/MY_PROJECT/"
angular-cli-ghpages
```

El segundo comando tiene un montón de opciones, pero todas son opcionales como dice la palabra `option`,
y no necesitas mucho más para poner en marcha tu aplicación en GitHub Pages. ¡A disfrutar!

Bueno, ciertamente necesitarás la URL de tu aplicación para compartirla con el mundo.
Esta URL es exactamente la que usamos en el comando `ng build`:  
[https://NICKNAME.github.io/MY_PROJECT/](#)

### Desplegando proyectos Ionic

Actualización: 2018-05-07

¿Qué pasa con los proyectos Ionic?
Se despliegan en `www` en lugar de la carpeta `dist`, y usan Ionic CLI en lugar de Angular CLI,
por lo que será necesario realizar un par de cambios.

```bash
ionic build --prod
```

El `--base-href` no está disponible en Ionic CLI (que yo sepa),
por lo que deberá abrir el archivo `index.html` y escribir la etiqueta base por tu cuenta, una vez finalizada la compilación.
Puedes ponerlo después de la etiqueta del título, por ejemplo:

```html
<title>Ionic App</title>
<base href="https://NICKNAME.github.io/MY_PROJECT/" />
<meta
  name="viewport"
  content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
```

Ahora, como dije, la salida de la compilación no es la predeterminada para Angular CLI, que sería la carpeta `dist`.
Usa el flag `--dir` para especificar la carpeta `www` como fuente para las páginas de GitHub.

```bash
angular-cli-ghpages --dir www
```

## Stackblitz

Ahora, para la parte de [Stackblitz](https://stackblitz.com/) del post… ¿no sería bueno permitir que nuestros colegas o seguidores interactúen realmente con nuestro código y vean el impacto de las modificaciones en casi-tiempo-real?

Los chicos de Stackblitz han creado este tipo de IDE en línea donde puedes crear proyectos y ver la generación al mismo tiempo.
¡Es como **JSfiddler** con esteroides!

![Stackblitz](/img/blog/2018-03_angular-cli-github-pages-stackblitz/stackblitz.png)

Aún más simple que registrarte en Stackblitz, crear un proyecto y cargar los archivos de tu proyecto,
este truco de una línea cargará tu proyecto de GitHub en el IDE de Stackblitz.

Simplemente comparte esta URL, usando nuevamente tu apodo de GitHub y el nombre del proyecto:  
[https://stackblitz.com/github/NICKNAME/MY_PROJECT](#)

Esto también es válido para ramas, etiquetas o commits específicos. Simplemente use el siguiente esquema para la URL:  
[https://stackblitz.com/github/NICKNAME/MY_PROJECT/tree/{TAG|BRANCH|COMMIT}](#)

Espero que esta publicación te haya ayudado a publicar tus proyectos en un lugar donde otros puedan verlos, disfrutarlos y editarlos.
