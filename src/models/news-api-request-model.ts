export interface INewsApiRequestModel {
  apiKey: string;
  sources: string;
  q: string;
  from: Date;
  to: Date;
}
