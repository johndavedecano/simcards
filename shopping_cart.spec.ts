import catalogue from './catalogue'
import DiscountBundle from './discount_bundle'
import DiscountPrice from './discount_price'
import DiscountVolume from './discount_volume'
import ShoppingCart from './shopping_cart'
import { IPromoCode } from './types'

describe('Test Shopping Cart', () => {
  it('should match case 94.7', () => {
    const shoppingCart = new ShoppingCart([
      new DiscountVolume('ult_small', 3),
      new DiscountPrice('ult_large', 3, 5),
      new DiscountBundle('ult_medium', 1, {
        code: '1gb',
        name: '1 GB Data-pack',
        price: 9.9,
        quantity: 1
      })
    ])

    shoppingCart.add(catalogue['ult_small'])
    shoppingCart.add(catalogue['ult_small'])
    shoppingCart.add(catalogue['ult_small'])
    shoppingCart.add(catalogue['ult_large'])

    expect(parseFloat('94.7').toFixed(1)).toBe(
      parseFloat(String(shoppingCart.total)).toFixed(1)
    )
  })

  it('should match case 209.40', () => {
    const shoppingCart = new ShoppingCart([
      new DiscountVolume('ult_small', 3),
      new DiscountPrice('ult_large', 3, 39.9),
      new DiscountBundle('ult_medium', 1, {
        code: '1gb',
        name: '1 GB Data-pack',
        price: 9.9,
        quantity: 1
      })
    ])

    shoppingCart.add(catalogue['ult_small'])
    shoppingCart.add(catalogue['ult_small'])

    shoppingCart.add(catalogue['ult_large'])
    shoppingCart.add(catalogue['ult_large'])
    shoppingCart.add(catalogue['ult_large'])
    shoppingCart.add(catalogue['ult_large'])

    expect(parseFloat('209.4').toFixed(1)).toBe(
      parseFloat(String(shoppingCart.total)).toFixed(1)
    )
  })

  it('should match case 84.70', () => {
    const shoppingCart = new ShoppingCart([
      new DiscountVolume('ult_small', 3),
      new DiscountPrice('ult_large', 3, 39.9),
      new DiscountBundle('ult_medium', 1, {
        code: '1gb',
        name: '1 GB Data-pack',
        price: 9.9,
        quantity: 1
      })
    ])

    shoppingCart.add(catalogue['ult_small'])

    shoppingCart.add(catalogue['ult_medium'])
    shoppingCart.add(catalogue['ult_medium'])

    expect(parseFloat('84.70').toFixed(1)).toBe(
      parseFloat(String(shoppingCart.total)).toFixed(1)
    )
  })

  it('should match case 31.32', () => {
    const shoppingCart = new ShoppingCart([
      new DiscountVolume('ult_small', 3),
      new DiscountPrice('ult_large', 3, 39.9),
      new DiscountBundle('ult_medium', 1, {
        code: '1gb',
        name: '1 GB Data-pack',
        price: 9.9,
        quantity: 1
      })
    ])

    const promoCode: IPromoCode = {
      code: 'I<3AMAYSIM',
      discount: 10
    }

    shoppingCart.add(catalogue['ult_small'])

    shoppingCart.add(catalogue['1gb'], promoCode)

    expect(parseFloat('31.32').toFixed(1)).toBe(
      parseFloat(String(shoppingCart.total)).toFixed(1)
    )
  })
})
