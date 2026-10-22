import { Component, input } from '@angular/core';
import { Client } from '../../models/client';

@Component({
  imports: [],
  selector: 'app-clients-list',
  styleUrl: './clients-list.css',
  templateUrl: './clients-list.html',
})
export class ClientsList {
  readonly clients = input.required<Client[]>();
  readonly loading = input(false);
  readonly error = input<string | null>(null);

  getInitials(name: string): string {
    if (!name?.trim()) {
      return '?';
    }

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(part => part.charAt(0).toUpperCase())
      .join('');
  }
}
