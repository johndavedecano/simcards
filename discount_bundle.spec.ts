import DiscountBundle from './discount_bundle'
import { IProduct } from './types'

describe('Test Bundle Discount', () => {
    it('should show the right amount 1', () => {
        const discount = new DiscountBundle('ult_medium', 1, {
            code: '1gb',
            name: '1 GB Data-pack',
            price: 9.9,
            quantity: 1
        })

        const items: IProduct[] = [
            {
                code: 'ult_medium',
                name: 'Unlimited 2GB',
                price: 29.9,
                quantity: 1,
                total: 29.9,
            },
        ]

        const newItems = discount.apply(items)

        expect(newItems[1].code === '1gb').toBe(true)
    })
})
