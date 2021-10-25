---
title: 'Añadiendo git hooks'
description: 'Esta publicación muestra cómo usar git hooks, para evitar commit o push bajo ciertas circunstancias, y particularmente cómo versionar esos git hooks.'
published: true
datePublished: '2021-06-29T09:00:00.000Z'
author: Juangui Jordán
tags:
  - continuous-engineering
  - javascript
  - java
authorPhoto: /img/authors/jguix.jpeg
authorTwitter: jguixer
bannerPhoto: '/img/blog/2021-06_adding-git-hooks/adding-git-hooks.jpg'
thumbnailPhoto: '/img/blog/2021-06_adding-git-hooks/adding-git-hooks.jpg'
canonicalUrl: https://juanguijordan.com/blog/2021-06_adding-git-hooks
---

Esta publicación muestra cómo usar git hooks, para evitar commit o push bajo ciertas circunstancias, y particularmente cómo versionar esos git hooks.

Git hooks son una colección de disparadores que están vinculados a los comandos de git, como checkout, commit o push. Te permiten ejecutar un script antes/después de que se ejecute realmente el comando git y devuelven un código de salida. En el caso de git hooks que se ejecutan antes, si el código de salida no es cero, el comando git no se ejecutará.

Los git hooks deben usarse en un proyecto versionado con git, ya que no son más que scripts bash que viven en la carpeta `.git/hooks`. Hay hooks del lado del cliente y del lado del servidor. En esta publicación hablaremos sobre los hooks del lado del cliente.

Los git hooks del lado del cliente incluyen:

- **Hooks del Workflow de Commit.** Son hooks que tienen que ver con el proceso de commit: `pre-commit`, `prepare-commit-msg`, `commit-msg` y `post-commit`.

- **Hooks del Workflow de Email.** Usados para un workflow basado en email: `applypatch-msg`, `pre-applypatch` y `post-applypatch`.

- **Otros Hooks de Cliente.** Incluyen: `pre-rebase`, `post-rewrite`, `post-checkout`, `post-merge` y `pre-push`

No entraré en detalles sobre cuál es el uso de cada hook. Puedes encontrar más información sobre el propósito de cada hook y el escenario de activación en [Customizing-Git-Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks).

Solo mencionaré un ejemplo. Algunos proyectos requieren por convención que el mensaje de confirmación incluya un nombre de tarea JIRA, de modo que los miembros del equipo puedan rastrear fácilmente qué commit estaba vinculado a qué tareas en JIRA. Si los nombres de tus tareas de JIRA incluyen todos un prefijo como `PROJ`, eso se puede lograr con un hook `pre-commit` como este:

```sh
#!/bin/bash
MSG="$1"

if ! grep -qE "PROJ" "$MSG";then
    cat "$MSG"
    echo "Your commit message must contain the task name starting with 'PROJ'"
    exit 1
fi
```

La secuencia de comandos anterior devuelve un `1` si el mensaje del commit no incluye la palabra `PROJ`, y eso evitará que se ejecute el commit. Si el mensaje del commit lo incluye, como en `"PROJ-202 - Estilos CSS refactorizados"`, entonces se llevará a cabo el commit.

Quizás te estés preguntando, _"ok, pero cómo puedo almacenar los hooks en mi proyecto versionado con git si se encuentran dentro de la carpeta `.git`"_, y eso es realmente imposible. No puede hacer commit de archivos dentro de ese directorio. Deberías decirle a cada desarrollador de tu proyecto que los copie, o tener un script que copie los hooks, y luego decirle a todos que lo ejecuten. Nada práctico, ¿no?

## Versionado de git hooks en proyectos Javascript

En proyectos Javascript con un `package.json` podemos usar [Husky](https://typicode.github.io/husky) para ocuparnos de los git hooks y su control de versiones dentro del proyecto.

En primer lugar, debemos instalar Husky en el proyecto:

```sh
npx husky-init && yarn
```

Esto agregará un par de cosas en `package.json`:

- la dependencia de husky a nuestra sección `devDependencies`
- un script `prepare` en nuestra sección de `scripts`

La parte `yarn` instalará las dependencias y ejecutará el script `prepare`. Después de eso, se creará un directorio `.husky` en la raíz del proyecto que contiene un ejemplo de hook `pre-commit`, un archivo `.gitignore` y una carpeta `_` con el script `husky.sh`.

Con esa configuración no se necesita copiar manualmente los hooks en la carpeta `.git/hooks`: el script `husky.sh` se encargará de usar los hooks que se encuentran en la carpeta `.husky`.

Ahora puedes editar el hook de muestra `pre-commit`, eliminarlo o crear uno nuevo en la carpeta `.husky`, manualmente o mediante el comando bash `npx husky add`. Por ejemplo, si tuviéramos que crear un hook `pre-push` que ejecute `lint` y `test`, podríamos ejecutar:

```sh
npx husky add .husky/pre-push "yarn lint && yarn test"
```

El resultado será algo como:

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint && yarn test

```

## Versionado de git hooks en proyectos Java con Maven

En cuanto a los proyectos Java administrados por Maven con un archivo `pom.xml`, no pude encontrar nada como Husky.

La mejor solución aquí fue usar el `maven-resources-plugin` para copiar los hooks de un directorio de origen `git-hooks` a la carpeta de destino `.git/hooks`.

Esto es lo que agregué a mi sección `build` en el `pom.xml`:

```xml
<build>
  <plugins>
    <plugin>
      <artifactId>maven-resources-plugin</artifactId>
      <version>3.2.0</version>
      <executions>
        <execution>
          <id>copy-hooks</id>
          <phase>validate</phase>
          <goals>
            <goal>copy-resources</goal>
          </goals>
          <configuration>
            <outputDirectory>${basedir}/.git/hooks</outputDirectory>
            <resources>
              <resource>
                <directory>git-hooks</directory>
              </resource>
            </resources>
          </configuration>
        </execution>
      </executions>
    </plugin>
  </plugins>
</build>
```

Después de eso, llamar al comando `mvn validate` o cualquier otro comando maven que llame a `validate`, como `package`, instalará los hooks en primer lugar.

## Ignorando git hooks

¿Qué pasa si tenemos un git hook que requiere mucho tiempo para ejecutarse y se interpone en nuestro camino para las tareas de programación diarias? Por ejemplo, si tuviéramos un hook `pre-commit` que lanzara nuestras pruebas unitarias y esas pruebas tardaran 30 minutos en ejecutarse, entonces cada vez que hiciéramos commit tendríamos que esperar todo ese tiempo. Es posible que queramos ejecutar las pruebas en el último commit antes del push, y no en cada commit, para ahorrarnos algo de tiempo.

En tales casos, podemos omitir los git hooks, si sabemos lo que estamos haciendo:

```sh
git commit --no-verify -m "An unverifed commit"
```

## Conclusión

Espero que este post te ayude a integrar git hooks en tus proyectos. Pueden ayudar a hacer cumplir algunas políticas y directivas para mejorar los estándares de calidad en tu equipo.

## Créditos

Foto por Anne Nygard en [Unsplash](https://unsplash.com/).
