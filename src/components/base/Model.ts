// src/components/base/Model.ts

import { IEvents } from '../../types';

export abstract class Model<T> {
    protected constructor(data: Partial<T>, protected events: IEvents) {
        Object.assign(this, data);
    }

    protected emitChanges(event: string, payload?: object): void {
        this.events.emit(event, payload ?? {});
    }
}
