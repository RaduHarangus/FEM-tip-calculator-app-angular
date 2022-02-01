import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  inputData: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  updateTipAmount(value: number): void {
    this.inputData = value;
  }

}
