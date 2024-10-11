// src/components/common/Form.ts

import { Component } from '../base/Component';
import { IFormState } from '../../types';
import { IEvents } from '../../types';
import { ensureElement } from '../../utils/utils';

export class Form<T> extends Component<IFormState> {
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
        this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);

        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;
            this.onInputChange(field, value);
        });

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${this.container.name}:submit`);
        });
    }

    protected onInputChange(field: string, value: string): void {
        this.events.emit(`${this.container.name}.fieldChange`, { field, value });
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set errors(value: string[]) {
        this.errorsElement.textContent = value.join('; ');
    }

    render(state: Partial<T> & IFormState): HTMLElement {
        const { valid, errors, ...inputs } = state;
        super.render({ valid, errors });
        Object.assign(this, inputs);
        return this.container;
    }
}
