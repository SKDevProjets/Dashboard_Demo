import { Component } from '@angular/core';
import { ErrorPage } from '@shared/ui/error-page';

@Component({
  imports: [ErrorPage],
  selector: 'app-not-authorized',
  template: `
    <app-error-page
      code="403"
      title="Access denied"
      message="You do not have the necessary permissions"
      icon="compass"
      color="danger"
    />
  `,
})

export class NotAuthorized {}
