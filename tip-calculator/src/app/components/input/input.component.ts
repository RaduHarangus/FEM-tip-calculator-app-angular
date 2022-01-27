import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { InputDataService } from '../../services/input-data.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less']
})
export class InputComponent implements OnInit {
  @Output() tipAmountEvent = new EventEmitter<number>();

  inputForm = this.formBuilder.group({
    billInput: '',
    people: '',
    tipInput: 0
  });

  constructor(private formBuilder: FormBuilder, private inputDataService: InputDataService) { }

  ngOnInit(): void {
  }

  onClick(event: any): void {
    let newInput = {
      tipInput: event.target.value
    };
    this.inputForm.patchValue(newInput);
  }

  onKeyDown(event: any): void {
    const value = event.target.value;
    if ( ((event.keyCode < 48 || event.keyCode > 105 ) || (event.keyCode > 57 && event.keyCode < 96)) && (value == null || value === '') ) {
      event.preventDefault();
      return;
    }
    let newInput = {
      tipInput: Number(value)
    };
    this.inputForm.patchValue(newInput);
    console.log('new values: ', this.inputForm.value);
  }

  onSubmit(): void {
    // validateInput();
    this.tipAmountEvent.emit(this.inputForm.value['billInput']);
    this.inputDataService.changeOutput(this.inputForm.value);
    // this.inputForm.reset();
  }
}
