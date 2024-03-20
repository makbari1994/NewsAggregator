import { IArticleFeedResponse } from "../models/article-feed-response-model";
import { IArticleResponse } from "../models/article-response-model";
import { IGuardianResponse } from "../models/guardian-response-model";
import { INewsApiResponseModel } from "../models/news-api-response-model";
import { INytimesResponse } from "../models/nytimes-response-model";

export const newsApiArticleMapper = (
  articles: INewsApiResponseModel
): IArticleResponse[] => {
  const response: IArticleResponse[] = [];
  const newsApiArticles = articles.articles;

  newsApiArticles?.map((item) => {
    const obj = {} as IArticleResponse;
    obj.source = item.source.name;
    obj.author = item.author;
    obj.title = item.title;
    obj.description = item.description;
    obj.url = item.url;
    obj.urlToImage = item.urlToImage;
    obj.publishedAt = item.publishedAt;
    obj.content = item.content;
    obj.api = "newsApi";
    response.push(obj);
  });

  return response;
};

export const guardianArticleMapper = (
  articles: IGuardianResponse
): IArticleResponse[] => {
  const response: IArticleResponse[] = [];
  const guardianArticles = articles.results;

  guardianArticles?.map((item) => {
    const obj = {} as IArticleResponse;
    obj.source = item.references?.[0]?.type;
    obj.author = item.fields?.byline;
    obj.title = item.webTitle;
    obj.description = "";
    obj.url = item.webUrl;
    obj.urlToImage = item.fields?.thumbnail;
    obj.publishedAt = item.webPublicationDate;
    obj.content = "";
    obj.category = item.sectionId;
    obj.api = "quardian";
    response.push(obj);
  });

  return response;
};

export const nytimesArticleMapper = (
  articles: INytimesResponse
): IArticleResponse[] => {
  const response: IArticleResponse[] = [];
  const guardianArticles = articles.docs;

  guardianArticles?.map((item) => {
    const obj = {} as IArticleResponse;
    obj.source = item.source;
    obj.author = item.byline?.original?.replace("by ", "");
    obj.title = item.abstract;
    obj.description = "";
    obj.url = item.web_url;
    obj.urlToImage = "https://static01.nyt.com/" + item.multimedia?.[0]?.url;
    obj.publishedAt = item.pub_date;
    obj.content = "";
    obj.category = item.news_desk;
    obj.api = "nytimes";
    response.push(obj);
  });

  return response;
};

export const getFeedInfo = (
  articles: IArticleResponse[]
): IArticleFeedResponse => {
  const authorList: string[] = [];
  const categoryList: string[] = [];
  const sourceList: string[] = [];

  articles.map((item) => {
    const authorIndex = authorList.findIndex((a) => a?.includes(item.author));
    if (authorIndex == -1 && item.author) {
      authorList.push(item.author);
    }
    const sourceIndex = sourceList.findIndex((a) => a?.includes(item.source));
    if (sourceIndex == -1 && item.source) {
      sourceList.push(item.source);
    }
    const categoryIndex = categoryList.findIndex((a) =>
      a?.includes(item.category)
    );
    if (categoryIndex == -1 && item.category) {
      categoryList.push(item.category);
    }
  });

  return {
    authorList,
    categoryList,
    sourceList,
  };
};
