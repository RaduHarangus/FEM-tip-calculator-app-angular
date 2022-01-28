import { Injectable } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InputDataService {

  inputForm = this.formBuilder.group({
    billInput: 0,
    people: 0,
    tipInput: 0
  });

  public inputSource = new BehaviorSubject(this.inputForm.value);
  currentInputData = this.inputSource.asObservable();

  constructor(private formBuilder: FormBuilder) { }

  changeOutput(newData: any): void {
    this.inputSource.next(newData);
  }
}
