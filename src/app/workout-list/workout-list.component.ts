import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  isLoading(isLoading: any) {
    throw new Error('Method not implemented.');
  }
  updateSearchName(updateSearchName: any) {
    throw new Error('Method not implemented.');
  }
  users: any[] = [];
  searchName = '';
  searchNameSubject = new Subject<string>();
  filterType = '';
  sortColumn = '';
  sortOrder = 'asc';
  currentPage = 1;
  itemsPerPage = 5;
  paginatedUsers: any[] = [];
  workoutTypes: string[] = [
    'Running', 'Cycling', 'Swimming', 'Yoga', 'Weightlifting',
    'CrossFit', 'Pilates', 'HIIT', 'Dancing', 'Hiking',
    'Boxing', 'Rowing', 'Stretching', 'Walking', 'Jogging',
    'Kickboxing', 'Rock Climbing', 'Aerobics', 'Zumba', 'Tennis'
  ];
  chart: Chart | undefined;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadUsers();
    this.searchNameSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchName => {
      this.searchName = searchName;
      this.updatePagination();
    });
  }

  loadUsers() {
    this.users = JSON.parse(localStorage.getItem('userData') || '[]');
    this.updatePagination();
    this.createChart();
  }

  get filteredUsers() {
    let users = this.users.filter((user: any) => {
      const matchesName = user.name.toLowerCase().includes(this.searchName.toLowerCase());
      const matchesType = this.filterType === '' || user.workouts.some((workout: any) =>
        workout.type.toLowerCase().includes(this.filterType.toLowerCase())
      );
      return matchesName && matchesType;
    });

    if (this.sortColumn) {
      users = users.sort((a: any, b: any) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];

        if (aValue < bValue) {
          return this.sortOrder === 'asc' ? -1 : 1;
        } else if (aValue > bValue) {
          return this.sortOrder === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }

    return users;
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.filteredUsers.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  setSortColumn(column: string) {
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortOrder = 'asc';
    }
    this.updatePagination();
  }

  createChart() {
    const ctx = document.getElementById('workoutChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy(); // Ensure existing chart is destroyed before creating new one
    }

    const workoutData: { [key: string]: number } = {};

    this.users.forEach((user: any) => {
      user.workouts.forEach((workout: any) => {
        if (!workoutData[workout.type]) {
          workoutData[workout.type] = 0;
        }
        workoutData[workout.type] += workout.minutes;
      });
    });

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(workoutData),
        datasets: [
          {
            label: 'Total Workout Minutes',
            data: Object.values(workoutData),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getWorkoutTypes(user: any): string {
    const workoutTypesSet = new Set(user.workouts.map((w: any) => w.type));
    return Array.from(workoutTypesSet).join(', ');
  }

  getWorkoutMinutes(user: any): number {
    return user.workouts.reduce((acc: number, w: any) => acc + w.minutes, 0);
  }
}
