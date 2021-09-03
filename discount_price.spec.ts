import DiscountPercentage from './discount_price'

import { IProduct } from './types'

describe('Test Bulk Percentage Discount', () => {
  it('should show the right amount 1', () => {
    const drop = 39.9

    const discount = new DiscountPercentage('ult_large', 3, 39.9)

    const items: IProduct[] = [
      {
        code: 'ult_large',
        name: 'Unlimited 5GB',
        price: 44.9,
        quantity: 4,
        total: 179.6
      }
    ]

    const expectedAmount = drop * 4

    const newItems = discount.apply(items)

    expect(newItems[0].total).toEqual(expectedAmount)
  })
})
