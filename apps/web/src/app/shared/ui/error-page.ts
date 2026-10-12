import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-error-page',
  imports: [RouterLink],
  template: `
    <div class="container pt-5">
      <div class="w-100 d-flex justify-content-center">
        <div
          class="card shadow-sm border-0 text-center p-5 align-items-center"
          style="max-width: 500px"
        >
          <h1 class="display-1 fw-bold mb-2" [class]="'text-' + color()">
            {{ code() }}
          </h1>

          <i class="bi display-4 mb-3" [class]="'bi bi-' + icon() + ' text-' + color()"></i>

          <h3 class="fw-bold">
            {{ title() }}
          </h3>

          <p class="text-muted mb-4">
            {{ message() }}
          </p>

          <a class="btn text-white" [class]="'btn btn-' + color()" routerLink="/"> Accueil </a>
        </div>
      </div>
    </div>
  `,
})

export class ErrorPage {
  code = input.required<string>();
  title = input.required<string>();
  message = input.required<string>();
  icon = input('exclamation-triangle');
  color = input('danger');
}