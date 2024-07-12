import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { CommentsFormComponent } from './comments-form/comments-form.component';
import { CommentsDisplayComponent } from './comments-display/comments-display.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let appService: AppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        WorkoutFormComponent,
        WorkoutListComponent,
        CommentsFormComponent,
        CommentsDisplayComponent
      ],
      providers: [AppService]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'fitness-tracker'`, () => {
    expect(component.title).toEqual('fitness-tracker');
  });

  it('should set component to comments when openComments is called', () => {
    spyOn(appService, 'setComponent');
    component.openComments();
    expect(appService.setComponent).toHaveBeenCalledWith('comments');
  });

  it('should set component to workout-form when openWorkoutForm is called', () => {
    spyOn(appService, 'setComponent');
    component.openWorkoutForm();
    expect(appService.setComponent).toHaveBeenCalledWith('workout-form');
  });

  it('should set component to workout-list when openWorkoutList is called', () => {
    spyOn(appService, 'setComponent');
    component.openWorkoutList();
    expect(appService.setComponent).toHaveBeenCalledWith('workout-list');
  });

  it('should set showForm to false when closeForm is called', () => {
    component.showForm = true;
    component.closeForm();
    expect(component.showForm).toBe(false);
  });
});
