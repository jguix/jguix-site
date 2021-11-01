---
title: 'End-to-end testing in React Native with Detox'
description: 'In this post I will introduce Detox as a tool for end-to-end testing for React Native. Detox helps us reduce our reliance on manual QA.'
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

High velocity mobile development requires us to adopt continuous integration workflows. The most difficult part of automated testing on mobile is the tip of the testing pyramid, the **E2E (end to end) tests**.

E2E tests, when carried out manually, are **very time consuming and repeatedly boring**. Sometimes they can also be **non-deterministic**, depending on asynchronous operations that might take place in a different order inside your app. This is also known as flakiness. Another difficulty is, there are not many options for automated E2E tests using React Native.

In this post I will introduce [Detox](https://github.com/wix/Detox) as a tool for end-to-end testing for React Native. Detox helps us reduce our reliance on manual QA.

Detox tests your mobile app while it's running in a real device/simulator, interacting with it just like a real user.

Detox philosophy promotes gray box testing instead of black box testing:

- **Black Box Testing:** Software Testing technique in which the tester doesn’t know the internal structure, design and implementation of the software application that is being tested.
- **Gray Box Testing:** Software testing technique which is a combination of Black Box Testing technique and White Box Testing technique. The internal structure, design and implementation is partially known in Gray Box Testing.

Theoretically, it sounds better to test exactly what you ship as a black box. In practice, switching to gray box allows the test framework to monitor the app from the inside and delivers critical wins like fighting flakiness at the core.

Detox is built from the ground up to support React Native projects as well as pure native ones. It currently supports React Native versions <=0.64.

## Installation

The whole Detox setup is described in this link:

https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md

We will go through the main steps that a developer should take to use Detox, in order to create and run the test descriptions. It can also configured to be used as part of the CI pipeline.

**Detox CLI** needs to be installed globally:

```sh
# Install detox globally
npm install -g detox-cli
```

Some libraries need to be added in `package.json` of our React Native app.

- Adding `detox` as a development dependency
- Adding or upgrading `jest` to jest@^27.0.0

```sh
# Add detox as dev dependency
yarn add detox --dev

# Upgrade jest
yarn add jest@^27.0.0 --dev
```

Then run the automated init script:

```
# Init detox
detox init -r jest
```

That script creates several files:

- A `.detoxrc.json` file.**(\*)**
- An `e2e/` folder in your project root
- An `e2e/config.json` file
- An `e2e/environment.js` file
- An `e2e/firstTest.e2e.js` file

**(\*) NOTE** The `build` and `binaryPath` for both iOS and Android apps in this file are not set.

Some parameters in `.detoxrc.json` need to be added or modified. Particularly the `build` and `binaryPath` properties are missing or filled with placeholders, and also the `avdName` and `testBinaryPath` in Android. These values work on iOS (they kind of work for Android but at the time of writing this article there are some issues that prevent it working):

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

### Android specific steps

Please follow this link in order to check that a proper environment with Java, Android SDK and AOSP emulators is available:

https://github.com/wix/Detox/blob/master/docs/Introduction.AndroidDevEnv.md

Android has currently some issues. The detox build works but the detox test does not. There are many open issues in the Detox project regarding Android so we will probably have to wait to see that working with the current version.

On the other hand, I was able to download the React Native example from Detox and run the Android tests. I couldn’t translate the exact steps needed to work on my sample project, nor I found those steps in the documentation, but I guess that could be achieved putting more work on it.

### iOS specific steps

Please follow this link in order to check that a proper environment with XCode command line tools and simulator utils is available:

https://github.com/wix/Detox/blob/master/docs/Introduction.iOSDevEnv.md

## Building and running tests

When using Detox with Jest as test runner, the tests are very similar to unit tests. We should configure them to have different extension than unit tests, i.e. `*.e2e.js` and `*.e2e.ts` would be a good choice.

Detox tests use a `testID` field in JSX templates to match a certain element by ID. For instance, we can write a test like this to assert that a certain View or text are shown.

```javascript
it('should show a title and a description', async () => {
  await expect(element(by.id('title'))).toBeVisible();
  await expect(element(by.id('description'))).toBeVisible();
});
```

Then the JSX should just include those `testID` attributes, just like this:

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

The test spec can trigger buttons, write text inside of input fields and so on. For instance, the following test asserts that a text appears on a container after clicking a button.

```javascript
it('should show a hello world message after tapping the button', async () => {
  await element(by.id('message_button')).tap();
  await expect(element(by.id('message'))).toBeVisible();
  await expect(element(by.text('Hello world!'))).toBeVisible();
});
```

To run the tests, we must build the tests with Detox and then run them. These commands can also be included in `package.json` for easier use with `npm` or `yarn`.

```sh
# build and test for ios
detox build -c ios
detox test -c ios

# build and test for android
detox build -c android
detox test -c android
```

After running the test, we get a list of passing or failing tests, as usual with jest test runner.

```sh
  App
    ✓ should show a title and a description (1029 ms)
    ✓ should show a hello world message after tapping the button (1377 ms)

  2 passing
```

This is how the E2E test runs on a simulator:

![E2E test run](/img/blog/2021-10-31_e2e-testing-in-rn-with-detox/detox_e2e_test.gif)

You can find the code for this post in:

https://github.com/jguix/detox-demo

## More on React Native testing

During the work on this post I found helpful the information contained in this site, besides the official Detox documentation:

https://reactnativetesting.io/e2e/intro.html

They cover unit tests, component tests, end to end tests and continuous integration for React Native projects, and the documentation is quite straightforward and fills some of the gaps of the Detox docs.

## Credits

Photo by [Joshua Mayo](https://unsplash.com/@mayofi) on [Unsplash](https://unsplash.com).
