import { IPriceRule, IProduct } from './types'

/**
 * DiscountVolume
 */
class DiscountVolume implements IPriceRule {
    public code: string
    public quantity: number
    public discount: number

    /**
     * Constructor
     * @param code 
     * @param quantity 
     */
    public constructor(code: string, quantity: number) {
        this.code = code
        this.quantity = quantity
    }

    /**
     * Apply discount per volume
     * @param items 
     * @returns IProduct[]
     */
    public apply(items: IProduct[]): IProduct[] {
        return items.map((item: IProduct) => {
            if (item.code === this.code && !item.bundle && item.quantity >= this.quantity) {
                const totalDiscountedQty = Math.ceil(item.quantity / this.quantity)

                const totalDiscountedAmount = totalDiscountedQty * item.price

                item.total = item.total - totalDiscountedAmount
            }

            return item
        })
    }
}

export default DiscountVolume
