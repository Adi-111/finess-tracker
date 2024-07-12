import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private displayComponentSubject = new BehaviorSubject<string>(''); // Initial state is an empty string
  displayComponent$: Observable<string> = this.displayComponentSubject.asObservable();

  constructor() { }

  setComponent(componentName: string): void {
    this.displayComponentSubject.next(componentName);
  }
}
