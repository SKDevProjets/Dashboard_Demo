import { Injectable, inject } from "@angular/core";
import { Invoice, InvoiceApiResponse } from "../models/invoice.model";
import { ApiService } from "@core/services/api.service";
import { EMPTY, expand, map, reduce, scan, tap } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from "@config/environment.development";

@Injectable({
    providedIn: 'root',
})

export class InvoiceService {
    private readonly api = inject(ApiService);
    private readonly http = inject(HttpClient);

    private apiBaseUrl(): string {
        return environment.baseUrl;
    }

    getInvoices() {
        return this.api.get<InvoiceApiResponse>('invoice').pipe(
            tap((response) => {
                console.log('Pagination API :', response.meta.paging);
            }),
            expand((response) => {
                const next = response.meta.paging.links.next;

                if (!next) {
                    return EMPTY;
                }

                const url = next.startsWith('http')
                    ? next
                    : `${this.apiBaseUrl()}${next}`;

                return this.http.get<InvoiceApiResponse>(url).pipe(
                    tap((nextResponse) => {
                        console.log('Pagination suivante :', nextResponse.meta.paging);
                    }),
                );
            }),
            map((response) => response.data),
            reduce(
                (allInvoices, invoices) => [...allInvoices, ...invoices],
                [] as Invoice[],
            ),
        );
    }

    getInvoicesProgressively() {
        return this.api.get<InvoiceApiResponse>('invoice').pipe(
            tap((response) => {
                console.log('Pagination API :', response.meta.paging);
            }),
            expand((response) => {
                const next = response.meta.paging.links.next;

                if (!next) {
                    return EMPTY;
                }

                const url = next.startsWith('http')
                    ? next
                    : `${this.apiBaseUrl()}${next}`;

                return this.http.get<InvoiceApiResponse>(url);
            }),
            scan(
                (allInvoices, response) => [
                    ...allInvoices,
                    ...response.data,
                ],
                [] as Invoice[],
            ),
        );
    }

}