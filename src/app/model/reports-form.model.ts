import {ReportType} from "./reports.model";

export type ReportsFormValues = {
  airports: string;
  countries: string;
  messageTypes: Record<keyof typeof ReportType, boolean>
}
