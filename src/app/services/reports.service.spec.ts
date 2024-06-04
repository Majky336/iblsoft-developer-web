import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ReportsService,
  ReportsRequestData,
  ReportsResponse,
} from './reports.service';
import { BASE_API_URL } from '../constants/api.constants';
import { ReportType } from '../model/reports.model';

describe('ReportsService', () => {
  let service: ReportsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportsService],
    });

    service = TestBed.inject(ReportsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected reports data', () => {
    const mockReportsResponse: ReportsResponse = {
      result: [
        {
          placeId: '123',
          queryType: 'type1',
          text: 'text',
          textHTML: '<p>text</p>',
          reportTime: '2022-01-01T00:00:00Z',
          revision: '1',
          stationId: 'station1',
          reportType: 'reportType1',
        },
      ],
    };

    const mockReportsRequestData: ReportsRequestData = {
      method: 'query',
      params: [
        {
          reportTypes: [ReportType.taf],
        },
      ],
    };

    service.getReports(mockReportsRequestData).subscribe((response) => {
      expect(response).toEqual(mockReportsResponse);
    });

    const req = httpMock.expectOne(BASE_API_URL);
    expect(req.request.method).toBe('POST');

    req.flush(mockReportsResponse);
  });
});
