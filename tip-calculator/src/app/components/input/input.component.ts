import {Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from "@angular/forms";

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

  constructor(private formBuilder: FormBuilder) { }

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
    // console.log(value);
    if ( ((event.keyCode < 48 || event.keyCode > 105 ) || (event.keyCode > 57 && event.keyCode < 96)) && (value == null || value === '') ) {
      // console.log("catch: ", event.key, event.keyCode);
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
    // Process checkout data here
    // this.items = this.cartService.clearCart();

    // validateInput();

    // this.tipAmountEvent.emit(Number(this.inputForm.value['billInput']) * Number(this.inputForm.value['tipInput']) /100);
    this.tipAmountEvent.emit(this.inputForm.value);
    // console.log('bill input: ', this.inputForm.value['billInput']);
    // console.log('Your order has been submitted', this.inputForm.value);
    // this.inputForm.reset();
  }

}
