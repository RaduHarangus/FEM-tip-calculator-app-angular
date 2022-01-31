import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import { InputDataService } from '../../services/input-data.service';
import { ResetFormsService } from "../../services/reset-forms.service";
import * as $ from "jquery";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less']
})
export class InputComponent implements OnInit {
  @Output() tipAmountEvent = new EventEmitter<number>();

  // inputForm = new FormGroup({
  //   billInput: new FormControl('0'),
  //   people: new FormControl('0'),
  //   radio: new FormControl('5')
  // });

  inputForm = this.formBuilder.group({
    billInput: 0,
    people: 0,
    radio: 0
  });

  billError = '';
  peopleError = '';
  tipError = '';

  constructor(private formBuilder: FormBuilder,
              private inputDataService: InputDataService,
              private resetFormsService: ResetFormsService) { }

  ngOnInit(): void {
    this.resetFormsService.resetAskedEvent.subscribe( _ => this.resetForm() );
  }

  onFocus(): void {
    let tmp = $('.tip-radio');
    tmp.each(function( index, value ) {
      $(this).prop('checked', false);
    });

  }

  onKeyDown(event: any): void {
    const value = event.target.value;
    if ( ((event.keyCode < 48 || event.keyCode > 105 ) || (event.keyCode > 57 && event.keyCode < 96)) && (value == null || value === '') ) {
      event.preventDefault();
      return;
    }
    this.inputForm.patchValue({radio: Number(value)});
  }

  forceFormSubmit(event: any): void {
    // console.log("selected 1: ", this.inputForm.get('radio')?.value);
    console.log("selected: ", event.target.value);
    this.inputForm.patchValue({radio: Number(event.target.value)});
    this.onFormSubmit(event.target.value);
  }

  onFormSubmit(tipSelection = 0): void {
    // let tipSelection = this.inputForm.get('radio')?.value;
    // console.log("radio selected: ", tipSelection);
    this.inputForm.patchValue({radio: Number(tipSelection)});

    if (!this.validateInput()) {
      return;
    }
    this.clearErrors();
    this.tipAmountEvent.emit(this.inputForm.value['billInput']);
    this.inputDataService.changeOutput(this.inputForm.value);
  }

  validateInput(): boolean {
    let bill = this.inputForm.value['billInput'];
    let tip = this.inputForm.value['radio'];
    let people = this.inputForm.value['people'];

    // console.log("validate tip: ", tip);

    if ( bill === null || bill === '' || typeof(bill) !== "number" || bill <= 0 ) {
      this.displayError('bill');
      return false;
    }
    if ( people === null || people === '' || typeof(people) !== "number" || people <= 0 ) {
      this.displayError('people');
      return false;
    }
    if ( tip === null || tip === '' || typeof(tip) !== "number" || tip <= 0 ) {
      this.displayError('tip');
      return false;
    }

    return true;
  }

  displayError(inputField: string): void {
    // console.log("there is an error at ", inputField, ' ', this.inputForm.value[inputField], ' ', typeof(this.inputForm.value[inputField]));
    let errorMessage = 'error';
    let bill = this.inputForm.value['billInput'];
    let tip = this.inputForm.value['radio'];
    let people = this.inputForm.value['people'];

    if (bill == null || tip == null || people == null || bill === '' || tip === '' || people === '' || typeof(bill) === 'undefined' || typeof(tip) === 'undefined' || typeof(people) === 'undefined' ) {
      errorMessage = "Can't be empty";
    } else if (bill === 0 || tip === 0 || people === 0) {
      errorMessage = "Can't be zero";
    } else if (bill < 0 || tip < 0 || people < 0) {
      errorMessage = "Must be positive";
    } else if (typeof(bill) !== 'number' || typeof(tip) !== 'number' || typeof(people) !== 'number') {
      errorMessage = "Must be a number";
    }

    switch (inputField) {
      case 'bill':
        this.billError = errorMessage;
        this.peopleError = '';
        this.tipError = '';
        break;
      case 'people':
        this.peopleError = errorMessage;
        this.billError = '';
        this.tipError = '';
        break;
      case 'tip':
        this.tipError = errorMessage;
        this.billError = '';
        this.peopleError = '';
        break;
    }
  }

  clearErrors(): void {
    this.billError = '';
    this.peopleError = '';
    this.tipError = '';
  }

  clearCustomTip(): void {
    $('.custom-btn').val('');
  }

  resetForm(): void {
    this.inputForm.reset();
    this.clearErrors();
    this.clearCustomTip();
  }
}
