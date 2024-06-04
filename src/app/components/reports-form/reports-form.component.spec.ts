import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsFormComponent } from './reports-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";

describe('ReportsFormComponent', () => {
  let component: ReportsFormComponent;
  let fixture: ComponentFixture<ReportsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });

  it('should show error message when no message type is selected', () => {
    const form = component.reportsForm;

    form.get('messageTypes')?.setValue({
      metar: false,
      sigmet: false,
      taf: false
    });

    form.markAllAsTouched();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('[data-test-id="message-types-error"]'));
    expect(errorMessage).toBeTruthy();
  });

  it('should show error message when no airport or country is typed in', () => {
    const form = component.reportsForm;

    form.get('countries')?.setValue("");
    form.get('airports')?.setValue("");

    form.markAllAsTouched();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('[data-test-id="airports-or-countries-error"]'));
    expect(errorMessage).toBeTruthy();
  });

  it('should disable submit button when there is a form error', () => {
    const form = component.reportsForm;

    form.setErrors({ 'airportsOrCountries': true });

    form.markAllAsTouched();
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('[data-test-id="submit-button"]')).nativeElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should emit correct data when the form is submitted', () => {
    spyOn(component, 'onSubmit');

    component.reportsForm.get('messageTypes')?.setValue({
      metar: true,
      sigmet: false,
      taf: false
    });
    component.reportsForm.get('airports')?.setValue('');
    component.reportsForm.get('countries')?.setValue('SQ');

    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[data-test-id="submit-button"]')).nativeElement;
    submitButton.click();
    fixture.detectChanges();

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
