import { Component } from '@angular/core';
import { ErrorPage } from '@shared/ui/error-page';

@Component({
  imports: [ErrorPage],
  selector: 'app-not-authorized',
  template: `
    <app-error-page
      code="403"
      title="Accès refusé"
      message="Vous n'avez pas les droits."
      icon="compass"
      color="danger"
    />
  `,
})

export class NotAuthorized {}
