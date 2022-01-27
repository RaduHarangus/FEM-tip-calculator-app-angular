import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { InputDataService } from '../../services/input-data.service';
import { FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.less']
})
export class OutputComponent implements OnInit {

  inputData = this.formBuilder.group({
    billInput: '1',
    people: '2',
    tipInput: 3
  });
  tipAmount = 0;
  subscription?: Subscription;

  constructor(private inputDataService: InputDataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getInputData();
    this.subscription = this.inputDataService.currentInputData.subscribe(data => this.inputData = data);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getInputData(): void {
    this.inputDataService.currentInputData.subscribe(input => this.inputData = input);
  }

}
