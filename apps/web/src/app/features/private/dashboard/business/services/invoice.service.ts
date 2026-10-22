import { Injectable, inject } from "@angular/core";
import { Invoice, InvoiceApiResponse } from "../models/invoice.model";
import { ApiService } from "@core/services/api.service";
import { expand, map, reduce } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "@config/environment.development";


@Injectable({
    providedIn: 'root',
})

export class InvoiceService {
    private readonly api = inject(ApiService);
    private readonly http = inject(HttpClient);

    getInvoices() {
        return this.api.get<InvoiceApiResponse>('invoice').pipe(
            expand((response) => {
                const next = response.meta.paging.links.next;

                if (!next) {
                    return [];
                }

                const url = next.startsWith('http')
                    ? next
                    : `${this.apiBaseUrl()}${next}`;

                return this.http.get<InvoiceApiResponse>(url);
            }),
            map((response) => response.data),
            reduce(
                (allInvoices, invoices) => [...allInvoices, ...invoices],
                [] as Invoice[],
            ),
        );
    }

    private apiBaseUrl(): string {
        return environment.baseUrl;
    }
}