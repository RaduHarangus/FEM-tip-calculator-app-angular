import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.less']
})
export class OutputComponent implements OnInit {

  outputForm = this.formBuilder.group({
    tipAmount: '',
    total: ''
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been reset');
    this.outputForm.reset();
  }

}
