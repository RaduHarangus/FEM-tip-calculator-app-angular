import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetFormsService {
  @Output() resetAskedEvent = new EventEmitter();

  constructor() { }

  resetAsked() {
    this.resetAskedEvent.emit();
  }
}
