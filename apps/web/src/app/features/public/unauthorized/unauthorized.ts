import { Component } from '@angular/core';
import { ErrorPage } from '@shared/ui/error-page';

@Component({
  imports: [ErrorPage],
  selector: 'app-unauthorized',
  template: `
    <app-error-page
      code="401"
      title="Access denied"
      message="Session expired please log in again"
      icon="compass"
      color="warning"
    />
  `,
})

export class Unauthorized { }
