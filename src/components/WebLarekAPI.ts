// src/components/WebLarekAPI.ts

import { Api } from './base/api';
import { IOrderResult, IProduct, IOrder, ApiListResponse, IWebLarekAPI } from '../types';

export class WebLarekAPI extends Api implements IWebLarekAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductItem(id: string): Promise<IProduct> {
        return this.get<IProduct>(`/product/${id}`).then((item) => ({
            ...item,
            image: `${this.cdn}${item.image}`,
        }));
    }

    getProductList(): Promise<IProduct[]> {
        return this.get<ApiListResponse<IProduct>>('/product').then((data) =>
            data.items.map((item) => ({
                ...item,
                image: `${this.cdn}${item.image}`,
            }))
        );
    }

    orderProducts(order: IOrder): Promise<IOrderResult> {
        return this.post<IOrderResult>(`/order`, order);
    }
}
