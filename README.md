# Проектная работа "Веб-ларек"
https://github.com/aktchum/web-larek-frontend.git

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Об архитектуре

Проект построен на основе архитектурного паттерна Model-View-Presenter (MVP). В этой архитектуре:

- **Модель (Model)**: отвечает за управление данными и взаимодействие с сервером.
- **Представления (View)**: Отображают данные, реагируют на пользовательский ввод.
- **Презентер (Presenter)**: управляет логикой взаимодействия между моделью и представлением через события, используя класс `EventEmitter`.

## Описание базовых классов, их предназначение и функции

## Базовый слой

### 1. Класс `EventEmitter`

Класс `EventEmitter` реализует шаблон подписки-уведомления, храня информацию о подписчиках и инициируя события с данными.
Используется для управления событиями между компонентами.

**Конструктор**:  
Конструктор не принимает параметров.

**Основные методы**:
- `on()` — подписка на конкретное событие.
- `off()` — отмена подписки.
- `emit()` — инициирует событие, передавая данные подписчикам.
  
**Дополнительно**:
- `onAll()` — подписка на все события.
- `offAll()` — удаление всех подписок.
- `trigger()` — позволяет передать событие как аргумент в другие классы.

---

### 2. Класс `Api`

Класс `Api` обеспечивает взаимодействие с сервером, инкапсулируя базовый URL и конфигурацию запросов.
Этот класс используется для выполнения запросов к API и взаимодействия с сервером.

**Свойства**:
`baseUrl`: string;
`options`: RequestInit;

**Конструктор**:
`constructor(baseUrl: string, options: RequestInit = {})` - принимает базовый URL и глобальные опции для всех запросов.
`baseUrl`: Базовый URL API.
`options`: Дополнительные параметры запроса.

**Методы**:
- `get(url: string)` - Отправка GET-запросов для получения данных с сервера..
- `post(url: string, data: any, method: ApiPostMethods = 'POST')` - Отправка POST-запросов для передачи данных на сервер.

---

### 3. Класс `Component<T>`

Абстрактный класс `Component` обеспечивает базовый функционал для UI-компонентов.
Используется для создания компонентов интерфейса, таких как карточки товаров, формы и модальные окна.

**Конструктор**:
`constructor(container: HTMLElement)` - принимает DOM-элемент container, с которым компонент будет взаимодействовать для манипуляций с интерфейсом.

**Методы**:
- `toggleClass(element: HTMLElement, className: string, state?: boolean)`: Переключает класс элемента.
- `setText(element: HTMLElement, value: unknown)`: Устанавливает текст.
- `setImage(element: HTMLImageElement, src: string, alt: string)`: Устанавливает изображение и альтернативный текст.
- `setDisabled(element: HTMLElement, state: boolean)`: Устанавливает или снимает блокировку элемента.
- `setHidden(element: HTMLElement)`: Скрывает элемент.
- `setVisible(element: HTMLElement)`: Показывает элемент.
- `render(data?: T)`: Рендерит компонент на основе данных.

---

## Компоненты модели данных

### 1. Класс `Product`

Класс `Product` представляет товар, запрашиваемый с сервера.
Этот класс хранит данные о товаре и передает их компонентам представления для отображения.

**Конструктор**:
`constructor(id: string, category: string, image: string, title: string, price: number | null, description: string)` - Инициализирует объект товара, принимая и устанавливая его параметры:
- `id`: Уникальный идентификатор товара.
- `category`: Категория товара (например, электроника, одежда).
- `image`: URL изображения товара.
- `title`: Название товара.
- `price`: Цена товара. Может быть `null`, если цена не указана.
- `description`: Описание товара.

---

## Компоненты представления

### 1. Класс `Page`

Класс `Page` управляет отображением страницы, включая обновление каталога товаров, счетчика корзины и блокировку прокрутки.
Этот класс используется для управления состоянием страницы и взаимодействия с пользователем.

**Методы**:
- `setCounter(count: number)` — устанавливает значение счетчика товаров в корзине.
- `setCatalog(content: HTMLElement))` — обновляет содержимое каталога.
- `setLocked(isLocked: boolean)` — блокирует или разблокирует прокрутку страницы.

**Конструктор**:
`constructor(container: HTMLElement, events: IEvents)`- принимает container страницы и объект событий (events).
- `container`: DOM-элемент.
- `events`: Объект для работы с событиями.


---

### 2. Класс `Form`

Класс `Form` обрабатывает пользовательский ввод, управляет валидацией формы и отправкой данных.

**Свойства**:
`submit: HTMLButtonElement`; - кнопка отправки формы
`errors: HTMLElement`; - ошибки валидации формы  

**Конструктор**:
`constructor(container: HTMLFormElement, events: IEvents)` - принимает элемент формы, который содержит все поля ввода, кнопки, и т.д. В этом элементе будут происходить все манипуляции: валидация, сбор данных, отправка и объект событий (events).

**Методы**:
- `onInputChange()` — обработка событий ввода.
- `setValid()` — включает возможность отправки формы при валидности.
- `setErrors()` — отображает ошибки валидации.

---

### 3. Класс `Modal`
 
Класс `Modal` управляет модальными окнами.

**Свойства**:
`closeButton: HTMLButtonElement` - кнопка закрытия модального окна.
`content: HTMLElement` - содержимое окна.

**Конструктор**: 
`constructor(container: HTMLElement, events: IEvents)` - принимает контейнер, в котором находятся все элементы, которые относятся к модальному окну, такие как кнопка закрытия, текст и другое содержимое, и объект для управления событиями.

