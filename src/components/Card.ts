// src/components/Card.ts

import { Component } from './base/Component';
import { ICard, ICardActions } from '../types';
import { ensureElement } from '../utils/utils';

export class Card extends Component<ICard> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected imageElement?: HTMLImageElement;
    protected descriptionElement?: HTMLElement;
    protected buttonElement?: HTMLButtonElement;
    protected categoryElement?: HTMLElement; // Сделал элемент необязательным
    protected indexElement?: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);
        // Инициализируем элементы карточки
        this.titleElement = ensureElement<HTMLElement>('.card__title', container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', container);
        this.imageElement = container.querySelector<HTMLImageElement>('.card__image') || undefined;
        this.buttonElement = container.querySelector<HTMLButtonElement>('.card__button') || undefined;
        this.descriptionElement = container.querySelector<HTMLElement>('.card__text') || undefined;
        this.categoryElement = container.querySelector<HTMLElement>('.card__category') || undefined;
        this.indexElement = container.querySelector<HTMLElement>('.basket__item-index') || undefined;
        // Добавляем обработчики событий
        if (actions?.onClick) {
            if (this.buttonElement) {
                this.buttonElement.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }
        // Сеттеры и геттеры для свойств карточки
    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this.titleElement, value);
    }

    get title(): string {
        return this.getText(this.titleElement);
    }

    set price(value: number | null) {
        this.setText(this.priceElement, value ? `${value} синапсов` : 'Бесценно');
    }

    get price(): number | null {
        const priceText = this.getText(this.priceElement);
        const match = priceText.match(/(\d+)/);
        return match ? Number(match[1]) : null;
    }

    set category(value: string) {
        if (this.categoryElement) {
            this.setText(this.categoryElement, value);
            this.updateCategoryClass(value);
        }
    }

    get category(): string {
        return this.categoryElement ? this.getText(this.categoryElement) : '';
    }

    private updateCategoryClass(category: string): void {
        if (this.categoryElement) {
            const baseClass = 'card__category';
            const categoryClass = `${baseClass}_${this.getCategoryClass(category)}`;
            this.categoryElement.className = baseClass;
            this.toggleClass(this.categoryElement, categoryClass, true);
        }
    }

    // Метод для получения класса категории
    private getCategoryClass(category: string): string {
        const categoryClasses: Record<string, string> = {
            'софт-скил': 'soft',
            'хард-скил': 'hard',
            'кнопка': 'button',
            'дополнительное': 'additional',
            'другое': 'other',
        };
        return categoryClasses[category] || 'default';
    }

    set index(value: string) {
        if (this.indexElement) {
            this.setText(this.indexElement, value);
        }
    }

    get index(): string {
        return this.indexElement ? this.getText(this.indexElement) : '';
    }

    set image(value: string) {
        if (this.imageElement) {
            this.setImage(this.imageElement, value, this.title);
        }
    }

    set description(value: string) {
        if (this.descriptionElement) {
            this.setText(this.descriptionElement, value);
        }
    }

    set buttonText(value: string) {
        if (this.buttonElement) {
            this.setText(this.buttonElement, value);
        }
    }
}
