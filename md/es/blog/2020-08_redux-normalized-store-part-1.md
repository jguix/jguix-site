---
title: 'Usando redux con datos relacionales (1/3)'
description: 'En esta serie de posts crearemos una aplicación usando react y redux, en la que manejaremos datos relacionales. En esta primera parte modelaremos la store.'
published: true
datePublished: '2020-11-03T09:00:00.000Z'
author: Juangui Jordán
tags:
  - javascript
  - frontend
authorPhoto: /img/authors/jguix.jpeg
authorTwitter: jguixer
bannerPhoto: '/img/blog/2020-08_redux-normalized-store-part-1/redux-normalized-store-part-1.jpg'
thumbnailPhoto: '/img/blog/2020-08_redux-normalized-store-part-1/redux-normalized-store-part-1.jpg'
canonicalUrl: https://juanguijordan.com/blog/2020-08_redux-normalized-store-part-1
---

## Parte 1. Modelando la store de redux

En esta serie de posts crearemos una aplicación usando **react** y **redux**, en la que manejaremos datos relacionales. En esta primera parte modelaremos la store.

A menudo, los tutoriales sobre redux son demasiado simples y manejan una estructura de datos plana. Es el caso de la típica app de TODOs (lista de tareas), o una lista de la compra, etc. En estos casos solemos tener unos pocos reducers, los cuales son independientes entre sí.

Por ejemplo:

- La lista de TODOs, incluyendo el estado de cada tarea.
- El valor de un filtro de mostrar/ocultar, por ejemplo, "ocultar completas".
- El valor de un filtro de orden, por ejemplo, "ordenar por fecha de creación ascendente".

En un caso así de simple, la store no tiene que manejar relaciones, y se puede representar en un objeto similar a este:

```json
{
  "todos": [
    {
      "id": 1,
      "completed": true,
      "creationDate": "2020-08-07",
      "description": "Create github repo"
    },
    {
      "id": 2,
      "completed": false,
      "creationDate": "2020-08-11",
      "description": "Finish part 1 of this post"
    },
    {
      "id": 3,
      "completed": false,
      "creationDate": "2020-08-12",
      "description": "Create part 2"
    }
  ],
  "filterBy": "completed",
  "orderBy": "date-asc"
}
```

Sin embargo, las aplicaciones reales suelen ser más complejas. Algunos datos dependen de otros y existen jerarquías: relaciones uno a uno, uno a muchos y muchos a muchos. Esto nos va a presentar varios retos, tanto en la representación del estado en la store, como en la eficiencia de la comunicación con el backend.

Para ilustrarlo, usaremos el ejemplo de una red social. Las entidades principales que manejaremos son usuarios, posts y comentarios. Los usuarios podrán crear posts, y los posts podrán contener comentarios de otros usuarios. Simple, ¿verdad?

Veamos en primer lugar algunos de los diseños de nuestra red social, para modelar estos datos.

La página inicial de nuestra red social será **Mi Muro**, la página donde aparecen mis posts y los de todos mis amigos, con sus respectivos comentarios.

![My Wall](/img/blog/2020-08_redux-normalized-store-part-1/my_wall.png)

También habrá una página de **Amigos**, donde se listan los usuarios que son contactos directos míos.

![My Friends](/img/blog/2020-08_redux-normalized-store-part-1/my_friends.png)

Desde esta página, si pulso sobre uno de mis amigos visitaré el **Muro del amigo**, esto es, una página donde aparecerán sus posts, junto con los comentarios de otros usuarios.

![Friend Page](/img/blog/2020-08_redux-normalized-store-part-1/friend.png)

Cada post incluirá el avatar y nombre del usuario, y la fecha. Cada comentario incluirá también el avatar, nombre del usuario y la fecha.

![Posts and comments](/img/blog/2020-08_redux-normalized-store-part-1/post_and_comments.png)

Sin entrar en las relaciones o jerarquías, podemos definir los tipos de las entidades como usuario (`User`), post (`Post`) y comentario (`Comment`):

```typescript
// user.types.ts
export type User = {
  avatar: string;
  email: string;
  id: number;
  name: string;
};

// post.types.ts
export type Post = {
  body: string;
  date: Date;
  id: number;
};

// comment.types.ts
export type Comment = {
  body: string;
  date: Date;
  id: number;
};
```

Una representación extremadamente simple, basada en la aplicación de los TODOs, consiste en tener un reducer por cada tipo de entidad:

