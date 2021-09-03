import { IPriceRule, IProduct } from './types'

/**
 * DiscountPercentage
 */
class DiscountPercentage implements IPriceRule {
  public code: string
  public quantity: number
  public discount: number

  /**
   * Constructor
   * @param code
   * @param quantity
   * @param discount
   */
  public constructor(code: string, quantity: number, discount: number) {
    this.code = code
    this.quantity = quantity
    this.discount = discount
  }

  /**
   * Get percentage discount for every bulk order
   * @param items
   * @returns IProduct[]
   */
  public apply(items: IProduct[]): IProduct[] {
    return items.map((item: IProduct) => {
      if (item.code === this.code && !item.bundle) {
        if (item.quantity > this.quantity) {
          item.total = item.quantity * this.discount
        }
      }

      return item
    })
  }
}

export default DiscountPercentage
