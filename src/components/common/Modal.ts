// src/components/common/Modal.ts

import { Component } from '../base/Component';
import { IModalData } from '../../types';
import { IEvents } from '../../types';
import { ensureElement } from '../../utils/utils';

export class Modal extends Component<IModalData> {
    protected closeButton: HTMLButtonElement;
    protected contentElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content', container);

        this.closeButton.addEventListener('click', () => this.close());
        this.container.addEventListener('click', () => this.close());
        this.contentElement.addEventListener('click', (event) => event.stopPropagation());
    }

    set content(value: HTMLElement) {
        this.contentElement.replaceChildren(value);
    }

    open(): void {
      this.toggleClass(this.container, 'modal_active', true); // Используем toggleClass
      this.events.emit('modal:open');
    }

    close(): void {
      this.toggleClass(this.container, 'modal_active', false); // Используем toggleClass
      this.contentElement.innerHTML = '';
      this.events.emit('modal:close');
    }

    render(data: IModalData): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}
