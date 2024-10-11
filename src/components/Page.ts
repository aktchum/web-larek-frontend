// src/components/Page.ts

import { Component } from './base/Component';
import { IEvents, IPage } from '../types';
import { ensureElement } from '../utils/utils';

export class Page extends Component<IPage> {
    protected counterElement: HTMLElement;
    protected catalogElement: HTMLElement;
    protected wrapperElement: HTMLElement;
    protected basketElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', container);
        this.catalogElement = ensureElement<HTMLElement>('.gallery', container);
        this.wrapperElement = ensureElement<HTMLElement>('.page__wrapper', container);
        this.basketElement = ensureElement<HTMLElement>('.header__basket', container);

        this.basketElement.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

    set counter(value: number) {
        this.setText(this.counterElement, String(value));
    }

    set catalog(items: HTMLElement[]) {
        this.catalogElement.replaceChildren(...items);
    }

    set locked(value: boolean) {
        this.wrapperElement.classList.toggle('page__wrapper_locked', value);
    }
}
