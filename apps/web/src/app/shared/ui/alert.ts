import { Component, inject } from "@angular/core";
import { AlertService } from "@core/services/alert.service";

@Component({
    selector: 'app-alert',
    imports: [],
    template: `
    @if (alertService.alert(); as alert) {
      <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1100">
        <div class="toast show text-bg-{{ alert.type }}">
          <div class="toast-body">
            {{ alert.message }}
          </div>
        </div>
      </div>
    }
  `,
})
export class Alert {
    protected alertService = inject(AlertService);
}