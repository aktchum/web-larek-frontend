// src/index.ts

import './scss/styles.scss';

import { WebLarekAPI } from './components/WebLarekAPI'; // Класс для взаимодействия с API
import { API_URL, CDN_URL } from './utils/constants'; // Константы с адресами API и CDN
import { EventEmitter } from './components/base/events'; // Класс для управления событиями
import { AppState, Product } from './components/AppState'; // Класс состояния приложения и модель продукта
import { Page } from './components/Page'; // Класс страницы
import { cloneTemplate, ensureElement } from './utils/utils'; // Утилиты для работы с DOM
import { Modal } from './components/common/Modal'; // Класс модального окна
import { Card } from './components/Card'; // Класс карточки товара
import { Basket } from './components/Basket'; // Класс корзины
import { DeliveryForm } from './components/DeliveryForm'; // Класс формы доставки
import { PersonalForm } from './components/PersonalForm'; // Класс формы личных данных
import { Success } from './components/Success'; // Класс сообщения об успешном заказе
import { IProduct, IDeliveryForm, IPersonalForm, FormErrors } from './types'; // Импортируем класс BasketCard
import { BasketCard } from './components/BasketCard'; // Импортируем типы

// Создаем экземпляр EventEmitter для управления событиями и API для взаимодействия с сервером
const events = new EventEmitter();
const api = new WebLarekAPI(CDN_URL, API_URL);

// Получаем ссылки на шаблоны из HTML по идентификаторам
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const deliveryTemplate = ensureElement<HTMLTemplateElement>('#order');
const personalTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Создаем экземпляры необходимых классов
const appData = new AppState(events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const delivery = new DeliveryForm(cloneTemplate(deliveryTemplate), events, {
    onClick: (evt: Event) => events.emit('payment:toggle', evt.target as HTMLElement),
}); // Форма доставки
const personal = new PersonalForm(cloneTemplate(personalTemplate), events);

// Загружаем список продуктов из API
api.getProductList()
    .then((products: IProduct[]) => appData.setCatalog(products))
    .catch((err) => {
        console.error(err);
    });

    // Обработчик события изменения каталога товаров
events.on('items:changed', () => {
  // Создаем карточки товаров для каталога и добавляем их на страницу  
  page.catalog = appData.catalog.map((item) =>
        new Card(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item), // Обработчик клика по карточке
        }).render(item)
    );
});

// Обработчик события выбора карточки товара
events.on('card:select', (item: Product) => {
    appData.setPreview(item);
});

events.on('preview:changed', (item: Product) => {
    const card = new Card(cloneTemplate(cardPreviewTemplate), {
        onClick: () => {
            events.emit('product:toggle', item); // Добавляем или удаляем товар из корзины
            //  текст кнопки в зависимости от состояния корзины
            card.buttonText = appData.basket.some((basketItem) => basketItem.id === item.id)
                ? 'Удалить из корзины'
                : 'В корзину';
        },
    });
    // Рендерим модальное окно с карточкой товара
    modal.render({
        content: card.render({
            ...item,
            buttonText: appData.basket.some((basketItem) => basketItem.id === item.id)
                ? 'Удалить из корзины'
                : 'В корзину',
        }),
    });
});

// Обработчик события переключения состояния товара в корзине
events.on('product:toggle', (item: Product) => {
    if (appData.basket.some((basketItem) => basketItem.id === item.id)) {
        events.emit('product:delete', item);
    } else {
        events.emit('product:add', item);
    }
});

// обработчик счетчика товаров на корзине
events.on('counter:changed', (data: { count: number }) => {
  page.counter = data.count;
});

// Обработчик события добавления товара в корзину
events.on('product:add', (item: Product) => {
    appData.addToBasket(item);
});

// Обработчик события удаления товара из корзины
events.on('product:delete', (item: Product) => {
    appData.removeFromBasket(item);
});

// Обработчик события открытия корзины
events.on('basket:open', () => {
    modal.render({
        content: basket.render({}),
    });
});

// Обработчик события изменения корзины
events.on('basket:changed', (items: Product[]) => {
  //  элементы карточек для каждого товара в корзине
  basket.items = items.map((item, index) => {
      const card = new BasketCard(cloneTemplate(cardBasketTemplate), {
          onClick: () => {
              events.emit('product:delete', item);
          },
      });
      // Рендер карточки с данными товара
      return card.render({
          index: (index + 1).toString(),
          title: item.title,
          price: item.price,
      });
  });
  // Рассчитываем общую сумму товаров в корзине
  const totalSum = items.reduce((total, item) => total + (item.price || 0), 0);
  basket.total = totalSum;
  appData.order.total = totalSum;
});

events.on('order:open', () => {
    modal.render({
        content: delivery.render({
            payment: '',
            address: '',
            valid: false,
            errors: [],
        }),
    });
    appData.order.items = appData.basket.map((item) => item.id);
});

events.on('payment:toggle', (target: HTMLElement) => {
    if (!target.classList.contains('button_alt-active')) {
        delivery.toggleButtons();
        appData.order.payment = target.getAttribute('name') || 'cash';
    }
});

events.on('order.fieldChange', (data: { field: keyof IDeliveryForm; value: string }) => {
    appData.setDeliveryField(data.field, data.value);
});

events.on('order:submit', () => {
    modal.render({
        content: personal.render({
            email: '',
            phone: '',
            valid: false,
            errors: [],
        }),
    });
});

events.on('contacts.fieldChange', (data: { field: keyof IPersonalForm; value: string }) => {
    appData.setPersonalField(data.field, data.value);
});

events.on('formErrors:change', (errors: FormErrors) => {
    const { payment, address, email, phone } = errors;
    delivery.valid = !payment && !address;
    delivery.errors = Object.values({ payment, address }).filter(Boolean);

    personal.valid = !email && !phone;
    personal.errors = Object.values({ phone, email }).filter(Boolean);
});

events.on('contacts:submit', async () => {
    try {
        const result = await api.orderProducts(appData.order);
        const success = new Success(cloneTemplate(successTemplate), {
            onClick: () => {
                modal.close();
                appData.clearBasket();
            },
        });
        success.total = result.total;
        modal.render({
            content: success.render({}),
        });
    } catch (err) {
        console.error(err);
        alert('Ошибка при оформлении заказа. Пожалуйста, попробуйте снова.');
    }
});

events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;
});
