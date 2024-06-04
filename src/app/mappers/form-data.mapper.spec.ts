import {
  mapFormDataAirportToRequestDataAirport,
  mapFormDataCountriesToRequestDataCountries,
  mapFormDataMessageTypeToRequestDataReportType
} from './form-data.mapper';
import {ReportType} from "../model/reports.model";

describe('mapFormDataAirportToRequestDataAirport', () => {
  it('should return an array of strings when input is a string of airports', () => {
    const formDataAirports = 'JFK LAX DFW';
    const expected = ['JFK', 'LAX', 'DFW'];
    const result = mapFormDataAirportToRequestDataAirport(formDataAirports);

    expect(result).toEqual(expected);
  });

  it('should return null when input is an empty string', () => {
    const formDataAirports = '';
    const result = mapFormDataAirportToRequestDataAirport(formDataAirports);

    expect(result).toBeNull();
  });

  it('should ignore extra spaces in the input string', () => {
    const formDataAirports = ' JFK  LAX  DFW ';
    const expected = ['JFK', 'LAX', 'DFW'];
    const result = mapFormDataAirportToRequestDataAirport(formDataAirports);

    console.log(result);

    expect(result).toEqual(expected);
  });

  it('should return null when input is a string of spaces', () => {
    const formDataAirports = '     ';
    const result = mapFormDataAirportToRequestDataAirport(formDataAirports);

    expect(result).toBeNull();
  });
});

describe('mapFormDataCountriesToRequestDataCountries', () => {
  it('should return an array of strings when input is a string of countries', () => {
    const formDataCountries = 'SQ UK CZ';
    const expected = ['SQ', 'UK', 'CZ'];
    const result = mapFormDataCountriesToRequestDataCountries(formDataCountries);

    expect(result).toEqual(expected);
  });

  it('should return null when input is an empty string', () => {
    const formDataCountries = '';
    const result = mapFormDataCountriesToRequestDataCountries(formDataCountries);

    expect(result).toBeNull();
  });

  it('should ignore extra spaces in the input string', () => {
    const formDataCountries = ' SQ  UK  CZ ';
    const expected = ['SQ', 'UK', 'CZ'];
    const result = mapFormDataCountriesToRequestDataCountries(formDataCountries);

    expect(result).toEqual(expected);
  });

  it('should return null when input is a string of spaces', () => {
    const formDataCountries = '     ';
    const result = mapFormDataCountriesToRequestDataCountries(formDataCountries);

    expect(result).toBeNull();
  });
});

describe('mapFormDataMessageTypeToRequestDataReportType', () => {
  it('should return an array of ReportType when input is a Record of ReportType and boolean', () => {
    const formDataMessageType: Record<keyof typeof ReportType, boolean> = {taf: true, sigmet: false, metar: true};
    const expected = [ReportType.taf, ReportType.metar];
    const result = mapFormDataMessageTypeToRequestDataReportType(formDataMessageType);

    expect(result).toEqual(expected);
  });

  it('should return an empty array when input is a Record of ReportType and boolean with all false values', () => {
    const formDataMessageType: Record<keyof typeof ReportType, boolean> = {taf: false, sigmet: false, metar: false};
    const result = mapFormDataMessageTypeToRequestDataReportType(formDataMessageType);

    expect(result).toEqual([]);
  });

  it('should return an array of all ReportType when input is a Record of ReportType and boolean with all true values', () => {
    const formDataMessageType: Record<keyof typeof ReportType, boolean> = {taf: true, sigmet: true, metar: true};
    const expected = [ReportType.taf, ReportType.sigmet, ReportType.metar];
    const result = mapFormDataMessageTypeToRequestDataReportType(formDataMessageType);

    expect(result).toEqual(expected);
  });
});
