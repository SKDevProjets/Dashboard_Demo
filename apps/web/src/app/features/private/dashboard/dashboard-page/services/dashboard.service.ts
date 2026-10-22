import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientsResponse } from '../models/client';
import { ApiService } from '@core/services/api.service';

@Injectable({
    providedIn: 'root',
})

export class DashboardService {
    private readonly api = inject(ApiService);
    private readonly endpoint = 'client';

    getClients(): Observable<ClientsResponse> {
        return this.api.get<ClientsResponse>(this.endpoint);
    }
    
}