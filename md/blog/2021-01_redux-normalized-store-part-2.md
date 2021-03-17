---
title: "Using redux with relational data (2/3)"
description: "In this series of posts we will create an application using react and redux, in which we will handle relational data. In this second part we will be implementing the store."
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

## Part 2. Implementing the redux store

In this series of posts we will create an application using **react** and **redux**, in which we will handle relational data. In this second part we will be implementing the store.

We ended up the last part of this series modelling the store. Check part 1 if you need more context on that: [Using redux with relational data (1/3)](https://blog.mimacom.com/redux-normalized-store-part-1/).

Our store will have two main reducers, the `entities` store and the `ui` store.

Let's start by creating the `entities` store. It will hold 3 types of data, or entities, namely:

- user
- comment
- post

Each entity will have associated types, actions and reducers. For the sake of easy comprehension, I'll show the types and actions in the first place.

User types:

```javascript
// user.types.ts
export type User = {
  avatar: string,
  email: string,
  id: number,
  name: string,
};
```

The user actions will include an action to load all users into the store, and an action to load a single user. The first one will be potentially called from the `My Friends` page, the second one from `My Wall` or `Friend Wall` page, where posts and comments will display the associated user next to them.

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

Similarly we will have `post` types, where each post has a `userId`, which is the way that our database will manage the one-to-many relation (but remember that we will make this data more easily searchable by creating a `postIdsById` reducer inside the `users` reducer):

```javascript
// post.types.ts
export type Post = {
  body: string,
  date: Date,
  id: number,
  userId: number,
};
```

The `post` actions only include an action to load posts by user, with the `userId` being an optional parameter. We will dispatch this action with the `userId` param informed from the `Friend Wall` page to get all his posts. We will dispatch this action with the `userId` param `undefined` from `My Wall` to get all posts from all users (to simplify, let's say that all users are friends of mine).

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

As for the `comment` types, they will hold indexes pointing to the related `post` and `user`:

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

The `comment` actions also include just one action to load comments by post:

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

Now, let's address the reducers. Regarding the `user` reducer, it will be created by combining two reducers. The first one will take the `LoadUsersAction` action and store a map of users by `id`. It will also process the `LoadUserAction` and store the user in the map. The second one will take the `LoadPostsAction` and store a map of `postIds` related to a user.

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

The `NumberIndexed` custom type is defined as follows, in a shared file where we also define the types for the filters. This type allows us to type maps with numbers as index used by the reducers above.

```javascript
// shared.types.ts
export type NumberIndexed<T> = { [index: number]: T };
export type StringIndexed<T> = { [index: string]: T };
export type OrderType = "asc" | "desc";
```

Similarly, the `post` reducer has a reducer related to the `LoadPost` action ans a reducer taking care of the `LoadCommentsAction`.

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

The `comment` reducer is more simple, taking care just of the `LoadComments` action.

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

Next, we will implement the `ui` store. It will hold data for `My Wall`, `Friend Wall` and `Friends` page.

`My wall` will not hold custom types, just indexes to the `post` entities belonging to the user that will be displayed in the page. The actions will include an action to load wall posts.

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

The reducer will be simple, just taking care of that action.

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

We will ommit the code for the actions and reducers associated to the `Friend Wall`, which are very similar to the ones for `My Wall`. You can check the [git repository branch](https://github.com/jguix/redux-normalized-example/tree/blogpost-part2) for this post if you want all the source code.

The `Friends` actions will include loading friends and setting the friends list order (ascending or descending).

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

The `friends` reducer will have reducers that just point to `user` entities. We will have one for the ascending order list and one for the descending order list, because we will implement a pagination strategy with the backend (we will talk about that on the next post of the series). Another reducer will store the state of the filter.

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

To create the store, we will first install the [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension). With this tools we will be able to debug the dispatching of actions and the changes in the state of the store.

```
yarn add redux-devtools-extension
```

The `root` store is composed of the `entities` store and `ui` store as follows:

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

Finally, let's throw some data into this store, dispatch some actions and see the results. We will use some mocked data and will display the results using some `console.log` messages and printing the contents of the store in the main page. Alternatively, you can debug these actions with a Chrome plugin like [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).

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

If we run the app we can follow in the console log how the store dispatches actions and the result in the output page. We can also follow the steps, the partial updates and the result in the React DevTools extension.

![Redux DevTools Extension](/img/blog/2021-01_redux-normalized-store-part-2/redux-dev-tools.png)

If you wan to dig more into the code, remember that you can check the whole source code in this branch:

[https://github.com/jguix/redux-normalized-example/tree/blogpost-part2](https://github.com/jguix/redux-normalized-example/tree/blogpost-part2)

In the next post we will implement the pages and components and a mocked backend with pagination. We will also implement caching methods to avoid asking for the same data again and again.

## Credits

Photo by [Sigmund](https://unsplash.com/@sigmund) on [Unsplash](https://unsplash.com/).