```json
{
  users: [
    { id: 1, name: "Josh", email: "josh@gmail.com", avatar: "josh.jpg" },
    { id: 2, name: "Anne", email: "anne@gmail.com", avatar: "anne.jpg" },
    { id: 3, name: "Mike", email: "mike@gmail.com", avatar: "mike.jpg" },
  ],
  posts: [
    {
      id: 1,
      body: "hi all",
      date: "2020-08-01",
      user: { id: 2, name: "Anne", email: "anne@gmail.com", avatar: "anne.jpg" },
    }
  ],
  comments: [
    {
      {
        id: 1,
        body: "hello!",
        date: "2020-08-02",
        user: { id: 1, name: "Josh", email: "josh@gmail.com", avatar: "josh.jpg" },
      },
      {
        id: 2,
        body: "hi there!",
        date: "2020-08-02",
        user: { id: 3, name: "Mike", email: "mike@gmail.com", avatar: "mike.jpg" },
      },
    }
  ],
}
```

Si entro en la página de **Friends** la store almacena los amigos en `users`; si entro en la página de un amigo la store almacena los posts en `posts`, y si muestro un post, los comentarios se almacenan en `comments`.

Esta estrategia me va a obligar a traerme todos los posts del backend cada vez que cambie al muro de un amigo distinto, y además no va a funcionar porque en las páginas de **Amigo** y **Mi muro** debo mostrar varios posts a la vez, donde cada post tiene distintos comentarios. Según la store diseñada arriba, todos los posts visualizados mostrarían siempre los mismos comentarios.

Para evitar este problema podríamos anidar los comentarios dentro de los posts, así:

```json
{
  users: [
    { id: 1, name: "Josh", email: "josh@gmail.com", avatar: "josh.jpg" },
    { id: 2, name: "Anne", email: "anne@gmail.com", avatar: "anne.jpg" },
    { id: 3, name: "Mike", email: "mike@gmail.com", avatar: "mike.jpg" },
  ],
  posts: [
    {
      id: 1,
      body: "hi all",
      date: "2020-08-01",
      user: { id: 2, name: "Anne", email: "anne@gmail.com", avatar: "anne.jpg" },
      comments: [
        {
          {
            id: 1,
            body: "hello!",
            date: "2020-08-02",
            user: { id: 1, name: "Josh", email: "josh@gmail.com", avatar: "josh.jpg" },
          },
          {
            id: 2,
            body: "hi there!",
            date: "2020-08-02",
            user: { id: 3, name: "Mike", email: "mike@gmail.com", avatar: "mike.jpg" },
          },
        }
      ],
    }
  ],
}
```

Sin embargo, todavía tenemos varios problemas. No estamos cacheando datos, por ejemplo, si navego de un amigo a otro y vuelvo al primero, tendré que cargar de nuevo todos los posts y comments del backend. También hay muchos datos replicados, como los usuarios, ocupando más espacio del necesario.

Lo ideal sería normalizar la store, como se recomienda en la [documentación de redux](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape). Podríamos pensar algo así, donde a cada entidad hemos añadido uno o varios ids (`userId`, `postId`) que apuntan a las entidades con las que está relacionada:

```json
{
  users: [
    { id: 1, name: "Josh", email: "josh@gmail.com", avatar: "josh.jpg" },
    { id: 2, name: "Anne", email: "anne@gmail.com", avatar: "anne.jpg" },
    { id: 3, name: "Mike", email: "mike@gmail.com", avatar: "mike.jpg" },
  ],
  posts: [
    {
      id: 1,
      body: "hi all",
      date: "2020-08-01",
      userId: 2,
    }
  ],
  comments: [
    {
      {
        id: 1,
        body: "hello!",
        date: "2020-08-02",
        postId: 1,
        userId: 1,
      },
      {
        id: 2,
        body: "hi there!",
        date: "2020-08-02",
        postId: 1,
        userId: 3,
      },
    }
  ],
}
```

De esta forma aplanamos la store y evitamos los datos replicados. Sin embargo, la búsqueda por id del usuario asociado a cada post o comentario, y la búsqueda de todos los comentarios asociados a un post no va a ser nada óptima, ya que nos va a obligar a recorrer todos los usuarios o comentarios y filtrar por id. Cuando la store crezca durante una sesión, este proceso se va a volver más y más lento e impactará a la experiencia de usuario.

Podemos mejorar esto indexando cada dato, como se sugiere en la documentación de redux.

```json
{
  "users": {
    "byId": {
      "1": {
        "id": 1,
        "name": "Josh",
        "email": "josh@gmail.com",
        "avatar": "josh.jpg"
      },
      "2": {
        "id": 2,
        "name": "Anne",
        "email": "anne@gmail.com",
        "avatar": "anne.jpg"
      },
      "3": {
        "id": 3,
        "name": "Mike",
        "email": "mike@gmail.com",
        "avatar": "mike.jpg"
      }
    }
  },
  "posts": {
    "byId": {
      "1": {
        "id": 1,
        "body": "hi all",
        "date": "2020-08-01",
        "userId": 2
      }
    }
  },
  "comments": {
    "byId": {
      "1": {
        "id": 1,
        "body": "hello!",
        "date": "2020-08-02",
        "postId": 1,
        "userId": 1
      },
      "2": {
        "id": 2,
        "body": "hi there!",
        "date": "2020-08-02",
        "postId": 1,
        "userId": 3
      }
    }
  }
}
```

