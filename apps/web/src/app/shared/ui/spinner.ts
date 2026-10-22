import { Component, inject } from "@angular/core";
import { SpinnerService } from "@core/services/spinner.service";

@Component({
    selector: 'app-spinner',
    imports: [],
    template: `
    @if (spinner.loading()) {
      <div class="spinner-overlay">
        <div class="spinner-card">
          <div class="spinner-border text-primary" role="status"></div> 
          <span>Chargement...</span>
        </div>
      </div>
    }
  `,
})
export class Spinner {
    protected spinner = inject(SpinnerService);
}