export enum ReportType {
  metar = 'METAR',
  sigmet = 'SIGMET',
  taf = 'TAF_LONGTAF'
}

export type BriefingDataError = {
  code?: number;
  message?: string;
}

export type BriefingData = {
  error?: BriefingDataError;
  results: ReportData[];
}

export type ReportData = {
  id: string;
  reports: Report[];
}

export type Report = {
  queryType: string;
  reportTime?: string;
  text: string;
}
