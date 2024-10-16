// src/components/common/Success.ts

import { Component } from './base/Component';
import { ISuccess } from '../types';
import { ensureElement } from '../utils/utils';

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<ISuccess> {
    protected closeButton: HTMLElement;
    protected totalElement: HTMLElement;

    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);

        this.closeButton = ensureElement<HTMLElement>('.order-success__close', this.container);
        this.totalElement = ensureElement<HTMLElement>('.order-success__description', this.container);

        this.closeButton.addEventListener('click', actions.onClick);
    }

    set total(value: number) {
      this.setText(this.totalElement, `Списано ${value} синапсов`); // Используем setText
    }

    get total(): number {
      const totalText = this.getText(this.totalElement);
      const match = totalText.match(/(\d+)/);
      return match ? Number(match[1]) : 0;
  }
}
