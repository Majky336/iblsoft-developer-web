import {ReportType} from "../model/reports.model";

export const mapFormDataAirportToRequestDataAirport = (formDataAirports: string): string[] | null => {
  const splitValues = formDataAirports.split(" ");

  const filteredSplitValues = splitValues.filter(value => value);

  if (filteredSplitValues.length === 0) {
    return null;
  }

  return filteredSplitValues;
};

export const mapFormDataCountriesToRequestDataCountries = (formDataCountries: string): string[] | null => {
  const splitValues = formDataCountries.split(" ");
  const filteredSplitValues = splitValues.filter(value => value);

  if (filteredSplitValues.length === 0) {
    return null;
  }

  return filteredSplitValues as string[];
}

export const mapFormDataMessageTypeToRequestDataReportType = (formDataMessageType: Record<keyof typeof ReportType, boolean>): ReportType[] => {
  return Object.entries(formDataMessageType)
    .filter(([_, value]) => value)
    .map(([key]) => {
      return ReportType[key as keyof typeof ReportType];
    });
}
