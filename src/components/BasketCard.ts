// Импорт необходимых модулей и типов
import { Component } from './base/Component'; // Базовый класс для компонентов
import { ICard, ICardActions } from '../types'; // Интерфейсы для карточки и действий
import { ensureElement } from '../utils/utils'; // Утилита для поиска элементов

/**
 * Класс `BasketCard` отвечает за отображение карточки товара в корзине.
 * Наследуется от базового класса `Component`.
 */
export class BasketCard extends Component<ICard> {
    // Элементы карточки
    protected titleElement: HTMLElement; // Элемент заголовка товара
    protected priceElement: HTMLElement; // Элемент цены товара
    protected indexElement?: HTMLElement; // Элемент индекса товара в корзине
    protected buttonElement?: HTMLButtonElement; // Кнопка удаления из корзины

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        // Инициализируем элементы, необходимые для отображения карточки в корзине
        this.titleElement = ensureElement<HTMLElement>('.card__title', container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', container);
        this.indexElement = container.querySelector<HTMLElement>('.basket__item-index') || undefined;
        this.buttonElement = container.querySelector<HTMLButtonElement>('.card__button') || undefined;

        // Добавляем обработчик события на кнопку удаления из корзины
        if (actions?.onClick && this.buttonElement) {
            this.buttonElement.addEventListener('click', actions.onClick);
        }
    }

    // Устанавливаем заголовок товара
    set title(value: string) {
        this.setText(this.titleElement, value);
    }

    get title(): string {
      return this.getText(this.titleElement);
  }

    // Устанавливаем цену товара
    set price(value: number | null) {
        this.setText(this.priceElement, value ? `${value} синапсов` : 'Бесценно');
    }

    get price(): number | null {
      const priceText = this.getText(this.priceElement);
      const match = priceText.match(/(\d+)/);
      return match ? Number(match[1]) : null;
  }

    // Метод для установки индекса товара в корзине
    set index(value: string) {
        if (this.indexElement) {
            this.setText(this.indexElement, value);
        }
    }

    get index(): string {
      return this.indexElement ? this.getText(this.indexElement) : '';
  }
}
