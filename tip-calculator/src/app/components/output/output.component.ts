import {Component, Input, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { InputDataService } from '../../services/input-data.service';
import { FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";
import { ResetFormsService } from "../../services/reset-forms.service";

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.less']
})
export class OutputComponent implements OnInit {
  inputData = this.formBuilder.group({
    billInput: 0,
    people: 0,
    radio: 0
  });

  tipAmount = 0;
  totalPerPerson = 0;
  subscription?: Subscription;

  constructor(private inputDataService: InputDataService,
              private formBuilder: FormBuilder,
              private resetFormsService: ResetFormsService) { }

  ngOnInit(): void {
    this.getInputData();
    this.subscription = this.inputDataService.currentInputData.subscribe(data => {
      this.inputData = data;
      let tip = data['billInput'] * data['radio'] / 100;

      // console.log("output subscription, tipAmount: ", data['billInput'], data['radio']);

      this.tipAmount = Number(tip / data['people']);
      let total = Number(data['billInput']) + Number(tip);
      this.totalPerPerson = total / data['people'];
    });
    this.resetFormsService.resetAskedEvent.subscribe( _ => this.resetForm() );
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
    this.resetFormsService.resetAsked();
  }

  resetForm() {
    this.tipAmount = 0;
    this.totalPerPerson = 0;
  }

}
