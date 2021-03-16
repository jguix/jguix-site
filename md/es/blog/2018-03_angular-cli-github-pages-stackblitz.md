---
title: "Deploying an Angular CLI project on Github Pages and Stackblitz"
excerpt: "Learn how to easily deploy an angular CLI on Github Pages, as well as sharing a live edit mode version with Stackblitz"
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

Can’t wait to show to the world your proof of concept, side project, idea…?
This 5-line bash recipe will put your work on the showcase in a matter of seconds.

So you just finished creating the coolest project with [Angular CLI](https://cli.angular.io/) and want to share it with your colleagues, or perhaps write a post about it, but you want to skip the pain to your colleagues of checking out the code, installing dependencies and launching the app — I know, it almost can’t get any easier nowadays — and you don’t own a web server, or perhaps you are as lazy as your colleagues and don’t feel like putting much effort on deploying your code anywhere.

Well, [Github Pages](https://pages.github.com/) to the rescue!

## GitHub Pages

I am assuming that you already created your project with Angular CLI, so your project is already versioned with git.
Let’s assume too that you already have a **GitHub account** with some _NICKNAME_.
Head yourself to GitHub and create a new project, let’s call it _MY_PROJECT_.
Don’t put any files in it, you can come back later and add the _README_ and the desired license,
but for now it will be easier if you just leave it blank.

Then, connect your local git repository with the new remote repository and push the changes:

```bash
git remote add origin https://github.com/NICKNAME/MY_PROJECT.git
git push origin master
```

Now, if you already knew about GitHub Pages, you’d be tempted to manually activate them on the _index.html_ file of your project.
**DON’T DO THAT! It won’t work!!**

Your project still needs to be built for production,
then a _dist_ folder will be created from which you could serve your GitHub pages but **DON’T! It won’t work!!!**

It looks like GitHub Pages is not suited for SPAs, since it redirects any paths in your app to a 404 page.
But some really nice guys developed [angular-cli-ghpages](https://www.npmjs.com/package/angular-cli-ghpages).
This npm package will fill the gaps and make your app work in GitHub Pages.

Install it with:

```bash
npm install -g angular-cli-ghpages
```

Then execute these 2 commands:

```bash
ng build --prod --base-href "https://NICKNAME.github.io/MY_PROJECT/"
angular-cli-ghpages
```

The second command has a bunch of options, but they are all optional as the word _option_ states,
and you don’t need much more to get your app up and running on GitHub Pages. Enjoy!

Well, certainly you’ll need the URL of your app to share it with the world.
This URL is exactly the one that we used on the ng build command:

[https://NICKNAME.github.io/MY_PROJECT/](#)

### Deploying ionic projects

Update: 2018-05-07

What about Ionic projects.
They are deployed to `www` instead of the `dist` folder, and they use Ionic CLI instead of Angular CLI,
so a couple of changes will need to be done.

```bash
ionic build --prod
```

The `--base-href` is not available in Ionic CLI (not that I'm aware of),
so you will need to open the index.html file and write the base tag on your own, after the build is finished.
You can put it after the title tag, for instance:

```html
<title>Ionic App</title>
<base href="https://NICKNAME.github.io/MY_PROJECT/" />
<meta
  name="viewport"
  content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
```

Now, as I said, the output of the build is not the default for Angular CLI, which would be the dist folder.
Use the `--dir` flag to specify the `www` folder as the source for GitHub Pages.

```bash
angular-cli-ghpages --dir www
```

## Stackblitz

Now for the [Stackblitz](https://stackblitz.com/) part of the post… wouldn’t it be nice to enable our colleagues or followers, to actually interact with our code and see the impact of the modifications in almost-real-time?

The guys from Stackblitz have created this sort of online IDE where you can create projects and see the build at the same time.
It’s like **JSfiddler** on steroids!

![Stackblitz](/img/blog/2018-03_angular-cli-github-pages-stackblitz/stackblitz.png)

Even simpler than registering on Stackblitz, creating a project and uploading your project files,
this one line trick will load your GitHub project on the Stackblitz IDE.

Just share this URL, using again your GitHub nickname and project name:

[https://stackblitz.com/github/NICKNAME/MY_PROJECT](#)

This is valid also for branches, tags or specific commits. Just use the following scheme for the URL:

[https://stackblitz.com/github/NICKNAME/MY_PROJECT/tree/{TAG|BRANCH|COMMIT}](#)

I hope this post helped you to release your projects in a place where they can be seen, enjoyed and edited by others.
