// src/components/base/events.ts

type EventName = string;
type Subscriber<T = any> = (data?: T) => void;

export interface IEvents {
    on<T = any>(event: EventName, callback: (data: T) => void): void;
    emit<T = any>(event: EventName, data?: T): void;
    off(event: EventName, callback: Subscriber): void;
}

export class EventEmitter implements IEvents {
    private events: Map<EventName, Set<Subscriber>>;

    constructor() {
        this.events = new Map<EventName, Set<Subscriber>>();
    }

    on<T = any>(eventName: EventName, callback: (data: T) => void): void {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, new Set<Subscriber>());
        }
        this.events.get(eventName)!.add(callback);
    }

    off(eventName: EventName, callback: Subscriber): void {
        if (this.events.has(eventName)) {
            this.events.get(eventName)!.delete(callback);
            if (this.events.get(eventName)!.size === 0) {
                this.events.delete(eventName);
            }
        }
    }

    emit<T = any>(eventName: EventName, data?: T): void {
        const subscribers = this.events.get(eventName);
        if (subscribers) {
            subscribers.forEach((callback) => callback(data));
        }
    }
}