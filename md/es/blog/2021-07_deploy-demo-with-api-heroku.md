---
title: 'Desplegar una demo con una API JSON en Heroku'
description: 'En este post presentaré algunos trucos que he aprendido al crear demos para publicaciones de blogs y PoC. Aprenderás a configurar una API usando JSON-server y desplegarlo en el mismo sitio Heroku que la aplicación frontend. También aprenderás a utilizar Faker para generar datos falsos para JSON-server.'
published: true
datePublished: '2021-07-31T09:00:00.000Z'
author: Juangui Jordán
tags:
  - javascript
  - frontend
authorPhoto: /img/authors/jguix.jpeg
authorTwitter: jguixer
bannerPhoto: '/img/blog/2021-07_deploy-demo-with-api-heroku/deploy-demo-with-api-heroku.jpg'
thumbnailPhoto: '/img/blog/2021-07_deploy-demo-with-api-heroku/deploy-demo-with-api-heroku.jpg'
canonicalUrl: https://juanguijordan.com/blog/2021-07_deploy-demo-with-api-heroku
---

En este post presentaré algunos trucos que he aprendido al crear demos para publicaciones de blogs y PoC. Aprenderás a configurar una API usando JSON-server y desplegarlo en el mismo sitio Heroku que la aplicación frontend. También aprenderás a utilizar Faker para generar datos falsos para JSON-server.

