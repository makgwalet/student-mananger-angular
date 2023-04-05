import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface Alert {
  type: 'success' | 'error';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();

  constructor() { }

  getAlerts(): Observable<Alert> {
    return this.subject.asObservable();
  }

  success(message: string) {
    this.subject.next({ type: 'success', message });
  }

  error(message: string) {
    this.subject.next({ type: 'error', message });
  }
}
