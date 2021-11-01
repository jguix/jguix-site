---
title: 'Testeo de extremo a extremo en React Native con Detox'
description: 'En esta publicación, presentaré Detox como una herramienta para realizar pruebas de extremo a extremo para React Native. Detox nos ayuda a reducir nuestra dependencia del QA manual.'
published: true
datePublished: '2021-10-31T09:00:00.000Z'
author: Juangui Jordán
tags:
  - frontend
  - javascript
  - react-native
  - testing
authorPhoto: /img/authors/jguix.jpeg
authorTwitter: jguixer
bannerPhoto: '/img/blog/2021-10-31_e2e-testing-in-rn-with-detox/e2e-testing-in-rn-with-detox.jpg'
thumbnailPhoto: '/img/blog/2021-10-31_e2e-testing-in-rn-with-detox/e2e-testing-in-rn-with-detox.jpg'
canonicalUrl: https://juanguijordan.com/blog/2021-10-18_no-mas-colas-kick-off
---

El desarrollo móvil rápido requiere que adoptemos flujos de trabajo de integración continua. La parte más difícil de las pruebas automatizadas en dispositivos móviles es la punta de la pirámide de pruebas, las **pruebas E2E (de extremo a extremo)**.

Las pruebas E2E, cuando se realizan manualmente, **requieren mucho tiempo, son repetitivas y aburridas**. A veces, también pueden ser **no deterministas**, dependiendo de operaciones asincrónas que pueden tener lugar en un orden diferente en tu aplicación. Otra dificultad es que no hay muchas opciones para realizar pruebas E2E automatizadas usando React Native.

