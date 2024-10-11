// src/components/common/Basket.ts

import { Component } from './base/Component';
import { IBasketView } from '../types';
import { IEvents } from '../types';
import { ensureElement, createElement } from '../utils/utils';

/**
 * Класс `Basket` отвечает за отображение корзины товаров.
 */
export class Basket extends Component<IBasketView> {
    protected listElement: HTMLElement;
    protected totalElement: HTMLElement;
    protected buttonElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        // Инициализируем элементы корзины
        this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.totalElement = ensureElement<HTMLElement>('.basket__price', this.container);
        this.buttonElement = ensureElement<HTMLElement>('.basket__button', this.container);

        // обработчик события для кнопки "Оформить"
        this.buttonElement.addEventListener('click', () => {
            events.emit('order:open');
        });

        // список товаров
        this.items = [];
    }

    // // Устанавливаем список товаров в корзине
    // set items(items: HTMLElement[]) {
    //     if (items.length) {
    //         // Отобразить товары, если есть
    //         this.listElement.replaceChildren(...items);
    //     } else {
    //         // Если товаров нет, отобразить сообщение "Корзина пуста"
    //         this.listElement.replaceChildren(
    //             createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' })
    //         );
    //     }
    // }
    
    // Сеттер для установки списка товаров в корзине
    set items(items: HTMLElement[]) {
      if (items.length) {
          // Если есть товары, отображаем их в списке
          this.listElement.replaceChildren(...items);
          this.setDisabled(this.buttonElement, false); // Включаем кнопку "Оформить"
      } else {
          // Если товаров нет, отображаем сообщение "Корзина пуста"
          this.listElement.replaceChildren(
              createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' })
          );
          this.setDisabled(this.buttonElement, true); // Отключаем кнопку "Оформить"
      }
  }

    // Устанавливаем общую сумму товаров в корзине
    set total(value: number) {
        this.setText(this.totalElement, `${value} синапсов`);
    }
}
