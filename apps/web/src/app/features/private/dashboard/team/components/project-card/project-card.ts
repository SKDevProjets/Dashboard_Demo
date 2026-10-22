import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Project } from '../../models/project';

@Component({
  imports: [DatePipe],
  selector: 'tr[app-project-card]',
  //selector: 'app-project-card',
  styleUrl: './project-card.css',
  templateUrl: './project-card.html',
})

export class ProjectCard {
  readonly project = input.required<Project>();

  readonly statusClass = () => {
    const status = this.project().status?.toLowerCase();

    switch (status) {
      case 'completed':
      case 'complete':
      case 'done':
      case 'finished':
        return 'status-green';

      case 'cancelled':
      case 'canceled':
      case 'rejected':
        return 'status-red';

      case 'on hold': 
      case 'paused':
        return 'status-orange';
        
      default:
        return 'status-blue';
    }
  };
}
