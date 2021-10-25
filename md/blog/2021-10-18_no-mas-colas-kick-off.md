---
title: '"No Más Colas" kick off'
description: 'Today I am starting a new project. I will call it for now "No Más Colas" -Spanish translation for "No More Queues"- but I might have second thoughts about that once I do some UX research.'
published: true
datePublished: '2021-10-18T09:00:00.000Z'
author: Juangui Jordán
tags:
  - ux
  - frontend
  - javascript
  - nextjs
  - flutter
authorPhoto: /img/authors/jguix.jpeg
authorTwitter: jguixer
bannerPhoto: '/img/blog/2021-10-18_no-mas-colas-kick-off/no-mas-colas-kick-off.jpg'
thumbnailPhoto: '/img/blog/2021-10-18_no-mas-colas-kick-off/no-mas-colas-kick-off.jpg'
canonicalUrl: https://juanguijordan.com/blog/2021-10-18_no-mas-colas-kick-off
---

# 'No Más Colas' kick off

Today I am starting a new project. I will call it for now _"No Más Colas"_ -Spanish translation for _"No More Queues"_- but I might have second thoughts about that once I do some UX research.

The aim of the project is **putting into practice what I learned** in some Udemy tutorials that I recently completed, or I'm about to finish, devoted to NextJS and Flutter. I'm also trying **to come out with a solution for rapid prototyping apps**, creating MVPs that are simple but still scalable. And finally, I think I can **help others in the process**. Perhaps people that are already competent in JavaScript can follow my steps to create a different app, or even help me when I get stuck on something.

I'll blog about the process to help me reflect on those things I learned. I believe that **practice is completely necessary to actually learn stuff**. Thus, I'm not usually happy with watching the videos, but I also follow the steps myself. I consider that to be _"practice level 101"_, so to speak. The next level comes when you **try something different applying what you learned**. And if you are able to **summarize, sinthesize, write about the topic or teach other people**, then you get to learn the stuff deeper.

Someone might have instantly kringed when I said that my technical stack for this project will be NextJS + Flutter. If you are going to use React, why not using React Native for mobile, or why not creating a PWA? Or the other way around, why not creating everything in Flutter + Flutter web?

Truth is, I have had enough of pain with React Native, and I want to try something new. Hopefully, Flutter provides better developer experience -for the time I have been trying it, it does- and gives me enough to create a simple project. I don't want to use PWA because I want my app to live in the app stores. On the other hand, I don't trust much Flutter web for now. I don't know about it being used in production sites, and I wouldn't recommend my clients to use it, so for now I will leave it out of the equation.

That's the _why_, but the _what_ is still missing. **I'm going to create a website and a mobile app to manage queues**, not message queues or event queues, but **real life queues with people in a line**. Basically, the app will allow someone to put into place a queue system, where the user can get information through the app on how many people are before him, the estimated waiting time, and notifications when his turn comes close.

I think this can solve a problem that existed for a long time, but even got worse after COVID. **We never liked to wait long in a line**. Now, with COVID, **it's not even safe to do that**. Having a bunch of people in a closed space for a long time is no longer desirable, and whe might have restrictions or quotes for that. With this app, a user can pick his turn -something that could be even accomplished remotely- and then, if the estimated time is long, he can just go shopping for a while, wait home or have a coffee somewhere, while the queue advances.

The website will handle the backoffice for queue system and a frontend site to display in the place, where the users will be able to see on site the next queue IDs that will be served, and where they can get their queue ID.

The mobile app will be responsible to read this ID and inform the user about his position in the queue and estimated times.

**In the next post I will create the NextJS app with typescript support**. Stay tuned and see this app grow.

## Credits

Photo by [Zichao Zhang](https://unsplash.com/@shakusky) on [Unsplash](https://unsplash.com).
