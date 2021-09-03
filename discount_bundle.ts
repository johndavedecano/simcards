import { IPriceRule, IProduct } from './types'

/**
 * DiscountBundle
 */
class DiscountBundle implements IPriceRule {
    public code: string
    public quantity: number
    public discount: IProduct

    /**
     * Constructor
     * @param code 
     * @param quantity 
     * @param discount 
     */
    public constructor(code: string, quantity: number, discount: IProduct) {
        this.code = code
        this.quantity = quantity
        this.discount = discount
    }

    /**
     * Get a x bundled for every y product bought
     * @param items 
     * @returns IProduct[]
     */
    public apply(items: IProduct[]): IProduct[] {

        let isEntitled: number = 0

        const nextItems = items.reduce((items: Object, item: IProduct) => {
            items[item.code] = item
            if (item.code === this.code && item.quantity > 0 && !item.bundle) {
                isEntitled++
            }
            return items
        }, {})

        if (isEntitled && !nextItems[this.discount.code]) {
            nextItems[this.discount.code] = {
                name: this.discount.name,
                code: this.discount.code,
                quantity: 0,
                price: this.discount.price,
                total: 0,
                bundled: true
            }
        }

        for (let i = 0; i < isEntitled; i++) {
            nextItems[this.discount.code].quantity = nextItems[this.discount.code].quantity + this.discount.quantity
            nextItems[this.discount.code].total = 0
        }

        return Object.values(nextItems)
    }
}

export default DiscountBundle
