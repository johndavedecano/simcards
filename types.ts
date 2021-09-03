export interface IProduct {
    code?: string;
    name?: string;
    price?: number;
    quantity?: number;
    total?: number;
    bundle?: boolean;
}

export interface IPriceRule {
    code: string;
    quantity: number;
    discount: number | string | IProduct;
    apply: Function
}

export interface ICartItem {
    code?: string;
    name?: string;
    price?: number;
}

export interface IPromoCode {
    code: string;
    discount: number
}