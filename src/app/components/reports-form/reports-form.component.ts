import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ReportsFormValues} from "../../model/reports-form.model";
import {ReportType} from "../../model/reports.model";

type ReportTypeFormGroup = {
  [key in keyof typeof ReportType]: FormControl<boolean | null>
}

@Component({
  selector: 'app-reports-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './reports-form.component.html',
  styleUrl: './reports-form.component.css'
})
export class ReportsFormComponent {
  reportsForm = new FormGroup({
    airports: new FormControl(''),
    countries: new FormControl(''),
    messageTypes: new FormGroup<ReportTypeFormGroup>({
      metar: new FormControl(false),
      sigmet: new FormControl(false),
      taf: new FormControl(false)
    }, { validators: this.messageTypesValidator()})
  }, { validators: this.airportsOrCountriesValidator() })

  @Output()
  formSubmitted: EventEmitter<ReportsFormValues> = new EventEmitter()

  onSubmit() {
    this.reportsForm.markAllAsTouched();

    if (this.reportsForm.invalid) {
      return;
    }

    this.formSubmitted.emit(this.reportsForm.value as ReportsFormValues);
  }

  airportsOrCountriesValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const airports = control.get('airports')?.value
      const countries = control.get('countries')?.value

      if (!airports && !countries) {
        return { airportsOrCountries: true }
      }

      return null
    }
  }

  messageTypesValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const metar = control.get('metar')?.value;
      const sigmet = control.get('sigmet')?.value;
      const taf = control.get('taf')?.value;

      if (!metar && !sigmet && !taf) {
        return { atLeastOneMessageType: true }
      }

      return null;
    }
  }
}
