// общие типы
export type ApiListResponse<Type> = {
  total: number,
  items: Type[]
};

// перечисление методов HTTP-запросов
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// EventName, Subscriber, EmitterEvent описание событий
export type EventName = string | RegExp;
export type Subscriber = Function;
export type EmitterEvent = {
  eventName: string,
  data: unknown
};

// Интерфейс для системы событий
export interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
};

// состояние приложения
export interface IAppState {
  catalog: IProduct[];
  basket: IProduct[];
  preview: string | null;
  order: IOrder | null;
}

// тип для ошибок формы
export type FormErrors = Partial<Record<keyof IOrder, string>>;

// Интерфейс для описания методов API
export interface IWebLarekAPI {
  getProductList: () => Promise<IProduct[]>; /* Получение списка товаров, возвращает массив товаров */
  getProductItem: (id: string) => Promise<IProduct>; /* Получение информации о конкретном товаре по ID */
  orderProducts: (order: IOrder) => Promise<IOrderResult> /* Отправка заказа, возвращает результат заказа */
}

// интерфейс, описывающий товар в каталоге
export interface IProduct {
  id: string;
  category: string;
  image: string;
  title: string;
  price: number | null;
  description: string;
}

// интерфейс описывает карточку товара
export interface ICard<T> {
  title: string;
  description?: string | string[];
  image: string;
  status: T;
}

// Описывает страницу каталога
export interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

// Интерфейс для описания состояния формы
export interface IFormState {
  valid: boolean;
  errors: string[];
}

// писывает содержимое модального окна
export interface IModalData {
  content: HTMLElement;
}

// Интерфейс описывает вид корзины
export interface IBasketView {
  items: HTMLElement[];
  total: number;
  selected: string[];
}

// персональные данные, 
// информация о доставке, 
// Интерфейс заказа, 
// результат заказа (ID заказа), 
// данные об успешном заказе (общая сумма)
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
}
export interface ISuccess {
  total: number;
}