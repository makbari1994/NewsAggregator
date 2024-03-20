export interface INewsApiResponseModel {
  status: string;
  totalResults: number;
  articles: INewsApiArticle[];
}

interface INewsApiArticle {
  source: ISource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

interface ISource {
  id: string;
  name: string;
}
