import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../constants/api.constants';
import { Observable } from 'rxjs';
import { ReportType } from '../model/reports.model';

export type RequestDataParams = {
  reportTypes: ReportType[];
  places?: string[];
  stations?: string[];
  firs?: string[];
  countries?: string[];
  id?: string;
};

export type ReportsRequestData = {
  id?: string;
  colorize?: boolean;
  method: 'query';
  params: RequestDataParams[];
};

export type ReportsResponseResult = {
  placeId: string;
  queryType: string;
  text: string;
  textHTML: string;
  reportTime: string;
  revision: string;
  stationId: string;
  reportType: string;
};

export type ResponseError = {
  code: number;
  message: string;
  data: unknown;
};

export type ReportsResponse = {
  error?: ResponseError;
  id?: string;
  result: ReportsResponseResult[];
};

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private httpClient: HttpClient) {}

  public getReports = (
    data: ReportsRequestData
  ): Observable<ReportsResponse> => {
    return this.httpClient.post<ReportsResponse>(BASE_API_URL, data);
  };
}
