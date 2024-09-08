---
title: Multi threading and development mistakes
description: What is multi threading helpful?
tags: [multi-thread, multi, threading]
authors: [niko]
---

Multi threading, or multi-threading is a programming method geared towards processing parallel concurrent tasks based on hardware design and specifically CPU.

<!-- truncate -->

:::tip

In fact, developers often don't have much access to multithreading related processes, because they are complex and have many risks.

So what's so good about multithreading and what risks do we need to be aware of?

:::

Let's go!!!

For example, you need to unzip idols information from `1000 zipped files`. Each file you take 10 minutes to decompress, for example:
`1000 * 10 = 10,000 minutes (~7 days)` to decompress all of this.

=> but that's taking a long time, you want it in 1 day.

-> ez, divided into `7 machines`, each machine `1000/7 files`.

But wait, I'm using an i7-8750H (just get it) right? My CPU basically has 12 Threads (real core).

=> This means that this CPU can handle 12 tasks in parallel, in this case, files). That's it in theory, but actually those 12 threads still have to take care of OS tasks!

**This is the problem that multithreading will be used to solve.**

> Instead of using 1 thread to process all 1000 files, we use 7 threads to process these 1000 files. Since the theory is that the execution time will be reduced by 7 times, the reality depends on the memories as well. The CPU will then perform 7 parallel tasks for our app.

_That's good, 1 day is done!_

Yup, then what's the risk?

But, if each file you create 1 Thread to use then => 1000 Threads, ooh, they will be loaded into RAM, for example each file is 1GB (idols are sure more)

=> We need `1000 GB` for memory. The big problem.

Obviously this is not possible, assuming your PC has 16 GB of RAM, it will definitely crash the app because of an overflow error.

=> When using multithreading we need to manage it, solution is instead of creating 1000 threads, we create 1 manager (pooling - thread pooling), it will execute 7 files at a time and only execute files. 8th when one of the files is completed.

It's roughly but 1 pool (~ connection pooling), it creates 7 swimming paths, it will let a guy in if there is a swimming pool that is free (no one is swimming, it must be dirty).

Above, is my sharing about a few aspects, some notes when using multi threading in programming!

Thanks for reading this far!!!

Refer with c# tuts:

- [https://www.tutorialspoint.com/csharp/csharp_multithreading.htm](https://www.tutorialspoint.com/csharp/csharp_multithreading.htm)
- [https://docs.microsoft.com/en-us/dotnet/api/system.threading.threadpool?view=netframework-4.8](https://docs.microsoft.com/en-us/dotnet/api/system.threading.threadpool?view=netframework-4.8).
