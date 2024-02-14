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
We have to implement CSV, plain text, and HTML.

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

    if (type === ReportTypeEnum.html) {
      return /* HTML */ `
        <ul>
          {products.map(product =>
              `<li>{Object.values(product).join(" ")}</li>`
          )}
        </ul>
      `
    }

    // plain_text
    return products.map(product => Object.values(product).join(" "))
  }
}
```

One could have a look at this code and say it looks fine, does the job, and does not overcomplicate things.

Let's make it more real world like though. We will not focus about the report generation itself - the output is not going to change, but we will care more about the approach to upcoming changes and the structure of the code.

Another day comes, and we receive the folliwng requirement. Only `admin`s are allowed to create CSV reports. Ok, you may think, it's not that hard. We will pass the `role` property to the `generate` method and adjust one of the if statements.

```typescript
class ReportGenerator {
  generate(
    type: ReportTypeEnum,
    role: RoleEnum,
    products: ProductType[]
  ): ReportResultType {
    if (type === ReportTypeEnum.csv) {
      if (role !== RoleEnum.admin) {
        throw new Error("Only admin can generate a csv report")
      }

      return products
        .map(product => Object.values(product).join(","))
        .join("\n")
    }

    if (type === ReportTypeEnum.html) {
      return /* HTML */ `
        <ul>
          {products.map(product =>
              `<li>{Object.values(product).join(" ")}</li>`
          )}
        </ul>
      `
    }

    // plain_text
    return products.map(product => Object.values(product).join(" "))
  }
}
```

A spotty eye in a code review may catch some "duplication" that is going on here. DRY, right? "Don't repeat yourself", the principle says. Ok, let's perform a mechanical refactoring of the `generate` method (for now).

```typescript
class ReportGenerator {
  generate(
    type: ReportTypeEnum,
    role: RoleEnum,
    products: ProductType[]
  ): ReportResultType {
    if (type === ReportTypeEnum.csv) {
      if (role !== RoleEnum.admin) {
        throw new Error("Only admin can generate a csv report")
      }

      return products
        .map(product => Object.values(product).join(","))
        .join("\n")
    }

    const rows = products.map(product => Object.values(product).join(" "))

    if (type === ReportTypeEnum.html) {
      return /* HTML */ `
        <ul>{rows.map(row => `<li>{row}</li>`)}</ul>
      `
    }

    // plain_text
    return rows;
  }
}
```

Few weeks passed, the code is working fine in the production. No issues, no errors. Just after the weekend, on Monday, the Product Owner comes to the refinement session, and presents the next requrement. "In the HTML report we need to exclude products cheaper than 1 of any currency". Strange, you may think, but as we all know, shit happens.

> In computer programming, the strategy pattern (also known as the policy pattern) is a behavioral software design pattern that enables selecting an algorithm at runtime. Instead of implementing a single algorithm directly, code receives run-time instructions as to which in a family of algorithms to use.