**Методы**:
- `openModal()` — открывает окно.
- `closeModal()` — закрывает окно.

---

### 4. Класс `Basket`

Класс `Basket` управляет корзиной товаров.

**Свойства**:
`list: HTMLElement` - перечень товаров в корзине.
`total: HTMLElement` - Общая стоимость.
`selected: string[]` — Массив идентификаторов выбранных товаров. Используется для управления товарами(например, для удаления из корзины или покупки).

**Конструктор**:
`constructor(template: HTMLTemplateElement, events: IEvents)` - принимает шаблон для создания содержимого корзины и объект для управления событиями.

---

### 5. Класс `Card`

Класс `Card` представляет карточку товара.

**Свойства**:
  `id: string` -  идентификатор карточки
  `title: string` - Название товара
  `price: number | null` - Цена товара, может быть null, если цена не указана
  `description: string` - Описание товара
  `image: string` - URL изображения товара
  `container: HTMLElement` - DOM-элемент карточки товара

**Конструктор**:
`constructor(id: string, title: string, price: number | null, description: string, image: string, container: HTMLElement)` - Конструктор класса Card принимает параметры, связанные с карточкой.

---

### 6. Класс `OrderForm`

Класс `OrderForm` управляет формой заказа.

**Свойства**
`payment: HTMLElement` - Элемент выбора способа оплаты
`address: HTMLInputElement` - Поле ввода адреса доставки
`submit: HTMLButtonElement` - Кнопка отправки формы

**Конструктор**:
`constructor(payment: HTMLElement, address: HTMLInputElement, submit: HTMLButtonElement)` - принимает контейнер с элементами управления выбором способа оплаты, поле ввода для адреса доставки и кнопку подтверждения.

**Методы**:
- `toggleButton()` — переключает кнопки выбора способа оплаты.
- `setAddress()` — устанавливает адрес доставки.

---

### 7. Класс `PersonalForm`

Класс `PersonalForm` управляет формой персональных данных.

**Свойства**:
`email: HTMLInputElement` — поле для ввода email.
`phone: HTMLInputElement` — поле для ввода номера телефона.
`submit: HTMLButtonElement` — кнопка "Оплатить", которая активируется после валидации формы.

**Конструктор**:
`constructor(email: HTMLInputElement, phone: HTMLInputElement, submit: HTMLButtonElement)` - принимает поле для ввода email, поле для ввода номера телефона, кнопка отправки формы, которая активируется, когда оба поля заполнены.

**Методы**:
- `handleInputChange()` - проверяет, заполнены ли поля.
- `handleSubmit()` — вызывается при клике на кнопку "оплатить", выполняет проверку (валидацию) данных и отправляет их, если они корректны.

---

### 8. Класс `Success`

Класс `Success` отображает окно успешного завершения заказа.

**Свойства**
`total: number` — общая сумма списанных средств.
`container: HTMLElement` — контейнер модального окна с сообщением об успешной оплате.
`button: HTMLButtonElement` — кнопка "За новыми покупками!", возвращающая пользователя в магазин.

**Конструктор**:
`constructor(total: number, container: HTMLElement, button: HTMLButtonElement)` - Принимает общую сумму total, контейнер для модального окна container и кнопку для возврата в магазин (button).


**Методы**:
- `setTotalSum()` — устанавливает итоговую сумму.

---
## Интерфейсы

```typescript
// Общие типы
type ApiListResponse<Type> = {
  total: number;
  items: Type[];
};

// Перечисление методов HTTP-запросов
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Описание событий: EventName, Subscriber, EmitterEvent
type EventName = string | RegExp;
type Subscriber = Function;
type EmitterEvent = {
  eventName: string;
  data: unknown;
};

// Интерфейс для системы событий
interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

// Состояние приложения
interface IAppState {
  catalog: IProduct[];
  basket: IProduct[];
  preview: string | null;
  order: IOrder | null;
}

// Тип для ошибок формы
type FormErrors = Partial<Record<keyof IOrder, string>>;

// Интерфейс для описания методов API
interface IWebLarekAPI {
  getProductList: () => Promise<IProduct[]>;
  getProductItem: (id: string) => Promise<IProduct>;
  orderProducts: (order: IOrder) => Promise<IOrderResult>;
}

// Интерфейс, описывающий товар в каталоге
interface IProduct {
  id: string;
  category: string;
  image: string;
  title: string;
  price: number | null;
  description: string;
}

// Интерфейс описывает карточку товара
interface ICard<T> {
  title: string;
  description?: string | string[];
  image: string;
  status: T;
}

// Описывает страницу каталога
interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

// Интерфейс для описания состояния формы
interface IFormState {
  valid: boolean;
  errors: string[];
}

// Описывает содержимое модального окна
interface IModalData {
  content: HTMLElement;
}

// Интерфейс описывает вид корзины
interface IBasketView {
  items: HTMLElement[];
  total: number;
  selected: string[];
}

// Персональные данные
interface IPersonalForm {
  email: string;
  phone: string;
}

// Информация о доставке
interface IDeliveryForm {
  payment: string;
  address: string;
}

// Интерфейс заказа
interface IOrder extends IPersonalForm, IDeliveryForm {
  total: number;
  items: string[];
}

// Результат заказа (ID заказа)
interface IOrderResult {
  id: string;
}

// Данные об успешном заказе (общая сумма)
interface ISuccess {
  total: number;
}
```

