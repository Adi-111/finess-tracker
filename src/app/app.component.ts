import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { AppService } from './app.service';
import { CommonModule } from '@angular/common';
import { CommentsFormComponent } from './comments-form/comments-form.component';
import { CommentsDisplayComponent } from './comments-display/comments-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,WorkoutFormComponent, WorkoutListComponent, CommonModule, CommentsFormComponent, CommentsDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fitness-tracker';
  showForm = false;
  constructor(public appService: AppService) {}

  openComments(): void {
    this.appService.setComponent('comments');
  }

  openWorkoutForm(): void {
    this.appService.setComponent('workout-form');
  }

  openWorkoutList(): void {
    this.appService.setComponent('workout-list');
  }


  closeForm() {
    this.showForm = false;
  }
}
