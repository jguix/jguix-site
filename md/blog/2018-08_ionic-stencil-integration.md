---
title: 'Using Stencil Built Web Components with Ionic'
description: 'This post aims at providing clear instructions on how to use components created and compiled with Stencil on an Ionic application. I will guide you in the process of making your web component available in your Ionic templates, without the need of registering them in the npm registry or adding ugly script tags to your index file.'
published: true
datePublished: 1536735600000
date: '2018-09-12T10:00:00.000Z'
author: Juangui Jordán
tags:
  - javascript
authorPhoto: /img/authors/jguix.jpeg
authorTwitter: jguixer
bannerPhoto: '/img/blog/2018-08_ionic-stencil-integration/ionic-stencil-integration.jpg'
thumbnailPhoto: '/img/blog/2018-08_ionic-stencil-integration/ionic-stencil-integration.jpg'
canonicalUrl: https://juanguijordan.com/blog/2018-08_ionic-stencil-integration
---

This post aims at providing clear instructions on how to use components created and compiled with Stencil on an Ionic application.
I will guide you in the process of making your web component available in your Ionic templates,
without the need of registering them in the npm registry or adding ugly script tags to your index file.

## Motivation

Being created by the [Ionic Framework team](http://ionicframework.com/),
one would expect that using Stencil web components in Ionic projects would be,
if not automatic and integrated in the framework by means of some CLI command,
at least well documented.

Well, that it not the case, since the Ionic guys provide [framework integration instructions](https://stenciljs.com/docs/framework-integration) for Angular,
React, Vue and Ember, but they do not provide them for Ionic.
Maybe I neglected some obvious thing, but I had to do some research to get my Stencil components working on an Ionic project,
and the effort was big enough to make me think about creating a post of it,
hoping that it may help someone.

## Requirements

As a requirement, you need to create a Stencil component, a task for which you can find proper documentation in the Stencil site. The Stencil component doesn't need either to be registered in the npm registry.

## Integration process

If we integrate web components that are registered in npm, the process is simpler. Let's face in this section the case in which we developed a custom component, but we are not publishing it in the npm register. We are aiming at a clean integration without script tags in the `index.html` file.

The process takes three steps.

- First we build the component and copy the distribution files to our project.
- Then we tell the Angular side of things how to use the component.
- Last, we tell the Ionic side of things to include the component when it builds the bundle. The way we talk to Angular (really Ionic-Angular) depends on whether we are _eagerly_ loading pages, or _lazily_ loading them.

### Step 1. Build and copy component

Build the component and copy the contents of the dist folder to a folder in our project.
In this example we chose the folder `@img/lib/components/my-google-maps`.

### Step 2. Import into app.module.ts

First, you need to import the `CUSTOM_ELEMENTS_SCHEMA`, and add it to the `schemas` section of the `@NgModule`. If you import `CUSTOM_ELEMENTS_SCHEMA` into one of your page modules, the Angular compiler will accept elements it does not recognize (otherwise, it will throw an error). If you are lazy loading, you need to import this schema into each page module where you want to use the web component. If you are eagerly loading, you only need to import the schema into `app.module.ts`.

Then, add an import to your `dist/mycomponent` folder. This import statement does not load the entire web component. It only loads a small piece of code that then allows Ionic to load the full web component later, when a template requests it.

When you've performed both steps, your `app.module.ts` should look like this if you are eagerly loading.

```typescript
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // add this import
import '@img/lib/components/my-google-maps/dist/mycomponent'; // add this import

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

If you are lazy loading, import just the web component in `app.module.ts`, and just the schema in the individual lazily loaded modules.

### Step 3. Tell ionic-app-scripts to include the component in the build

We will create a `copy.config.js` file that will define some rules to copy the web component to our final build. A good practice is to create it in a config folder, to separate it from other standard files like `package.json` or `ionic.config.json`.

This file can tell ionic app-scripts to include extra content when it builds an Ionic app. If you are creating the file, put it in a folder named `config` that is at the same directory level as your `src` folder. In the first place, let's declare the file in `package.json`. This will tell the app-scripts to use this file. Add the following field to your `package.json`:

```json
"config": {
    "ionic_copy": "./config/copy.config.js"
}
```

Then, put this inside `config\copy.config.js`:

```javascript
module.exports = {
  copyTimeAgoWebComponent: {
    src: [
      '{{ROOT}}/src/img/lib/components/my-google-maps/dist/mycomponent**/*',
    ],
    dest: '{{BUILD}}',
  },
};
```

Once you've made those changes, app-scripts will know how to include the web component in your builds.
You can now use your Stencil web components in your Ionic templates as any other web component.
