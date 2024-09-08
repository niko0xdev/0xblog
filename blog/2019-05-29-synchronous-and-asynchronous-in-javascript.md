---
title: Synchronous and asynchronous handling in javascript
description: synchronus/asynchronus vs multiple thread
tags: [javascript, async, sync]
authors: [niko]
---

For web programmers, the concept of asynchronous (asynchronus) and synchronous (synchronus) is not too strange. However, there is a lot of confusion between synchronus/asynchronus and multiple threading. Let's analyze together!

<!-- truncate -->

## What's in this post?

:::tip

1. Understand the concept of synchronus/asynchronus.

2. Distinguish between synchronus/asynchronus and multiple thread multiple.
k
3. How is synchronus/asynchronus in javascript used?

4. Some common mistakes when using synchronus/asynchronus.

:::

## What is synchronus/asynchronus?

To understand these two concepts clearly, let's go from a real-life example, as follows: I load a news page for example, in which there is an image and the content of the article; and need to download the image from the server, but my file is quite heavy about `3Mb` plus my home network is a bit slow so it took me `5 minutes` to get the image.

According to the normal flow we will have 3 main actions as follows:

1. Get file from server (5 minutes)

2. Show this picture on the screen

3. Next screen processing (maybe scroll content below, bla.bla...)

If we execute sequentially `command 1` -> `command 2` -> `command 3` => at least `5 minutes`, we can scroll to read the content of the blog post.

*This mechanism is called blocking*

> Roughly blocking is a mechanism that freezes processes until they are unblocked. In this case the news page will be blocked until the image loads.
