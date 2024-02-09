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
type ReportResultType = string

enum ReportTypeEnum {
  csv = "csv",
  plain_text = "plain_text",
  html = "html",
  short_plain_text = "short_plain_text",
}

class ReportGenerator {
  generate(type: ReportTypeEnum, products: ProductType[]): ReportResultType {}
}
```

So far so good. We've got the `type` of the Report we want to generate, we have a list of products. Let's do the job and implement the `ReportGenerator#generate` method. We do not really want to focus on the content of the reports, as the main educational purpose lies somewhere else. The assumption is the business is really fine with it.

```typescript
class ReportGenerator {
  generate(type: ReportTypeEnum, products: ProductType[]): ReportResultType {
    if (type === ReportTypeEnum.csv) {
      return products
        .map(product => Object.values(product).join(","))
        .join("\n")
    }
    if (type === ReportTypeEnum.plain_text) {
    }
    if (type === ReportTypeEnum.html) {
      return ""
    }
    return ""
  }
}
```

> In computer programming, the strategy pattern (also known as the policy pattern) is a behavioral software design pattern that enables selecting an algorithm at runtime. Instead of implementing a single algorithm directly, code receives run-time instructions as to which in a family of algorithms to use.