En esta publicación, presentaré [Detox](https://github.com/wix/Detox) como una herramienta para realizar pruebas de extremo a extremo para React Native. Detox nos ayuda a reducir nuestra dependencia del QA manual.

Detox prueba tu aplicación móvil mientras se ejecuta en un dispositivo/simulador real, interactuando con ella como un usuario real.

La filosofía de Detox promueve las pruebas de caja gris en lugar de las pruebas de caja negra:

- **Black Box Testing:** Técnica de testeo de software en la que el evaluador no conoce la estructura interna, el diseño y la implementación de la aplicación de software que se está probando.
- **Gray Box Testing:** Técnica de testeo de software que es una combinación de la técnica de Black Box Testing y la técnica de White Box Testing. La estructura interna, el diseño y la implementación se conocen parcialmente en Gray Box Testing.

En teoría, suena mejor probar exactamente lo que despliegas como una caja negra. En la práctica, cambiar a caja gris permite que el marco de prueba controle la aplicación desde el interior y proporciona mejoras importantes, como luchar contra los problemas de determinismo.

Detox está construido desde cero para soportar proyectos React Native, así como proyectos nativos puros. Actualmente es compatible con las versiones React Native <= 0.64.

## Instalación

El setup completo de Detox se describe en este link:

https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md

Repasaremos los pasos principales que debe seguir un desarrollador para usar Detox, con el fin de crear y ejecutar las descripciones de las pruebas. También se puede configurar para ser utilizado como parte del pipeline de CI.

**Detox CLI** debe instalarse globalmente:

```sh
# Install detox globally
npm install -g detox-cli
```

Algunas librerías deben ser añadidas al `package.json` de nuestra app de React Native.

- Añadir `detox` como dependencia de desarrollo
- Añadir o actualizar `jest` a jest@^27.0.0

```sh
# Add detox as dev dependency
yarn add detox --dev

# Upgrade jest
yarn add jest@^27.0.0 --dev
```

Ahora lanzar el script de inicialización automático:

```
# Init detox
detox init -r jest
```

Dicho script crea varios archivos:

- Un archivo `.detoxrc.json`.**(\*)**
- Una carpeta `e2e/` en la raiz del proyecto
- Un archivo `e2e/config.json`
- Un archivo `e2e/environment.js`
- Un archivo `e2e/firstTest.e2e.js`

**(\*) NOTA** Las propiedades `build` y `binaryPath` tanto para la app de iOS como para la de Android en este archivo no están definidos.

Algunos parámetros en `.detoxrc.json` deben ser definidos o modificados. En particular, las propiedades `build` y `binaryPath` faltan o tienen placeholders, y también `avdName` y `testBinaryPath` en Android. Los siguientes valores funcionan en iOS (hasta cierto punto también para Android, pero en el momento de escribir este artículo hay algunos problemas que impiden que funcione completamente):

```json
{
  "testRunner": "jest",
  "runnerConfig": "e2e/config.json",
  "skipLegacyWorkersInjection": true,
  "apps": {
    "ios": {
      "build": "xcodebuild -workspace ios/pushdemo.xcworkspace -scheme pushdemo -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build",
      "type": "ios.app",
      "binaryPath": "ios/build/Build/Products/Debug-iphonesimulator/pushdemo.app"
    },
    "android": {
      "build": "cd android && ./gradlew assembleAndroidTest -DTestBuildType=debug && cd ..",
      "type": "android.apk",
      "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
      "testBinaryPath": "android/app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk"
    }
  },
  "devices": {
    "simulator": {
      "type": "ios.simulator",
      "device": {
        "type": "iPhone 11"
      }
    },
    "emulator": {
      "type": "android.emulator",
      "device": {
        "avdName": "Pixel_3a_API_30_x86"
      }
    }
  },
  "configurations": {
    "ios": {
      "device": "simulator",
      "app": "ios"
    },
    "android": {
      "device": "emulator",
      "app": "android"
    }
  }
```

### Pasos específicos para Android

Sigue este enlace para comprobar que existe el entorno apropiado con Java, SDK de Android y emuladores AOSP:

https://github.com/wix/Detox/blob/master/docs/Introduction.AndroidDevEnv.md

Actualmente, Android tiene algunos problemas. El build de Detox funciona pero los tests de Detox no. Hay muchas issues abiertas en el proyecto Detox relacionadas con Android, por lo que probablemente tendremos que esperar para verlo funcionar con la versión actual.

Por otro lado, pude descargar el ejemplo de React Native de Detox y ejecutar las pruebas de Android. No pude traducir los pasos exactos necesarios para trabajar en mi proyecto demo, ni encontré esos pasos en la documentación, pero supongo que podría lograrse trabajando más en ello.

### Pasos específicos para iOS

Sigue este enlace para comprobar que existe un entorno apropiado con las herramientas de línea de comandos de XCode y las utilidades del simulador:

https://github.com/wix/Detox/blob/master/docs/Introduction.iOSDevEnv.md

## Construyendo y corriendo los tests

Cuando se usa Detox con Jest como test runner, los tests son muy similares a los tests unitarios. Deberíamos configurarlos para que tengan una extensión diferente a las pruebas unitarias, es decir, `*.e2e.js` y `*.e2e.ts` serían una buena opción.

Los tests de Detox utilizan un campo `testID` en los templates JSX para hacer coincidir un determinado elemento por ID. Por ejemplo, podemos escribir una prueba como esta para comprobar que se muestra una determinada Vista o texto.

```javascript
it('should show a title and a description', async () => {
  await expect(element(by.id('title'))).toBeVisible();
  await expect(element(by.id('description'))).toBeVisible();
});
```

Ahora el JSX debería incluir dichos atributos `testID`, así:

```javascript
<View>
  <View>
    <Text testID="title">E2E testing with Detox</Text>
    <Text testID="description">
      This app is testeable with Detox. Push the button to display a greeting
      message.
    </Text>
    {isMessageVisible && <Text testID="message">Hello world!</Text>}
  </View>

  <View>
    <Button testID="message_button" title="Say Hello" onPress={buttonHandler} />
  </View>
</View>
```

La especificación de test puede activar botones, escribir texto dentro de los campos de entrada, etc. Por ejemplo, la siguiente prueba comprueba que aparece un texto en un contenedor después de hacer clic en un botón.

```javascript
it('should show a hello world message after tapping the button', async () => {
  await element(by.id('message_button')).tap();
  await expect(element(by.id('message'))).toBeVisible();
  await expect(element(by.text('Hello world!'))).toBeVisible();
});
```

Para ejecutar los tests, debemos construirlos con Detox y luego ejecutarlos. Estos comandos también se pueden incluir en `package.json` para facilitar su uso con `npm` o `yarn`.

```sh
# build and test for ios
detox build -c ios
detox test -c ios

# build and test for android
detox build -c android
detox test -c android
```

Después de ejecutar los tests, obtenemos una lista de los tests que pasan y los que fallan, como es habitual con el test runner de jest.

```sh
  App
    ✓ should show a title and a description (1029 ms)
    ✓ should show a hello world message after tapping the button (1377 ms)

  2 passing
```

Así es como se ejecuta el test E2E en un simulador:

![E2E test run](/img/blog/2021-10-31_e2e-testing-in-rn-with-detox/detox_e2e_test.gif)

Puedes encontrar el código fuente de este post en:

https://github.com/jguix/detox-demo

## Más sobre testeo en React Native

Durante el trabajo en este post encontré útil la información contenida en este sitio, además de la documentación oficial de Detox:

https://reactnativetesting.io/e2e/intro.html

Cubre pruebas unitarias, pruebas de componentes, pruebas de extremo a extremo e integración continua para proyectos React Native. La documentación es bastante sencilla y llena algunos de los huecos de la documentación de Detox.

## Créditos

Foto por [Joshua Mayo](https://unsplash.com/@mayofi) en [Unsplash](https://unsplash.com).
