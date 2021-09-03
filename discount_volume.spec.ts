import DiscountVolume from './discount_volume'
import { IProduct } from './types'

describe('Test Volume Discount', () => {
  it('should show the right amount 1', () => {
    const discount = new DiscountVolume('ult_small', 3)

    const items: IProduct[] = [
      {
        code: 'ult_small',
        name: 'Unlimited 1GB',
        price: 9.9,
        quantity: 3,
        total: 29.7
      }
    ]

    const expectedAmount = items[0].total - items[0].price

    const newItems = discount.apply(items)

    expect(newItems[0].total).toEqual(expectedAmount)
  })
})
