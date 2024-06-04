import { Component } from '@angular/core';
import { ReportsFormComponent } from '../reports-form/reports-form.component';
import { ReportsFormValues } from '../../model/reports-form.model';
import {
  ReportsResponse,
  ReportsService,
} from '../../services/reports.service';
import {
  mapFormDataAirportToRequestDataAirport,
  mapFormDataCountriesToRequestDataCountries,
  mapFormDataMessageTypeToRequestDataReportType,
} from '../../mappers/form-data.mapper';
import { ReportsResultComponent } from '../reports-result/reports-result.component';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { BriefingData, Report } from '../../model/reports.model';
import { removeNullUndefined } from '../../utils/object.utils';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    ReportsFormComponent,
    ReportsResultComponent,
    NgIf,
    AsyncPipe,
    JsonPipe,
  ],
  templateUrl: './reports.component.html',
})
export class ReportsComponent {
  loading$ = new BehaviorSubject<boolean>(false);
  briefingData$ = new Observable<BriefingData>();

  constructor(private reportsService: ReportsService) {}

  onFormSubmitted(value: ReportsFormValues) {
    this.loading$.next(true);

    this.briefingData$ = this.reportsService
      .getReports({
        id: crypto.randomUUID(),
        method: 'query',
        colorize: false,
        params: [this.getReportParams(value)],
      })
      .pipe(
        map((response) => {
          if (response.error) {
            return this.getErrorResult(response);
          }

          const groupedData = response.result.reduce((acc, report) => {
            const key = report.stationId;

            if (!acc[key]) {
              acc[key] = [];
            }

            acc[key].push(report);

            return acc;
          }, {} as Record<string, Report[]>);

          const results = Object.entries(groupedData).map(([id, reports]) => ({
            id,
            reports,
          }));

          return { results };
        }),
        tap({ complete: () => this.loading$.next(false) })
      );
  }

  private getReportParams = (value: ReportsFormValues) => {
    const mappedMandatoryValues = {
      reportTypes: mapFormDataMessageTypeToRequestDataReportType(
        value.messageTypes
      ),
    };

    const mappedValues = {
      stations: mapFormDataAirportToRequestDataAirport(value.airports),
      countries: mapFormDataCountriesToRequestDataCountries(value.countries),
    };

    const filteredMappedValues = removeNullUndefined(mappedValues);

    return { ...mappedMandatoryValues, ...filteredMappedValues };
  };

  private getErrorResult = (response: ReportsResponse) => {
    return {
      error: {
        code: response.error?.code,
        message: response.error?.message,
      },

      results: [],
    };
  };
}
