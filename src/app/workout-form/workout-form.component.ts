import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {
  workoutForm: FormGroup;
  workoutTypes: string[] = [
    'Running', 'Cycling', 'Swimming', 'Yoga', 'Weightlifting',
    'CrossFit', 'Pilates', 'HIIT', 'Dancing', 'Hiking',
    'Boxing', 'Rowing', 'Stretching', 'Walking', 'Jogging',
    'Kickboxing', 'Rock Climbing', 'Aerobics', 'Zumba', 'Tennis'
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.workoutForm = this.fb.group({
      userName: ['', Validators.required],
      workoutType: ['', Validators.required],
      workoutMinutes: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.workoutForm.valid) {
      const newWorkout = this.workoutForm.value;
      const users = JSON.parse(localStorage.getItem('userData') || '[]');

      const user = users.find((u: any) => u.name === newWorkout.userName);
      if (user) {
        user.workouts.push({
          type: newWorkout.workoutType,
          minutes: newWorkout.workoutMinutes,
        });
      } else {
        users.push({
          id: users.length + 1,
          name: newWorkout.userName,
          workouts: [
            {
              type: newWorkout.workoutType,
              minutes: newWorkout.workoutMinutes,
            },
          ],
        });
      }

      localStorage.setItem('userData', JSON.stringify(users));
      this.workoutForm.reset();
      this.router.navigate(['/list']); // Navigate to workout list
    } else {
      console.error('Form Invalid');
    }
  }
}
