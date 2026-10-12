import { Injectable, signal } from '@angular/core';

export interface AlertMessage {
    type: 'success' | 'danger' | 'warning' | 'info';
    message: string;
}

@Injectable({
    providedIn: 'root',
})

export class AlertService {
    alert = signal<AlertMessage | null>(null);

    show(message: string, type: AlertMessage['type'] = 'info') {
        this.alert.set({
            message,
            type,
        });

        setTimeout(() => {
            this.alert.set(null);
        }, 3000);
    }

    clear() {
        this.alert.set(null);
    }
}