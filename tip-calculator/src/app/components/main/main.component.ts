import { Component, OnInit } from '@angular/core';
import { InputDataService } from '../../services/input-data.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  inputData: number = 0;

  // constructor(private inputDataService: InputDataService, private subscription: Subscription) { }
  constructor() { }

  ngOnInit(): void {
    // this.subscription = this.inputDataService.inputSource.subscribe(data => this.inputData = data);
  }

  updateTipAmount(value: number): void {
    this.inputData = value;
    // this.inputDataService.changeOutput(value);
  }

  doResetForms(): void {
    console.log("reset of forms initiated");
    // update the reset service
  }

}
