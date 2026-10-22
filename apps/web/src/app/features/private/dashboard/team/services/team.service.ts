import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectsResponse } from '../models/project';
import { ApiService } from '@core/services/api.service';

@Injectable({
    providedIn: 'root',
})

export class TeamService {

    private readonly api = inject(ApiService);
    private readonly endpoint = 'project';

    getTeams(): Observable<ProjectsResponse> {
        const fields = [
            'id',
            'project_name',
            'project_summary',
            'notes',
            'start_date',
            'deadline',
            'status',
            'category',
            'client{id,name}',
        ].join(',');

        return this.api.get<ProjectsResponse>(
            `${this.endpoint}?fields=${fields}`
        );
    }
}