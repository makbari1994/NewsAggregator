export interface IGuardianRequest {
  "api-key": string;
  "reference-type": string;
  q: string;
  section: string;
  "show-fields": string;
  "show-references": string;
  "from-date": Date;
  "to-date": Date;
}
