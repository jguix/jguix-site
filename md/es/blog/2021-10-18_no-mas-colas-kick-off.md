---
title: 'Inicio del proyecto "No Más Colas"'
description: 'Hoy comienzo un nuevo proyecto. Lo llamaré por ahora _"No Más Colas"_ pero podría tener dudas sobre eso una vez que haga algo de investigación de UX.'
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

# Inicio del proyecto 'No Más Colas'

Hoy comienzo un nuevo proyecto. Lo llamaré por ahora _"No Más Colas"_ pero podría tener dudas sobre eso una vez que haga una investigación de UX.

El objetivo del proyecto es **poner en práctica lo que aprendí** en algunos tutoriales de Udemy que completé recientemente, o estoy a punto de terminar, dedicados a NextJS y Flutter. También estoy tratando de **encontrar una solución para el prototipado rápido de aplicaciones**, creando MVP que sean simples pero todavía escalables. Y finalmente, creo que puedo **ayudar a otros en el proceso**. Quizás las personas que ya son competentes en JavaScript puedan seguir mis pasos para crear una aplicación diferente, o incluso ayudarme cuando me atasque en algo.

Escribiré en el blog sobre el proceso para ayudarme a reflexionar sobre las cosas que aprendí. Creo que **la práctica es completamente necesaria para aprender realmente**. Así, generalmente no me quedo satisfecho con ver los videos, sino que también sigo los pasos por mí mismo. Considero que esto es el _"nivel básico de práctica"_, por así decirlo. El siguiente nivel llega cuando **pruebas algo diferente aplicando lo que has aprendido**. Y si eres capaz de **resumir, sintetizar, escribir sobre el tema o enseñar a otras personas**, entonces podrás aprenderlo más a fondo.

A alguien le habrá chirriado escuchar que la pila técnica para este proyecto será NextJS + Flutter. Si vas a usar React, ¿por qué no usar React Native para dispositivos móviles? o ¿por qué no crear una PWA? O al revés, ¿por qué no crear todo en Flutter + Flutter web?

La verdad es que ya he sufrido suficientes problemas con React Native y quiero probar algo nuevo. Con suerte, Flutter proporcionará una mejor experiencia de desarrollador -durante el tiempo que lo he estado probando, lo hace- y me dará lo suficiente para crear un proyecto simple. No quiero usar PWA porque quiero que mi aplicación esté en las tiendas de aplicaciones. Por otro lado, no confío mucho en Flutter web por ahora. No conozco sitios de producción donde lo usen y no recomendaría a mis clientes que lo hagan, así que por ahora lo dejaré fuera de la ecuación.

Ese es el _por qué_, pero falta el _qué_. **Voy a crear un sitio web y una aplicación móvil para administrar colas**, no colas de mensajes o colas de eventos, sino **colas en la vida real con personas en una fila**. Básicamente, la aplicación permitirá que alguien ponga en marcha un sistema de colas, donde el usuario podrá obtener información a través de la aplicación sobre cuántas personas hay delante de él, el tiempo de espera estimado y notificaciones cuando se acerque su turno.

Creo que esto puede resolver un problema que ha existido durante mucho tiempo, pero que incluso ha empeorado después del COVID. **Nunca nos gustó esperar mucho tiempo en una fila**. Ahora, con el COVID, **ni siquiera es seguro hacerlo**. Tener un grupo de personas en un espacio cerrado durante mucho tiempo ya no es deseable, y podría haber restricciones o cuotas para en relación a ello. Con esta aplicación, un usuario puede elegir su turno -algo que incluso podría hacerse de forma remota- y luego, si el tiempo estimado es largo, puede simplemente irse de compras un rato, esperar en casa o tomar un café en algún lugar, mientras avanza la cola.

El sitio web manejará el backoffice para el sistema de colas y un sitio frontend para mostrar en el lugar, donde los usuarios podrán ver las siguientes ID de cola que serán atendidas y donde pueden obtener su ID de cola.

La aplicación móvil será la encargada de leer este ID e informar al usuario sobre su posición en la cola y tiempos estimados.

**En el próximo post crearé la aplicación NextJS con soporte typescript**. Seguid atentos para ver crecer esta aplicación.

## Créditos

Foto por [Zichao Zhang](https://unsplash.com/@shakusky) en [Unsplash](https://unsplash.com).
