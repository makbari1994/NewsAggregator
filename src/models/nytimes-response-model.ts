export interface INytimesResponse {
  docs: IArticles[];
}

interface IArticles {
  abstract: string;
  byline: {
    original: string;
  };
  news_desk: string;
  pub_date: Date;
  section_name: string;
  source: string;
  web_url: string;
  multimedia: multimedia[];
}

interface multimedia {
  url: string;
}
