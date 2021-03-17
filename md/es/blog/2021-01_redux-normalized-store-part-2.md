---
title: "Usando redux con datos relacionales (2/3)"
description: "En esta serie de posts crearemos una aplicación usando react y redux, en la que manejaremos datos relacionales. En esta segunda parte implementaremos la store."
published: true
datePublished: 1611648000000
date: "2021-01-26T09:00:00.000Z"
author: Juangui Jordán
tags:
  - javascript
  - frontend
authorPhoto: /img/authors/jguix.jpeg
bannerPhoto: "/img/blog/2021-01_redux-normalized-store-part-2/redux-normalized-store-part-2.jpg"
thumbnailPhoto: "/img/blog/2021-01_redux-normalized-store-part-2/redux-normalized-store-part-2.jpg"
canonicalUrl: https://juanguijordan.com/blog/2021-01_redux-normalized-store-part-2
---

## Parte 2. Implementando la store de redux

En esta serie de posts crearemos una aplicación usando **react** y **redux**, en la que manejaremos datos relacionales. En esta segunda parte modelaremos la store.

Al final de la anterior parte de esta serie habíamos modelado la tienda. Consulta la parte 1 si necesitas más contexto sobre ello: [Usando redux con datos relacionales (1/3)](https://blog-es.mimacom.com/redux-normalized-store-part-1/).

Nuestra tienda tendrá dos reducers principales, la store `entities` y la store `ui`.

Comencemos por crear la store `entities`. Tendrá 3 tipos de datos o entidades, a saber:

- user
- comment
- post

Cada entidad tendrá asociados tipos, acciones y reducers. En aras de una fácil comprensión, mostraré los tipos y acciones en primer lugar.

Tipos de usuario:

```javascript
// user.types.ts
export type User = {
  avatar: string,
  email: string,
  id: number,
  name: string,
};
```

Las acciones del usuario incluirán una acción para cargar todos los usuarios en la store y una acción para cargar un solo usuario. La primera será llamada potencialmente desde la página `My Friends`, la segunda desde la página `My Wall` o la página `Friend Wall`, donde los posts y los comentarios mostrarán el usuario asociado junto a ellos.

```javascript
// user.actions.ts
import { User } from './user.types';

export enum UserActionTypes {
  LOAD_USER = 'USER:LOAD_USER',
  LOAD_USERS = 'USER:LOAD_USERS',
}

export type LoadUserPayload = {
  user: User;
};

export type LoadUserAction = {
  type: UserActionTypes.LOAD_USER;
  payload: LoadUserPayload;
};

const loadUserAction = (payload: LoadUserPayload): LoadUserAction => {
  return {
    payload,
    type: UserActionTypes.LOAD_USER,
  };
};

export type LoadUsersPayload = {
  users: User[];
};

export type LoadUsersAction = {
  type: UserActionTypes.LOAD_USERS;
  payload: LoadUsersPayload;
};

const loadUsersAction = (payload: LoadUsersPayload): LoadUsersAction => {
  return {
    payload,
    type: UserActionTypes.LOAD_USERS,
  };
};

export const userActions = {
  loadUserAction,
  loadUsersAction,
};
```

De igual manera, tendremos tipos de `post`, donde cada publicación tiene un `userId`, que es la forma en que nuestra base de datos administrará la relación de uno a muchos (pero recuerda que haremos que estos datos sean más fáciles de buscar creando un reducer `postIdsById` dentro del reducer `users`):

```javascript
// post.types.ts
export type Post = {
  body: string,
  date: Date,
  id: number,
  userId: number,
};
```

Las acciones de los `post` solo incluyen una acción para cargar publicaciones por usuario, siendo el `userId` un parámetro opcional. Enviaremos esta acción con el parámetro `userId` informado desde la página` Friend Wall` para obtener todas sus publicaciones. Despacharemos esta acción con el parámetro `userId` con valor `undefined` desde `My Wall` para obtener todas las publicaciones de todos los usuarios (para simplificar, digamos que todos los usuarios son amigos míos).

```javascript
// post.actions.ts
import { Post } from './post.types';

export enum PostActionTypes {
  LOAD_POSTS = 'POST:LOAD_POSTS',
}

export type LoadPostsPayload = {
  posts: Post[];
  userId?: number;
};

export type LoadPostsAction = {
  type: PostActionTypes.LOAD_POSTS;
  payload: LoadPostsPayload;
};

const loadPostsAction = (payload: LoadPostsPayload): LoadPostsAction => {
  return {
    payload,
    type: PostActionTypes.LOAD_POSTS,
  };
};

export const postActions = {
  loadPostsAction,
};
```

En cuanto a los tipos de `comment`, contendrán índices que apuntan al `post` y el `user` relacionados:

```javascript
// comment.types.ts
export type Comment = {
  body: string,
  date: Date,
  id: number,
  postId: number,
  userId: number,
};
```

Las acciones de `comment` también incluyen solo una acción para cargar comentarios por post:

```javascript
// comments.actions
import { Comment } from './comment.types';

export enum CommentActionTypes {
  LOAD_COMMENTS = 'COMMENT:LOAD_COMMENTS',
}

export type LoadCommentsPayload = {
  comments: Comment[];
  postId?: number;
};

export type LoadCommentsAction = {
  type: CommentActionTypes.LOAD_COMMENTS;
  payload: LoadCommentsPayload;
};

const loadCommentsAction = (payload: LoadCommentsPayload): LoadCommentsAction => {
  return {
    payload,
    type: CommentActionTypes.LOAD_COMMENTS,
  };
};

export const commentActions = {
  loadCommentsAction,
};
```

Ahora, abordemos los reducers. En cuanto al reducer `user`, se creará combinando dos reducers. El primero tomará la acción `LoadUsersAction` y almacenará un mapa de usuarios por` id`. También procesará la `LoadUserAction` y almacenará al usuario en el mapa. El segundo tomará el `LoadPostsAction` y almacenará un mapa de `postIds` relacionados con un usuario.

```javascript
// user.reducer.ts
import { User } from './user.types';
import { UserActionTypes, LoadUsersAction, LoadUserAction } from './user.actions';
import { NumberIndexed } from '../shared/shared.types';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { LoadPostsAction, PostActionTypes } from '../post/post.actions';

export type UserState = {
  byId: NumberIndexed<User>;
  postIdsById: NumberIndexed<number[]>; // one-to-many relation
};

export type UserStore = {
  users: UserState;
};

export const userByIdReducer = (state: NumberIndexed<User> = {}, action: AnyAction) => {
  switch (action.type) {
    case UserActionTypes.LOAD_USERS:
      const { payload } = action as LoadUsersAction;
      const { users } = payload;
      const loadedUsersMap = users.reduce((map, user) => ({ ...map, [user.id]: user }), {});

      return {
        ...state,
        ...loadedUsersMap,
      };

    case UserActionTypes.LOAD_USER:
      const { payload: userPayload } = action as LoadUserAction;
      const { user } = userPayload;

      return {
        ...state,
        [user.id]: user,
      };
  }

  return state;
};

export const postIdsByIdReducer = (state: NumberIndexed<number[]> = {}, action: AnyAction) => {
  switch (action.type) {
    case PostActionTypes.LOAD_POSTS:
      const { payload } = action as LoadPostsAction;
      const { posts, userId } = payload;
      let loadedPostIdsByUserIdMap = posts.reduce(
        (postIdsByUserIdMap, post) => ({
          ...postIdsByUserIdMap,
          [post.userId]: postIdsByUserIdMap[post.userId] ? [...postIdsByUserIdMap[post.userId], post.id] : [post.id],
        }),
        {} as NumberIndexed<number[]>
      );
      if (posts.length === 0) {
        loadedPostIdsByUserIdMap = { [userId as number]: [] };
      }

      return {
        ...state,
        ...loadedPostIdsByUserIdMap,
      };
  }

  return state;
};

export const userReducer: Reducer<UserState> = combineReducers({
  byId: userByIdReducer,
  postIdsById: postIdsByIdReducer,
});
```

El tipo personalizado `NumberIndexed` se define de la siguiente manera, en un archivo compartido donde también definimos los tipos para los filtros. Este tipo nos permite tipar mapas con números como índices, utilizados por los reductores anteriores.

```javascript
// shared.types.ts
export type NumberIndexed<T> = { [index: number]: T };
export type StringIndexed<T> = { [index: string]: T };
export type OrderType = "asc" | "desc";
```

De manera similar, el reducer `post` tiene un reducer relacionado con la acción` LoadPost` y un reducer que se encarga de la `LoadCommentsAction`.

```javascript
// post.reducer.ts
import { Post } from './post.types';
import { PostActionTypes, LoadPostsAction } from './post.actions';
import { NumberIndexed } from '../shared/shared.types';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { CommentActionTypes, LoadCommentsAction } from '../comment/comment.actions';

export type PostState = {
  byId: NumberIndexed<Post>;
  commentIdsById: NumberIndexed<number[]>; // one-to-many relation
};

export type PostStore = {
  posts: PostState;
};

export const postByIdReducer = (state: NumberIndexed<Post> = {}, action: AnyAction) => {
  switch (action.type) {
    case PostActionTypes.LOAD_POSTS:
      const { payload } = action as LoadPostsAction;
      const { posts } = payload;
      const loadedPostsMap = posts.reduce((map, post) => ({ ...map, [post.id]: post }), {});

      return {
        ...state,
        ...loadedPostsMap,
      };
  }

  return state;
};

export const commentIdsByIdReducer = (state: NumberIndexed<number[]> = {}, action: AnyAction) => {
  switch (action.type) {
    case CommentActionTypes.LOAD_COMMENTS:
      const { payload } = action as LoadCommentsAction;
      const { comments, postId } = payload;
      let loadedCommentIdsByPostIdMap = comments.reduce(
        (commentIdsByPostIdMap, comment) => ({
          ...commentIdsByPostIdMap,
          [comment.postId]: commentIdsByPostIdMap[comment.postId]
            ? [...commentIdsByPostIdMap[comment.postId], comment.id]
            : [comment.id],
        }),
        {} as NumberIndexed<number[]>
      );
      if (comments.length === 0) {
        loadedCommentIdsByPostIdMap = { [postId as number]: [] };
      }

      return {
        ...state,
        ...loadedCommentIdsByPostIdMap,
      };
  }

  return state;
};

export const postReducer: Reducer<PostState> = combineReducers({
  byId: postByIdReducer,
  commentIdsById: commentIdsByIdReducer,
});
```

El reducer de `comment` es más simple, encargándose solo de la acción` LoadComments`.

```javascript
// comment.reducer.ts
import { Comment } from './comment.types';
import { CommentActionTypes, LoadCommentsAction } from './comment.actions';
import { NumberIndexed } from '../shared/shared.types';
import { AnyAction, combineReducers, Reducer } from 'redux';

export type CommentState = {
  byId: NumberIndexed<Comment>;
};

export type CommentStore = {
  comments: CommentState;
};

export const commentByIdReducer = (state: NumberIndexed<Comment> = {}, action: AnyAction) => {
  switch (action.type) {
    case CommentActionTypes.LOAD_COMMENTS:
      const { payload } = action as LoadCommentsAction;
      const { comments } = payload;
      const loadedCommentsMap = comments.reduce((map, comment) => ({ ...map, [comment.id]: comment }), {});

      return {
        ...state,
        ...loadedCommentsMap,
      };
  }

  return state;
};

export const commentReducer: Reducer<CommentState> = combineReducers({
  byId: commentByIdReducer,
});
```

A continuación, implementaremos la store `ui`. Contendrá los datos de la página `My Wall`, `Friend Wall` y `Friends`.

`My Wall` no contendrá tipos personalizados, solo índices a entidades de `post` que pertenecen al usuario que se mostrarán en la página. Las acciones incluirán una acción para cargar posts del muro.

```javascript
// wall.actions.ts
export enum WallActionTypes {
  LOAD_POSTS = 'WALL:LOAD_POSTS',
}

export type LoadWallPostsPayload = {
  postIds: number[];
};

export type LoadWallPostsAction = {
  type: WallActionTypes.LOAD_POSTS;
  payload: LoadWallPostsPayload;
};

const loadWallPostsAction = (payload: LoadWallPostsPayload): LoadWallPostsAction => {
  return {
    payload,
    type: WallActionTypes.LOAD_POSTS,
  };
};

export const wallActions = {
  loadWallPostsAction,
};
```

El reducer será sencillo, encargándose solo de esa acción.

```javascript
// wall.reducer.ts
import { AnyAction, combineReducers, Reducer } from 'redux';
import { LoadWallPostsAction, WallActionTypes } from './wall.actions';

export type WallState = {
  postIds: number[];
};

export type WallStore = {
  wall: WallState;
};

export const postIdsReducer = (state: number[] = [], action: AnyAction) => {
  switch (action.type) {
    case WallActionTypes.LOAD_POSTS:
      const { payload } = action as LoadWallPostsAction;
      const { postIds } = payload;
      return [...state, ...postIds];
  }

  return state;
};

export const wallReducer: Reducer<WallState> = combineReducers({
  postIds: postIdsReducer,
});
```

Omitiremos el código para las acciones y reducers asociados al `Friend Wall`, que son muy similares a los de `My Wall`. Puedes consultar la [rama del repositorio de git](https://github.com/jguix/redux-normalized-example/tree/blogpost-part2) para este post si deseas ver todo el código fuente.

Las acciones de `Friends` incluirán cargar amigos y establecer el orden de la lista de amigos (ascendente o descendente).

```javascript
// friends.actions.ts
import { OrderType } from '../shared/shared.types';

export enum FriendsActionTypes {
  LOAD_FRIENDS = 'FRIENDS:LOAD_FRIENDS',
  SET_FRIENDS_ORDER = 'FRIENDS:SET_FRIENDS_ORDER',
}

export type LoadFriendsPayload = {
  userIds: number[];
};

export type LoadFriendsAction = {
  type: FriendsActionTypes.LOAD_FRIENDS;
  payload: LoadFriendsPayload;
};

const loadFriendsAction = (payload: LoadFriendsPayload): LoadFriendsAction => {
  return {
    payload,
    type: FriendsActionTypes.LOAD_FRIENDS,
  };
};

export type SetFriendsOrderPayload = {
  order: OrderType;
};

export type SetFriendsOrderAction = {
  type: FriendsActionTypes.SET_FRIENDS_ORDER;
  payload: SetFriendsOrderPayload;
};

const setFriendsOrderAction = (payload: SetFriendsOrderPayload): SetFriendsOrderAction => {
  return {
    payload,
    type: FriendsActionTypes.SET_FRIENDS_ORDER,
  };
};

export const friendsActions = {
  loadFriendsAction,
  setFriendsOrderAction,
};
```

El reducer `friends` tendrá reducers que solo apunten a las entidades `user`. Tendremos uno para la lista con orden ascendente y otro para la lista con orden descendente, porque implementaremos una estrategia de paginación con el backend (de eso hablaremos en la próxima publicación de la serie). Otro reducer almacenará el estado del filtro.

```javascript
// friends.reducer.ts
import { AnyAction, combineReducers, Reducer } from 'redux';
import { FriendsActionTypes, LoadFriendsAction, SetFriendsOrderAction } from './friends.actions';

export type FriendsState = {
  orderFilter: 'asc' | 'desc';
  userIds: number[];
};

export type FriendsStore = {
  friends: FriendsState;
};

export const orderFilterReducer = (state: 'asc' | 'desc' = 'asc', action: AnyAction) => {
  switch (action.type) {
    case FriendsActionTypes.SET_FRIENDS_ORDER:
      const { payload } = action as SetFriendsOrderAction;
      const { order } = payload;
      return order;
  }

  return state;
};

export const userIdsReducer = (state: number[] = [], action: AnyAction) => {
  switch (action.type) {
    case FriendsActionTypes.LOAD_FRIENDS:
      const { payload } = action as LoadFriendsAction;
      const { userIds } = payload;
      return [...state, ...userIds];

    case FriendsActionTypes.SET_FRIENDS_ORDER:
      return [];
  }

  return state;
};

export const friendsReducer: Reducer<FriendsState> = combineReducers({
  orderFilter: orderFilterReducer,
  userIds: userIdsReducer,
});
```

Para crear la store, primero instalaremos la [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension). Con estas herramientas podremos depurar el despacho de acciones y los cambios en el estado de la store.

```
yarn add redux-devtools-extension
```

La `root` store se compone de la store `entities` y la store `ui` de la siguiente manera:

```javascript
// store.ts
import { combineReducers, createStore, Reducer } from "redux";
import { userReducer, UserStore } from "../modules/user/user.reducer";
import {
  commentReducer,
  CommentStore,
} from "../modules/comment/comment.reducer";
import { postReducer, PostStore } from "../modules/post/post.reducer";
import {
  friendsReducer,
  FriendsStore,
} from "../modules/friends/friends.reducer";
import {
  FriendWallStore,
  friendWallReducer,
} from "../modules/friend-wall/friend-wall.reducer";
import { wallReducer, WallStore } from "../modules/wall/wall.reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export type EntitiesStore = CommentStore & PostStore & UserStore;

export type UIStore = FriendsStore & FriendWallStore & WallStore;

export type ApplicationStore = {
  entities: EntitiesStore,
  ui: UIStore,
};

export const entitiesReducer = combineReducers({
  comments: commentReducer,
  posts: postReducer,
  users: userReducer,
});

export const uiReducer = combineReducers({
  friends: friendsReducer,
  friendWall: friendWallReducer,
  wall: wallReducer,
});

export const rootReducer: Reducer<ApplicationStore> = combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
```

Finalmente, introduzcamos algunos datos en esta store, enviemos algunas acciones y veamos los resultados. Usaremos algunos datos simulados y mostraremos los resultados usando mensajes `console.log` e imprimiendo el contenido de la store en la página principal. Alternativamente, puede depurar estas acciones con un complemento de Chrome como [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).

```javascript
// App.tsx
import React from "react";
import "./App.css";
import { store } from "./store/store";
import { userActions } from "./modules/user/user.actions";
import { User } from "./modules/user/user.types";
import { Post } from "./modules/post/post.types";
import { postActions } from "./modules/post/post.actions";
import { Comment } from "./modules/comment/comment.types";
import { commentActions } from "./modules/comment/comment.actions";
import { friendsActions } from "./modules/friends/friends.actions";
import { wallActions } from "./modules/wall/wall.actions";
import { friendWallActions } from "./modules/friend-wall/friend-wall.actions";

const users: User[] = [
  {
    id: 1,
    name: "Josh Martin",
    email: "josh.martin@gmail.com",
    avatar: "http://placekitten.com/g/500/400",
  },
  {
    id: 2,
    name: "Emily Matthews",
    email: "emily.matthews@gmail.com",
    avatar: "http://placekitten.com/g/400/400",
  },
  {
    id: 3,
    name: "Sonia Lee",
    email: "sonia.lee@gmail.com",
    avatar: "http://placekitten.com/g/400/500",
  },
];
const posts: Post[] = [
  { id: 1, body: "Blah", date: new Date(), userId: 1 },
  { id: 2, body: "Bleh", date: new Date(), userId: 1 },
  { id: 3, body: "Blih", date: new Date(), userId: 2 },
  { id: 4, body: "Bloh", date: new Date(), userId: 2 },
  { id: 5, body: "Bluh", date: new Date(), userId: 3 },
];
const comments: Comment[] = [
  { id: 1, body: "No", date: new Date(), postId: 1, userId: 2 },
  { id: 2, body: "Yes", date: new Date(), postId: 1, userId: 3 },
  { id: 3, body: "Yes!", date: new Date(), postId: 1, userId: 1 },
  { id: 4, body: "No!", date: new Date(), postId: 2, userId: 3 },
];

const App = () => {
  store.subscribe(() => {
    console.log("New state", store.getState());
  });

  console.log("Loading users");
  store.dispatch(
    userActions.loadUsersAction({
      users,
    })
  );
  console.log("Loading posts");
  store.dispatch(
    postActions.loadPostsAction({
      posts,
    })
  );
  console.log("Loading comments");
  store.dispatch(
    commentActions.loadCommentsAction({
      comments,
    })
  );
  console.log("Loading friends");
  store.dispatch(
    friendsActions.loadFriendsAction({
      userIds: [2, 3],
    })
  );
  console.log("Loading wall posts");
  store.dispatch(
    wallActions.loadWallPostsAction({
      postIds: [1, 2, 3, 4, 5],
    })
  );
  console.log("Loading Emily's posts");
  store.dispatch(
    friendWallActions.loadFriendWallPostsAction({
      postIds: [3, 4],
      userId: 2,
    })
  );

  return (
    <div className="App">
      <div>Store contents</div>
      <div>
        <pre>{JSON.stringify(store.getState(), null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
```

Si ejecutamos la aplicación, podemos seguir en la consola cómo la store despacha acciones y el resultado en la página generada. También podemos seguir los pasos, las actualizaciones parciales y el resultado en la extensión React DevTools.

![Redux DevTools Extension](/img/blog/2021-01_redux-normalized-store-part-2/redux-dev-tools.png)

Si deseas profundizar más en el código, recuerda que puedes consultar todo el código fuente en esta rama:

[https://github.com/jguix/redux-normalized-example/tree/blogpost-part2](https://github.com/jguix/redux-normalized-example/tree/blogpost-part2)

En la próxima publicación implementaremos las páginas y componentes y un backend simulado con paginación. También implementaremos métodos de almacenamiento en caché para evitar pedir los mismos datos una y otra vez.

## Credits

Fotografía por [Sigmund](https://unsplash.com/@sigmund) on [Unsplash](https://unsplash.com/).