Ahora es mucho más sencillo y rápido buscar el `user` asociado a un `post` o un `comment`. Sin embargo, sigue siendo complejo obtener la lista de `posts` por `user`, o la lista de `comments` por `post`. De hecho, ahora es más difícil e ineficiente filtrar estos datos.

Vamos pues a crear estructuras relacionales que nos indiquen qué posts pertenecen a cada usuario (uno a muchos), y qué comentarios a cada post.

```json
{
  users: {
    byId: {
      1: { id: 1, name: "Josh", email: "josh@gmail.com", avatar: "josh.jpg" },
      2: { id: 2, name: "Anne", email: "anne@gmail.com", avatar: "anne.jpg" },
      3: { id: 3, name: "Mike", email: "mike@gmail.com", avatar: "mike.jpg" },
    },
    postIdsById: {
      2: [ 1 ],
    }
  },
  posts: {
    byId: {
      1: {
        id: 1,
        body: "hi all",
        date: "2020-08-01",
        userId: 2,
      }
    },
    commentIdsById: :{
      1:[ 1, 2],
    }
  },
  comments: {
    byId: {
      1: {
        id: 1,
        body: "hello!",
        date: "2020-08-02",
        postId: 1,
        userId: 1,
      },
      2: {
        id: 2,
        body: "hi there!",
        date: "2020-08-02",
        postId: 1,
        userId: 3,
      },
    }
  },
}
```

La lectura del reducer `postIdsById` sería _"el usuario con id 2 tiene el post con id 1"_. La lectura de `commentIdsById` sería _"el post con id 1 tiene los comentarios con ids 1 y 2"_. Ahora ya tenemos todo indexado y la estructura de base de datos está totalmente normalizada.

Únicamente nos faltan estructuras que nos permitan almacenar los ids de los posts que serán visibles en cada muro, ya sea el del usuario o el de sus amigos, así como los ids de los usuarios que deben aparecer en la página de amigos. Incluiremos en la página de amigos un filtro para ordenar alfabéticamente de forma ascendente o descendente.

Para separar las estructuras que modelan entidades que pertenecen a la base de datos, de las estructuras que modelan elementos de la interfaz de usuario, crearemos 2 reducers de mayor nivel, uno llamado `entities` donde almacenaremos **entidades de la base de datos**, y otro llamado `ui` donde almacenaremos todos los **elementos de la interfaz de usuario**.

Este es finalmente el modelo de la store, que evita la replicación de datos, facilita la búsqueda gracias a la indexación, y nos va a permitir cachear los datos ya cargados, ya que las estructuras asociadas a la interfaz de usuario solo almacenan ids, y cualquier entidad ya descargada del backend va a permanecer en la store hasta que borremos la caché del navegador.

```json
{
  entities: {
    users: {
      byId: {
        1: { id: 1, name: "Josh", email: "josh@gmail.com", avatar: "josh.jpg" },
        2: { id: 2, name: "Anne", email: "anne@gmail.com", avatar: "anne.jpg" },
        3: { id: 3, name: "Mike", email: "mike@gmail.com", avatar: "mike.jpg" },
      },
      postIdsById: {
        2: [ 1 ],
      },
    },
    posts: {
      byId: {
        1: {
          id: 1,
          body: "hi all",
          date: "2020-08-01",
          userId: 2,
        },
      },
      commentIdsById: :{
        1: [ 1, 2 ],
      },
    },
    comments: {
      byId: {
        1: {
          id: 1,
          body: "hello!",
          date: "2020-08-02",
          postId: 1,
          userId: 1,
        },
        2: {
          id: 2,
          body: "hi there!",
          date: "2020-08-02",
          postId: 1,
          userId: 3,
        },
      },
    },
  },
  ui: {
    friends: {
      orderFilter: "asc",
      userIds: [ 2, 3 ],
    },
    friendWall: {
      postIdsById: {
        2: [ 1 ],
      },
    },
    wall: {
      postIds: [ 1 ],
    },
  },
}
```

En próximos posts veremos la implementación de esta store y los métodos de cacheado.

## Credits

Fotografía por [Jeremy Bishop](https://unsplash.com/@jeremybishop) en [Unsplash](https://unsplash.com/).
