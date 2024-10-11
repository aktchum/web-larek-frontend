// src/types/index.ts

export type ApiListResponse<Type> = {
  total: number;
  items: Type[];
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IEvents {
  on<T = any>(event: string, callback: (data: T) => void): void;
  emit<T = any>(event: string, data?: T): void;
  off(event: string, callback: (data: any) => void): void;
}

export interface IAppState {
  catalog: IProduct[];
  basket: IProduct[];
  preview: string | null;
  order: IOrder | null;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IWebLarekAPI {
  getProductList: () => Promise<IProduct[]>;
  getProductItem: (id: string) => Promise<IProduct>;
  orderProducts: (order: IOrder) => Promise<IOrderResult>;
}

export interface IProduct {
  id: string;
  category: string;
  image: string;
  title: string;
  price: number | null;
  description: string;
}

export interface ICard extends IProduct {
  buttonText?: string;
  index?: string;
}

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

export interface IFormState {
  valid: boolean;
  errors: string[];
}

export interface IModalData {
  content: HTMLElement;
}

export interface IBasketView {
  items: HTMLElement[];
  total: number;
}

export interface IPersonalForm {
  email: string;
  phone: string;
}

export interface IDeliveryForm {
  payment: string;
  address: string;
}

export interface IOrder extends IPersonalForm, IDeliveryForm {
  total: number;
  items: string[];
}

export interface IOrderResult {
  id: string;
  total: number;
}

export interface ISuccess {
  total: number;
}
