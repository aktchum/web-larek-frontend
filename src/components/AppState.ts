// src/components/AppState.ts

import { Model } from './base/Model';
import { IProduct, IOrder, IDeliveryForm, IAppState, FormErrors, IPersonalForm } from '../types';
import { IEvents } from '../types';

export class Product extends Model<IProduct> implements IProduct {
    id: string;
    category: string;
    image: string;
    title: string;
    price: number | null;
    description: string;

    constructor(data: IProduct, events: IEvents) {
        super(data, events);
        this.id = data.id;
        this.category = data.category;
        this.image = data.image;
        this.title = data.title;
        this.price = data.price;
        this.description = data.description;
    }
}

export class AppState extends Model<IAppState> {
    basket: Product[] = [];
    catalog: Product[] = [];
    order: IOrder = {
        email: '',
        phone: '',
        payment: 'cash',
        address: '',
        items: [],
        total: 0,
    };
    preview: string | null = null;
    formErrors: FormErrors = {};

    constructor(events: IEvents) {
        super({}, events);
    }

    clearOrder(): void {
        this.order = {
            email: '',
            phone: '',
            payment: 'cash',
            address: '',
            items: [],
            total: 0,
        };
    }

    updateBasket(): void {
        this.emitChanges('counter:changed', { count: this.basket.length });
        this.emitChanges('basket:changed', this.basket);
    }

    clearBasket(): void {
        this.basket = [];
        this.updateBasket();
    }

    setCatalog(items: IProduct[]): void {
        this.catalog = items.map((item) => new Product(item, this.events));
        this.emitChanges('items:changed', { catalog: this.catalog });
    }

    setPreview(item: Product): void {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

    addToBasket(item: Product): void {
        if (!this.basket.some((basketItem) => basketItem.id === item.id)) {
            this.basket.push(item);
            this.updateBasket();
        }
    }

    removeFromBasket(item: Product): void {
        this.basket = this.basket.filter((element) => element.id !== item.id);
        this.updateBasket();
    }

    setDeliveryField(field: keyof IDeliveryForm, value: string): void {
      if (field in this.order) {
          this.order[field] = value;
      }
      if (this.validateDelivery()) {
          this.events.emit('order:ready', this.order);
      }
  }
  
    setPersonalField(field: keyof IPersonalForm, value: string): void {
        if (field in this.order) {
            this.order[field] = value;
        }
        if (this.validatePersonal()) {
            this.events.emit('contacts:ready', this.order);
        }
    }
  

    validateDelivery(): boolean {
        const errors: FormErrors = {};
        if (!this.order.address) {
            errors.address = 'Укажите адрес';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    validatePersonal(): boolean {
        const errors: FormErrors = {};
        if (!this.order.email) {
            errors.email = 'Укажите email';
        }
        if (!this.order.phone) {
            errors.phone = 'Укажите номер телефона';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }
}
