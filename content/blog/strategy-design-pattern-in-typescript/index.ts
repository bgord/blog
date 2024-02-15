type ProductType = {
  id: string
  name: string
  quantity: number
  price: number
  soldAt: number
}

type ReportResultType = string

enum ReportTypeEnum {
  csv = "csv",
  plain_text = "plain_text",
  html = "html",
}

enum RoleEnum {
  admin = "admin",
  regular = "regular",
}

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

    const rows = products
      .filter(product =>
        type === ReportTypeEnum.html ? product.price >= 1 : true
      )
      .map(product => Object.values(product).join(" "))

    if (type === ReportTypeEnum.html) {
      return /* HTML */ `
        <ul>
          ${rows.map(row => `<li>${row}</li>`)}
        </ul>
      `
    }

    // plain_text
    return rows.join("\n")
  }
}
