import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less']
})
export class InputComponent implements OnInit {

  inputForm = this.formBuilder.group({
    billInput: '',
    people: '',
    tipInput: ''
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Process checkout data here
    // this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.inputForm.value);
    this.inputForm.reset();
  }

}