A menudo he usado [JSON-server](https://github.com/typicode/json-server) para crear rápidamente una simple API como backend para una demo o prueba de concepto. No me malinterpretes: no estoy animando a nadie a usar esto como servidor de producción, sino solo para ese tipo de proyectos pequeños.

`JSON server` proporciona una API REST completa desde un único archivo `db.json`, que incluye rutas `GET`, `POST`, `PUT`, `PATCH` y `DELETE` para obtener y modificar tus entidades.

En este escenario suelo encontrar dos problemas:

1. Tener suficientes datos. Si creas los datos JSON manualmente, te cansarás después de haber creado 10 entidades. Imagínate si necesitas cientos de entidades con diferentes modelos.

2. Servir los datos. Si deseas implementar tu demo en Heroku, necesitas un sitio para alojar tu aplicación y un segundo para alojar la API.

Con respecto al primer problema, usaremos [Faker](https://github.com/marak/Faker.js) para crear programáticamente el archivo `db.json`. Esto también simplificará la modificación de los modelos, es decir, si el modelo cambia, no es necesario cambiar manualmente varios cientos de entidades.

En cuanto al segundo, usaremos `concurrently` para lanzar las aplicaciones frontend y backend en diferentes puertos, y agregaremos configuraciones específicas para Heroku.

## Inicialización de la app

Para este post vamos a generar una app react de ejemplo. Podríamos hacer configuraciones similares con otros frameworks Javascript.

Creamos una app react con template typescript:

```bash
npx create-react-app json-server-demo --template typescript
```

Vamos a añadir `json-server`, `concurrently` y `axios` como dependencias, y `faker` como dependencia de desarrollo del proyecto:

```bash
yarn
yarn add json-server concurrently axios
yarn add --dev faker
```

Probamos nuestra app de ejemplo:

```bash
yarn start
```

Abre el navegador en [http://localhost:3000/](http://localhost:3000/) y podrás ver la app React de ejemplo.

## Creando la API

Nuestra app de ejemplo mostrará una lista de empleados, con su nombre, email y residencia.

Crearemos un fichero `db.json` con `faker` con no menos de 1000 empleados, porque pensamos a lo grande 😏

Crea un fichero en la carpeta `src/db/index.json` con el siguiente contenido:

```javascript
var fs = require('fs');
var faker = require('faker/locale/es');
faker.locale = 'es';

let employees = [];

for (let i = 1; i <= 1000; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  employees.push({
    address: `${faker.address.streetAddress()}, ${faker.address.zipCode()}, ${faker.address.city()}, ${faker.address.country()}`,
    email: faker.internet.email(firstName, lastName),
    id: i,
    name: faker.name.findName(firstName, lastName),
  });
}

const data = {
  employees,
};

fs.writeFile('src/db/db.json', JSON.stringify(data, null, 2), (err) => {
  if (err) return console.log(err);
  console.log('Created database at src/db/db.json');
});
```

El código es fácilmente legible. Este script creará un archivo `src/db/db.json` con 1000 empleados, generando `name`, `address` e `email` aleatorios para cada empleado. La configuración regional utilizada es `"es"`, esto es, los nombres y correos electrónicos se crearán en español. Presta atención a cómo se crean los campos `name` e `email` usando el mismo `firstName` y `lastName`, para que sean coherentes.

Ahora añadimos el siguiente script a la sección `"scripts"` en el `package.json`:

```json
  "create-db": "node src/db/index.js",
```

Para correr el script, simplemente ejecuta:

```bash
yarn create-db
```

Y ya estamos listos para crear la API `json-server` con nuestra flamante nueva base de datos JSON de empleados.

Podemos probarlo ahora mismo desde la línea de comandos. Usaremos la opción `--port` para configurarlo en el puerto 3001, de modo que no entre en conflicto con nuestra app react que ya se está ejecutando en el puerto 3000:

```bash
json-server src/db/db.json --port 3001
```

Si abres [http://localhost:3001/employees](http://localhost:3001/employees) en tu navegador podrás ver la lista completa de empleados.

```json
[
  {
    "address": "92349 Hurtado Ramal, 88648, Fuengirola Alejandrotown, Gabón",
    "email": "JosEmilio57@gmail.com",
    "id": 21,
    "name": "José Emilio Pizarro"
  },
  {
    "address": "536 Margarita Ronda, 45257, Las Vegas, Eslovenia",
    "email": "Dorotea_Ocasio72@hotmail.com",
    "id": 22,
    "name": "Dorotea Ocasio"
  },
  {
    "address": "69354 Candelaria Chalet, 17110, Archuletaburgh, Sri Lanka",
    "email": "Benjamn_Menchaca65@yahoo.com",
    "id": 23,
    "name": "Sta. Benjamín Menchaca"
  },
  ...
]
```

Puedes también probar varias URLs con parámetros, como paginación o búsqueda completa de texto:

http://localhost:3001/employees/1

http://localhost:3001/employees?\_page=3&\_limit=10

http://localhost:3001/employees?q=Pedro

## Consumiendo la API

Crearemos una simple app que presenta un cuadro de búsqueda y una lista de resultados. Omitiremos el contenido del archivo CSS, que solo agrega algunos estilos a la aplicación. Puedes encontrarlo en el repositorio que se encuentra al final de esta publicación.

```typescript
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

type Employee = {
  address: string;
  email: string;
  id: number;
  name: string;
};

const App = () => {
  const [query, setQuery] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    loadEmployees(1, 20);
  }, []);

  useEffect(() => {
    loadEmployees(1, 20, query.length > 2 ? query : '');
  }, [query]);

  const loadEmployees = async (page: number, limit: number, query = '') => {
    const url = `http://localhost:3001/employees?_page=${page}&_limit=${limit}&q=${query}`;
    const _employees = await axios
      .get<Employee[]>(url)
      .then(({ data }) => data);

    setEmployees(_employees);
  };

  return (
    <div className="App">
      <div className="search_form">
        <label className="search_form--label">Search employees</label>
        <input
          className="search_form--input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        ></input>
      </div>
      <div className="employee_list">
        {employees.map((employee) => {
          return (
            <div className="employee_list--item">
              <div className="employee_list--item-name">{employee.name}</div>
              <div className="employee_list--item-address">
                {employee.address}
              </div>
              <div className="employee_list--item-email">{employee.email}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
```

Así se ve la aplicación.

![Demo application](/img/blog/2021-07_deploy-demo-with-api-heroku/demo_app.png)

## Mejorando la configuración de desarrollo

Hagamos algunos cambios para simplificar el ciclo de desarrollo. Agregaremos la configuración de `proxy` al `package.json`, para que las llamadas de red se redirijan al puerto 3001.

```json
  "proxy": "http://localhost:3001",
```

De este modo podemos simplificar la URL en `App.tsx`:

```typescript
const url = `/employees?_page=${page}&_limit=${limit}&q=${query}`;
```

Ahora podemos reiniciar la app y debería seguir funcionando.

Luego, usaremos `concurrently` para iniciar tanto el backend como el frontend desde un script de una sola línea. Reemplaza el script `start` de `package.json` por lo siguiente:

```json
    "start": "concurrently \"react-scripts start\" \"json-server --watch src/db/db.json --port 3001\"",
```

Ahora puedes parar el proceso del terminal corriendo `json-server src/db/db.json --port 3001`. Simplemente lanza el desde la raíz del proyecto:

```bash
yarn start
```

Y ya está todo listo.

## Desplegando en Heroku

Hacer que tanto el `json-server` como la app se ejecuten en la misma instancia de un servicio como Heroku es más complicado. Por lo general, harían falta dos sitios, uno para el frontend y otro para el backend.

Vamos a beneficiarnos del soporte para servir sitios estáticos de `json-server`.

Primero que nada, construyamos nuestra aplicación `react`.

```bash
yarn build
```

Esto generará una versión estática de la aplicación en `/build`. Luego elimina estas líneas de `.gitignore` para poder subir el sitio estático a nuestro repositorio remoto:

```bash
# production
/build
```

Crea un archivo `server.js` en la raíz del proyecto con el siguiente contenido:

```javascript
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/db/db.json');
const middlewares = jsonServer.defaults({ static: './build' });
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port);
```

Si detienes el script `yarn start` y ejecutas este script localmente, la app se ejecutará desde los archivos estáticos en el directorio `/build`, servida por `json-server`.

```bash
node server.js
```

Esto es exactamente lo que Heroku usará para servir tu aplicación usando un solo sitio.

Ahora, para decirle a Heroku que llame a este `node server.js` necesitas crear un archivo `Procfile` en la raíz de tu repositorio con el contenido:

```
web: node server.js
```

Y esa es toda la configuración que necesitas.

Omitiré la parte en la que debes crear una cuenta de Heroku, agregar una nueva aplicación y conectarla a tu repositorio de Github. Puedes encontrar muchos tutoriales sobre eso por ahí.

Puedes encontrar el código de esta demo en el siguiente enlace:

[https://github.com/jguix/json-server-demo](https://github.com/jguix/json-server-demo)

Y la app desplegada en Heroku:

[https://json-server-demo1.herokuapp.com](https://json-server-demo1.herokuapp.com)

## Netlify y Vercel

Desafortunadamente, no podemos hacer lo mismo en Netlify o Vercel. La razón es que estos servicios no nos permiten ejecutar comandos node, en su lugar deberías crear tu API utilizando funciones serverless. Por supuesto, también puedes alojar allí tu aplicación y tener la API en otro servicio, pero ese no era el objetivo de este artículo.

## Conclusión

Quería reunir todos los pasos que he aprendido creando y alojando apps simples con fines de demostración, incluyendo una API. Esto podría ayudarte a dar los primeros pasos de tu próximo proyecto, alojar una demo para una publicación de blog o impresionar a alguna empresa en una entrevista técnica.

## Créditos

Foto por Austin Neill en [Unsplash](https://unsplash.com/@arstyy).
