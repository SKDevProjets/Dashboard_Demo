import { Component } from '@angular/core';
import { ErrorPage } from '@shared/ui/error-page';

@Component({
  imports: [ErrorPage],
  selector: 'app-page-not-found',
  template: `
    <app-error-page
      code="404"
      title="Page not found"
      message="The page you are looking for does not exist or has been moved"
      icon="compass"
      color="warning"
    />
  `,
})

export class PageNotFound {}
