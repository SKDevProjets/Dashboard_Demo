import { Component } from '@angular/core';
import { ErrorPage } from '@shared/ui/error-page';

@Component({
  imports: [ErrorPage],
  selector: 'app-page-not-found',
  template: `
    <app-error-page
      code="404"
      title="Page introuvable"
      message="La page que vous recherchez n'existe pas ou a été déplacée."
      icon="compass"
      color="warning"
    />
  `,
})

export class PageNotFound {}
