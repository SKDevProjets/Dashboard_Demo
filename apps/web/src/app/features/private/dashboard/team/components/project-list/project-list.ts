import { Component, input } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectCard } from '../project-card/project-card';

@Component({
  imports: [ProjectCard],
  selector: 'app-project-list',
  styleUrl: './project-list.css',
  templateUrl: './project-list.html',
})
export class ProjectList {
  readonly projects = input.required<Project[]>();
}
