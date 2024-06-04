import {ReportsResultItemComponent} from "./reports-result-item.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Report} from "../../model/reports.model";

describe('ReportsResultItemComponent', () => {
  let component: ReportsResultItemComponent;
  let fixture: ComponentFixture<ReportsResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsResultItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsResultItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no report data on initialization', () => {
    expect(component.report).toBeUndefined();
  });

  it('should update report data when input is provided', () => {
    const mockReport: Report = {
      queryType: "queryType",
      reportTime: "2016-06-15T11:00:00Z",
      text: "text"
    };

    component.report = mockReport;
    fixture.detectChanges();

    expect(component.report).toEqual(mockReport);
  });
});
