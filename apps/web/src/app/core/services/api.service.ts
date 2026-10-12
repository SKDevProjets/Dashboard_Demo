import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@config/environment.development";


@Injectable({
  providedIn: 'root',
})

export class ApiService {
  protected http = inject(HttpClient);
  protected apiUrl = environment.apiUrl;

  get<T>(url: string) {
    return this.http.get<T>(`${this.apiUrl}/${url}`);
  }

  post<T, B = unknown>(url: string, body: B) {
    return this.http.post<T>(`${this.apiUrl}/${url}`, body);
  }

  put<T, B = unknown>(url: string, body: B) {
    return this.http.put<T>(`${this.apiUrl}/${url}`, body);
  }

  delete<T>(url: string) {
    return this.http.delete<T>(`${this.apiUrl}/${url}`);
  }
}