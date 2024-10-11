// src/components/base/Component.ts

/**
 * Базовый класс для компонентов
 */
export abstract class Component<T> {
	protected constructor(protected readonly container: HTMLElement) {}

	protected toggleClass(element: HTMLElement, className: string, force?: boolean): void {
			element.classList.toggle(className, force);
	}

	protected setText(element: HTMLElement, value: unknown): void {
			if (element) {
					element.textContent = String(value);
			}
	}

	protected setDisabled(element: HTMLElement, state: boolean): void {
			if (element) {
					if (state) element.setAttribute('disabled', 'disabled');
					else element.removeAttribute('disabled');
			}
	}

	protected hideElement(element: HTMLElement): void {
			element.style.display = 'none';
	}

	protected showElement(element: HTMLElement): void {
			element.style.removeProperty('display');
	}

	protected setImage(element: HTMLImageElement, src: string, alt?: string): void {
			if (element) {
					element.src = src;
					if (alt) {
							element.alt = alt;
					}
			}
	}

	render(data?: Partial<T>): HTMLElement {
			Object.assign(this as object, data ?? {});
			return this.container;
	}
}
