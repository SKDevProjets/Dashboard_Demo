import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Alert } from '@shared/ui/alert'; 

@Component({
  imports: [RouterOutlet, Alert],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

}
