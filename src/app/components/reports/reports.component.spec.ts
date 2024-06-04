import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsComponent } from './reports.component';
import { ReportsFormComponent } from '../reports-form/reports-form.component';
import { ReportsResultComponent } from '../reports-result/reports-result.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, of } from 'rxjs';
import { BriefingData } from '../../model/reports.model';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReportsComponent,
        ReportsFormComponent,
        ReportsResultComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });

  it('should handle form submission', () => {
    spyOn(component, 'onFormSubmitted');

    const formComponent = fixture.debugElement.query(
      By.directive(ReportsFormComponent)
    ).componentInstance;
    formComponent.formSubmitted.emit({
      airports: '',
      messageTypes: { metar: true, sigmet: false, taf: false },
      countries: 'SQ',
    });

    expect(component.onFormSubmitted).toHaveBeenCalledWith({
      airports: '',
      messageTypes: { metar: true, sigmet: false, taf: false },
      countries: 'SQ',
    });
  });

  it('should pass briefingData and loading to app-reports-result', () => {
    const briefingData: BriefingData = {
      error: undefined,
      results: [
        {
          id: '1',
          reports: [
            {
              queryType: 'METAR',
              text: 'text',
              reportTime: '2016-06-15T11:00:00Z',
            },
          ],
        },
      ],
    };
    component.briefingData$ = of<BriefingData>(briefingData);
    component.loading$ = new BehaviorSubject<boolean>(true);
    fixture.detectChanges();

    const resultComponent = fixture.debugElement.query(
      By.directive(ReportsResultComponent)
    ).componentInstance;

    expect(resultComponent.briefingData).toEqual(briefingData);
    expect(resultComponent.loading).toBeTrue();
  });
});
