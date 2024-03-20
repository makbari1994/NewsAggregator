export interface IGuardianResponse {
  results: IArticles[];
}

interface IArticles {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: Date;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields: {
    byline: string;
    thumbnail: string;
  };
  references: IReferences[];
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}

interface IReferences {
  id: string;
  type: string;
}
