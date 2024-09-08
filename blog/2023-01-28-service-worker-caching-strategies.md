---
title: Javascript series - Service Worker and Caching strategies
description: Service workers are a powerful tool for web development, providing developers with more control over the network and caching strategies of web applications
tags: [javascript, service worker, sw, workbox]
authors: [niko]
---

:::tip

> Service workers are a powerful tool for web development, providing developers with more control over the network and caching strategies of web applications

:::

<!-- truncate -->

## What is service workers?

`Service workers` are a game-changer for web development. They allow developers to create offline-capable web applications, improve performance, and even enable push notifications. But what exactly are they, and how do they work?

A service worker is a type of JavaScript worker that runs in the background, separate from the main browser thread. It has the ability to intercept network requests, access the browser's cache, and serve responses from the cache or the network, depending on the availability of the network and the resources being requested.

One of the main benefits of service workers is that they allow web applications to work offline. When a service worker is installed, it can cache the resources needed for the application to run, such as HTML, CSS, and JavaScript files. When the user navigates to the application while offline, the service worker can intercept the request and serve the cached resources, allowing the application to continue functioning as normal.

But service workers can do more than just provide offline capabilities. They can also be used to improve the performance of web applications by caching resources and reducing the number of network requests. For example, a service worker can cache images and other assets, so they are loaded from the cache instead of being downloaded from the network each time the user navigates to the page.

Another benefit of service workers is the ability to receive push notifications. Even when the browser is closed, a service worker can listen for push notifications and display them to the user, providing a more engaging and interactive experience.

It's important to note that service workers are only available on HTTPS connections, to ensure the security of the service worker and the resources it handles.

Caching is one of the key features of service workers and it is essential for creating offline-capable web applications. Service workers can intercept network requests and access the browser's cache, allowing developers to implement custom caching strategies that suit the specific needs of their application. Some popular caching strategies include "cache first", "network first", and "cache and network race" strategy. Developers can also choose to expire certain resources after a certain period of time so that they are only fetched from the network when they are deemed out-of-date.

### How to install a service worker?

Installing a service worker is a multi-step process that involves registering the service worker file, and then having the service worker take control of a specific scope. Here is an example of how to install a service worker:

- Register the service worker: In your HTML file, you will need to register the service worker using the `navigator.serviceWorker.register()` method. This method takes the path to the service worker file as the first argument and an options object as the second argument. The scope property of the options object is used to specify the scope of the service worker.

  ```javascript
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then(function (registration) {
        console.log("Service worker registered: ", registration.scope);
      })
      .catch(function (error) {
        console.log("Service worker registration failed: ", error);
      });
  }
  ```

- The service worker file: The service worker file is a JavaScript file that contains the code to run the service worker. It should contain at least the install and fetch event listeners, as well as any other code that is needed to implement the caching strategies, push notifications, etc.

  ```javascript
  self.addEventListener("install", (event) => {
    //...
  });
  self.addEventListener("fetch", (event) => {
    //...
  });
  ```

- Take control of the scope: Once the service worker is registered, it will start the installation process. The install event is fired and you can use it to cache the resources you need in order to make the web app work offline. Once the installation process is finished, the service worker will be in a "waiting" state. Once all the tabs of your web app are closed, the service worker will be activated and it will take control of the scope that you specified in the registration process.

## Caching strategies with Service workers

### 1. Stale-while-revalidate

![Stale-while-revalidate](/img/sw/stale-while-revalidate.avif)

`Stale-While-Revalidate` is a caching strategy that is commonly used with service workers. The idea behind this strategy is to serve a stale version of a resource from the cache while simultaneously checking for a newer version of the resource on the network. This strategy is particularly useful for resources that change frequently, such as API data.

Here's an example of how to implement the Stale-While-Revalidate strategy with a service worker:

```javascript
// Intercept fetch requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open("my-cache").then((cache) => {
      return cache.match(event.request).then((response) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});
```

In this example, the `fetch` event listener is used to intercept all network requests made by the web application. The `caches.match(event.request)` method is used to check if the requested resource is available in the cache. If it is, the cached version of the resource is returned immediately to the user and at the same time, the resource is requested again from the network using the `fetch()` method. Once the network request is finished, the new response is stored in the cache using the `cache.put(event.request, networkResponse.clone())` method and the next time the resource is requested, the updated version will be served.

It's important to note that the `Stale-While-Revalidate` strategy does not automatically update the cache when a new version of a resource is available on the network, but it ensures that stale resources will not be served to the user for too long.

### 2. Cache-first

![Cache first](/img/sw/cache-first.avif)

`Cache First` is a caching strategy that is commonly used with service workers. The idea behind this strategy is to serve resources from the cache whenever possible, and only fetch them from the network if they are not available in the cache. This strategy is particularly useful for resources that are not likely to change frequently, such as images or static files.

Example of how to implement the Cache First strategy with a service worker:

