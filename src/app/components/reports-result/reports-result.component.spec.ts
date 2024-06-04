import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsResultComponent } from './reports-result.component';
import { ReportsResultItemComponent } from '../reports-result-item/reports-result-item.component';
import { By } from '@angular/platform-browser';

describe('ReportsResultComponent', () => {
  let component: ReportsResultComponent;
  let fixture: ComponentFixture<ReportsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsResultItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });

  it('should display no results when there are no results', () => {
    component.loading = false;
    component.briefingData = {
      results: [],
    };
    fixture.detectChanges();

    const noResultsMessage = fixture.debugElement.query(
      By.css('[data-test-id="no-results-label"]')
    );
    expect(noResultsMessage.nativeElement.textContent).toContain(
      'No results found'
    );
  });
});
