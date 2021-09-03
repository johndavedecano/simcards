import { ICartItem, IPriceRule, IProduct, IPromoCode } from './types'

class ShoppingCart {
    private _items = {}

    public rules: IPriceRule[] = []

    public promoCode: IPromoCode

    /**
     * @param rules IPriceRule[]
     */
    public constructor(rules: IPriceRule[]) {
        this.rules = rules
    }

    /**
     * 
     * @param item IProduct
     * @param promoCode IPromoCode
     */
    public add(item: ICartItem, promoCode?: IPromoCode) {
        if (promoCode) {
            this.promoCode = promoCode
        }

        if (!this._items[item.code]) {
            this._items[item.code] = {
                code: item.code,
                name: item.name,
                price: item.price,
                quantity: 0,
                total: 0,
            }
        }

        const newQuantity = this._items[item.code].quantity + 1
        const newTotal = this._items[item.code].price * newQuantity

        this._items[item.code] = {
            ...this._items[item.code],
            quantity: newQuantity,
            total: newTotal,
        }
    }

    /**
     * @param nextItems IProduct[]
     * @returns IProduct[]
     */
    private _getItems(nextItems): IProduct[] {
        let items = Object.values({ ...nextItems })

        this.rules.forEach((rule: IPriceRule) => {
            items = rule.apply(items)
        })

        return items
    }

    public get items() {
        return this._getItems(this._items)
    }

    public get total(): number {
        let total = Number(
            this._getItems(this._items).reduce((a: number, b: IProduct) => {
                a = a + b.total
                return a
            }, 0)
        )

        if (this.promoCode) {
            const deduction = this.promoCode.discount / 100 * total
            total = total - deduction
        }

        return total
    }
}

export default ShoppingCart