```javascript
// Install the service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll(["/css/styles.css", "/js/main.js", "/img/logo.jpg"]);
    })
  );
});

// Intercept fetch requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If the resource is in the cache, return it
      if (response) {
        return response;
      }
      // Otherwise, fetch the resource from the network
      return fetch(event.request);
    })
  );
});
```

In this example, the service worker is first installed, and the `install` event listener is used to open a cache called "my-cache" and add all the resources that will be cached (CSS, JS, and image files).

The `fetch` event listener is then used to intercept all network requests made by the web application. The `caches.match(event.request)` method is used to check if the requested resource is available in the cache. If it is, the cached version of the resource is returned. If not, the resource is fetched from the network.

It's important to note that the Cache First strategy does not automatically update the cache when a new version of a resource is available on the network. If you want to update the cache with the latest version of a resource, you'll need to implement a separate mechanism to check for updates and update the cache accordingly.

In summary, the `Cache First` strategy is a simple yet powerful caching approach that allows you to serve resources from the cache whenever possible, reducing the number of network requests and improving the performance of your web application.

### 3. Network-first

![Cache first](/img/sw/network-first.avif)

`Network first` is a caching strategy that prioritizes serving the most up-to-date version of a resource by first attempting to fetch it from the network, and then falling back to the cached version if the network request fails. This strategy is useful for resources that need to be as up-to-date as possible, such as real-time stock prices or live sports scores.

Here is an example of how to implement the network first strategy using a service worker:

```javascript
self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        // If the request is successfull, update the cache and return the response
        caches.open("my-cache").then(function (cache) {
          cache.put(event.request, response.clone());
        });
        return response;
      })
      .catch(function () {
        // If the request fails, return the cached version of the resource
        return caches.match(event.request);
      })
  );
});
```

In this example, the service worker is listening for the fetch event and using the `fetch()` method to attempt to retrieve the requested resource from the network. If the request is successful, the response is cached using the `cache.put()` method and then returned to the browser. If the request fails, the service worker falls back to returning the cached version of the resource using the `caches.match()` method.

Please note that this is a basic example of how to implement the `Network first` strategy, for more complex scenario you may want to implement additional functionality such as handling errors and updating the cache.

### 4. Network-only

![Cache first](/img/sw/network-only.avif)

`Network only` is a caching strategy that only retrieves resources from the network and never serves them from the cache. This strategy is useful for resources that should never be cached, such as login pages or sensitive user data.

Here is an example of how to implement the `network only` strategy using a service worker:

```javascript
self.addEventListener("fetch", function (event) {
  event.respondWith(fetch(event.request));
});
```

In this example, the service worker is listening for the fetch event and using the `fetch()` method to retrieve the requested resource directly from the network. Since no caching is involved, the service worker will always serve the most up-to-date version of the resource.

It's important to note that if you are using the `Network only` strategy, you should also handle the case when there is no internet connection available.

```javascript
self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return new Response(
        "You are offline, please check your internet connection."
      );
    })
  );
});
```

In this example, if the network request fails, the service worker will return a response with a message indicating that the user is offline.

Please note that this is a basic example of how to implement the `Network only` strategy, for more complex scenario you may want to implement additional functionality such as handling errors and redirecting the user to a different page.

### 5. Cache-only

![Cache first](/img/sw/cache-only.avif)

`Cache only` is a caching strategy that only serves resources from the cache and never retrieves them from the network. This strategy is useful for resources that don't change often and can be cached for a long time, such as images or static assets.

Here is an example of how to implement the `cache only` strategy using a service worker:

```javascript
self.addEventListener("fetch", function (event) {
  event.respondWith(caches.match(event.request));
});
```

In this example, the service worker is listening for the fetch event and using the `caches.match()` method to retrieve the requested resource from the cache. If the resource is not found in the cache, the browser will receive a response with a `status` of `undefined`, which means that the resource is not available.

It's important to note that if you are using the `Cache only` strategy, you should pre-cache the resources that you want to be available offline.

```javascript
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("my-cache").then(function (cache) {
      return cache.addAll([
        "/styles/main.css",
        "/scripts/main.js",
        "/images/logo.jpg",
      ]);
    })
  );
});
```

In this example, the service worker is listening for the install event, and using the `caches.open()` method to open the cache and the `cache.addAll()` method to add the resources that should be available offline.

Please note that this is a basic example of how to implement the `Cache only` strategy, for more complex scenario you may want to implement additional functionality such as handling errors and updating the cache.

## Summary

Service workers are a powerful tool for handling caching in web applications. They allow you to control how resources are retrieved and served to the browser, even when the user is offline.
Each of these strategies have their own use cases, and it's important to choose the right one for your application.

It's also important to note that service workers can be used for other purposes than caching such as push notifications, background sync, and more.

## References

- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
- [Workbox-strategies](https://developer.chrome.com/docs/workbox/modules/workbox-strategies/)