---
title: 'Using redux with relational data (1/3)'
description: 'In this post, I will show you how to create a simple Chrome extension, using just JavaScript, HTML and CSS. I will also summarize all what a Chrome extension can do, and I will introduce how to create more complex extensions based on modern JavaScript frameworks like React, Angular or Vue.'
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

## Part 1. Modelling the redux store

In this series of posts we will create an application using **react** and **redux**, in which we will handle relational data. In this first part we will be modelling the store.

Often the redux tutorials are too simple and handle a flat data structure. This is the case of the typical TODO app (to-do list), or a shopping list, etc. In these cases we usually manage a few reducers, which are independent of each other.

For example:

- The list of TODOs, including the status of each task.
- The value of a show/hide filter, for example "hide complete".
- The value of a sort filter, for example "sort by ascending creation date".

In such a simple case, the store doesn't need to handle relationships, and it can be rendered in an object similar to the following:

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

However, real applications are usually more complex. Some data is dependent on others, and there are hierarchies: one-to-one, one-to-many, and many-to-many relationships. This will present us with several challenges, both in the representation of the state in the store, and in the efficiency of communication with the backend.

To illustrate that, we will use the example of a social network. The main entities that we will handle are users, posts and comments. Users can create posts, and posts can contain comments from other users. Simple, isn't it?

In order to model this data, let's look first at some of the designs of our social network.

The home page of our social network will be **My Wall**, the page where my posts and those of all my friends are shown, with their respective comments.

![My Wall](/img/blog/2020-08_redux-normalized-store-part-1/my_wall.png)

There will also be a **Friends** page, where the users who are direct contacts of mine are listed.

![My Friends](/img/blog/2020-08_redux-normalized-store-part-1/my_friends.png)

From this page, if I click on one of my friends, I will visit the **Friend's wall**, that is, a page where their posts will appear, along with the comments of other users.

![Friend Page](/img/blog/2020-08_redux-normalized-store-part-1/friend.png)

Each post will include the avatar and name of the user, and the date. Each comment will also include the avatar, username and date.

![Posts and comments](/img/blog/2020-08_redux-normalized-store-part-1/post_and_comments.png)

Without going into the relationships or hierarchies, we can define the types of the entities as user (`User`), post (`Post`) and comment (`Comment`):

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

An extremely simple representation, based on the TODO application, consists of having a reducer dedicated to each type of entity:

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

If I visit the **Friends** page, the store holds the friends in `users`; if I enter a friend's page the store holds the posts in `posts`, and if I show a post, the comments are stored in `comments`.

This strategy will force me to retrieve all the posts from the backend every time I switch to the wall of a different friend. Moreover, it won't work as expected, because on the **Friend** and **My wall** pages I need to show several posts at the same time, where each post has different comments. According to the store designed above, all the posts displayed would always show the same comments.

To avoid this problem we could nest the comments within the posts, like this:

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

However, we still have several problems. We are not caching any data, for instance, if I navigate from one friend to another and go back to the first one, I will have to reload all the posts and comments from the backend. There is also a lot of replicated data, such as users, taking up more space than necessary.

Ideally, you should normalize the store, as recommended in the [redux documentation](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape). We could think something like this, where to each entity we have added one or several ids (`userId`, `postId`) that point to the entities with which it is related:

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

In this way we flatten the store and avoid replicated data. However, the search for the user id associated with each post or comment, and the search for all the comments associated with a post will not be optimal, since it will force us to go through all the users or comments and filter by id. When the store grows during a session, this process will become slower and slower and will impact the user experience.

We can improve this by indexing each data entity, as suggested in the redux documentation.

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

Now it is much easier and faster to search for the `user` associated with a `post` or a `comment`. However, it is still difficult to get the list of `posts` by `user`, or the list of `comments` by `post`. In fact, it is now more difficult and inefficient to filter this data.

We are going to create relational structures that tell us which posts belong to each user (one to many), and what comments belong to each post.

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

The meaning of the reducer `postIdsById` reads as _"the user with id 2 has the post with id 1"_. The reading of `commentIdsById` would be _"the post with id 1 has the comments with ids 1 and 2"_. Now we have everything indexed and the database structure is fully normalized.

We only lack structures that allow us to store the ids of the posts that will be visible on each wall, either the user's or the friends', as well as the ids of the users that should appear on the friends page. We will include on the friend page a filter to sort alphabetically in ascending or descending order.

To separate the structures that model entities that belong to the database from the structures that model elements of the user interface, we will create 2 higher-level reducers. One called `entities` where we will store **entities from the database**, and another called `ui` where we will store all the **elements of the user interface**.

This is finally the store model, which avoids data replication, facilitates the search thanks to indexing, and will allow us to cache the data already loaded, since the structures associated with the user interface only store ids, and any entity already downloaded from the backend will remain in the store until we clear the browser cache.

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

In future posts we will go through the implementation of this store and the caching methods.

## Credits

Photo by [Jeremy Bishop](https://unsplash.com/@jeremybishop) on [Unsplash](https://unsplash.com/).
