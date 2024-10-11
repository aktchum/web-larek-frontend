// src/components/DeliveryForm.ts

import { Form } from './common/Form';
import { IDeliveryForm, ICardActions } from '../types';
import { IEvents } from '../types';
import { ensureElement } from '../utils/utils';

export class DeliveryForm extends Form<IDeliveryForm> {
    protected cardButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents, actions?: ICardActions) {
        super(container, events);

        this.cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this.cashButton.classList.add('button_alt-active');

        if (actions?.onClick) {
            this.cardButton.addEventListener('click', actions.onClick);
            this.cashButton.addEventListener('click', actions.onClick);
        }
    }

    toggleButtons(): void {
        this.cardButton.classList.toggle('button_alt-active');
        this.cashButton.classList.toggle('button_alt-active');
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}
