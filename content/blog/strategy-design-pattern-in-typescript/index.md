---
title: "Strategy design pattern in TypeScript"
date: "2024-02-08"
description: Strategy design explained pattern by example.
type: typescript
---

One day, your Product Owner brings a user story to the team's refinement session.
The requirement is to generate a report containg all products sold in the last week.
It sounds vague at first, but ok, you know which query should be used to get the list, you may have already received the data using a [Repository](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design#the-repository-pattern).

You may start wondering what format should the report be in, and the business said it is... all of them!
We have to implement CSV, plain text, HTML, and short plain text.

The data we may have to work with may be as follows:

```typescript
type ProductType = {
  id: string
  name: string
  quantity: number
  price: number
  soldAt: number
}

const products: ProductType = await ProductRepository.list()
```

The next easy step is to create a `ReportGenerator` function with the following interface:

```typescript
type ReportType = string

class ReportGenerator {
  generate(products: ProductType[]): ReportType {}
}
```

So far so good.

> In computer programming, the strategy pattern (also known as the policy pattern) is a behavioral software design pattern that enables selecting an algorithm at runtime. Instead of implementing a single algorithm directly, code receives run-time instructions as to which in a family of algorithms to use.
