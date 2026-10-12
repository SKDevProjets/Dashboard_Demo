import { Component } from '@angular/core';
import { ErrorPage } from '@shared/ui/error-page';

@Component({
  imports: [ErrorPage],
  selector: 'app-unauthorized',
  template: `
    <app-error-page
      code="401"
      title="Accès refusé"
      message="Session expiré veuillez vous reconnecter."
      icon="compass"
      color="warning"
    />
  `,
})

export class Unauthorized { }
