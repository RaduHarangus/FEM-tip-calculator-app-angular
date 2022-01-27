import {Component, Input, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { InputDataService } from '../../services/input-data.service';
import { FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.less']
})
export class OutputComponent implements OnInit {
  @Output() clickResetEvent = new EventEmitter<number>();
  inputData = this.formBuilder.group({
    billInput: 0,
    people: 0,
    tipInput: 0
  });

  tipAmount = 0;
  totalPerPerson = 0;
  subscription?: Subscription;

  constructor(private inputDataService: InputDataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getInputData();
    this.subscription = this.inputDataService.currentInputData.subscribe(data => {
      this.inputData = data;
      let tip = data['billInput'] * data['tipInput'] / 100;
      this.tipAmount = (tip / data['people']);
      let total = Number(data['billInput']) + Number(tip);
      this.totalPerPerson = total / data['people'];
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getInputData(): void {
    this.inputDataService.currentInputData.subscribe(input => this.inputData = input);
  }

  onClickReset(): void {
    console.log("reset asked");
    this.clickResetEvent.emit();
  }

}
