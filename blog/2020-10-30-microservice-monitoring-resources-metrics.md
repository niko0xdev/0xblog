---
title: Microservice monitoring - Resources Metrics
description: Monitoring containerized microservices with resources metrics.
tags:
  [
    microservices,
    microservice,
    logs,
    logging,
    traces,
    tracing,
    monitors,
    monitoing,
  ]
authors: [niko]
---

> Logs are easy to integrate into your application, and they give you the ability to represent any type of data in the form of strings.
>
> Metrics, on the other hand, are numerical representations of data. These are often used to count or measure a value and are aggregated over a period of time.

<!-- truncate -->

Metrics give us insights into the historical and current state of a system. Since they are just numbers, we can also use them to perform statistical analysis and predictions about the system’s future behaviour.

Metrics contain low-resolution data. This may include a count of parameters (such as requests, errors, and so on) and measures of resources (such as CPU and memory utilization).

[![/img/clm/grafana-dashboard.png](/img/clm/grafana-dashboard.png)](/img/clm/grafana-dashboard.png)

## The Cost of Logs and Metrics

Logs are expensive to store. The storage overhead of logs also increases over time and is directly proportional to the increase in traffic.

Metrics have a constant storage overhead. The cost of storage and retrieval of metrics does not increase too much with the increase in traffic. It is, however, dependent on the number of variables we emit with each metric.

## Types of Metrics

### Golden signals are an effective way of monitoring the overall state of the system and identifying problems

- Availability: State of your system measured from the perspective of clients (for example, the percentage of errors on total requests).
- Health: State of your system measured using periodic pings.
- Request Rate: Rate of incoming requests to the system.
- Saturation: How free or loaded the system is (foe example, the queue depth or available memory).
- Utilization: How busy the system is (for example, CPU load or memory usage). This is represented as a percentage.
- Error Rate: Rate of errors being produced in the system.
- Latency: Response time of the system, usually measured in the 95th or 99th percentile.

### Resource metrics

Resource metrics are almost always made available by default from the infrastructure provider (AWS CloudWatch or Kubernetes metrics) and are used to monitor infrastructure health.

- **CPU/Memory Utilization**: Usage of the system’s core resources.
- **Host Count**: Number of hosts/pods that are running your system (used to detect availability issues due to pod crashes).
- **Live Threads**: Threads spawned in your service (used to detect issues in multi-threading).
- **Heap Usage**: Heap memory usage statistics (can help debug memory leaks).

### Business metrics

Business metrics can be used to monitor granular interaction with core APIs or functionality in your services.

- **Request Rate**: Rate of requests to the APIs.
- **Error Rate**: Rate of errors being thrown by the APIs.
- **Latency**: Time taken to process requests by the APIs.

## Dashboards and Alerts

Since metrics are stored in a time-series database, it’s more efficient and reliable to run queries against them for measuring the state of the system.

These queries can be used to build dashboards for representing the historical state of the system.

They can also be used to trigger alerts when there is an issue with the system (e.g. an increase in the number of errors observed or a sudden spike in CPU utilization).

Due to their numeric nature, we can also create complex mathematical queries (such as X% of errors in last Y minutes) to monitor system health.

**_References:_**

- _[https://www.freecodecamp.org/news/microservice-observability-metrics](https://www.freecodecamp.org/news/microservice-observability-metrics)_
