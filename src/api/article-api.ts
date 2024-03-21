import axios from "axios";
import { INewsApiRequestModel } from "../models/news-api-request-model";
import { IArticleRequest } from "../models/article-request-model";
import { INewsApiResponseModel } from "../models/news-api-response-model";
import { IArticleResponse } from "../models/article-response-model";
import {
  guardianArticleMapper,
  newsApiArticleMapper,
  nytimesArticleMapper,
} from "../utils/article-utils";
import { IGuardianResponse } from "../models/guardian-response-model";
import { INytimesRequest } from "../models/nytimes-request-model";
import moment from "moment";
import { INytimesResponse } from "../models/nytimes-response-model";
import { IGuardianRequest } from "../models/guardian-request-model";

// The NewsApi articles
const getNewsApiArticles = async (
  params: IArticleRequest
): Promise<INewsApiResponseModel> => {
  const url = String(process.env.REACT_APP_NEWS_API_URL);
  const newsApiParams = {} as INewsApiRequestModel;
  newsApiParams.apiKey = String(process.env.REACT_APP_NEWS_API_API_KEY);
  newsApiParams.sources = params.source;
  newsApiParams.q = params.query;
  newsApiParams.from = params.fromDate;
  newsApiParams.to = params.toDate;
  let filterParams = Object.fromEntries(
    Object.entries(newsApiParams).filter(([_, v]) => v)
  );
  try {
    const res = await axios.get(url, { params: filterParams });
    return res.data;
  } catch (e) {}
  const res: INewsApiResponseModel = {} as INewsApiResponseModel;
  return res;
};

// The Guardian articles

const getGuardianArticles = async (
  params: IArticleRequest
): Promise<IGuardianResponse> => {
  const url = String(process.env.REACT_APP_GUARDIAN_URL);
  const gurdianParams = {} as IGuardianRequest;
  gurdianParams["api-key"] = String(process.env.REACT_APP_GUARDIAN_API_KEY);
  gurdianParams["reference-type"] = params.source;
  gurdianParams["q"] = params.query;
  gurdianParams["from-date"] = params.fromDate;
  gurdianParams["to-date"] = params.toDate;
  gurdianParams["show-fields"] = "byline,thumbnail";
  gurdianParams["show-references"] = "all";
  gurdianParams["section"] = params.category;
  let filterParams = Object.fromEntries(
    Object.entries(gurdianParams).filter(([_, v]) => v)
  );

  try {
    const res = await axios.get(url, { params: filterParams });
    return res.data.response;
  } catch (e) {}
  const res: IGuardianResponse = {} as IGuardianResponse;
  return res;
};

// The New York Times articles
const getNytimesArticles = async (
  params: IArticleRequest
): Promise<INytimesResponse> => {
  const url = String(process.env.REACT_APP_NYTIMES_URL);
  const nyTimesParams = {} as INytimesRequest;
  nyTimesParams["api-key"] = String(process.env.REACT_APP_NYTIMES_API_KEY);
  if (params.source) {
    nyTimesParams.fq = `source:(${params.source})`;
  }
  if (params.category) {
    nyTimesParams.fq += ` AND news_desk:(${params.category})`;
  }
  nyTimesParams.q = params.query;
  nyTimesParams.begin_date = params.fromDate
    ? moment(params.fromDate).format("YYYYMMDD")
    : "";
  nyTimesParams.end_date = params.toDate
    ? moment(params.toDate).format("YYYYMMDD")
    : "";

  let filterParams = Object.fromEntries(
    Object.entries(nyTimesParams).filter(([_, v]) => v)
  );
  try {
    const res = await axios.get(url, { params: filterParams });
    return res.data.response;
  } catch (e) {}
  const res: INytimesResponse = {} as INytimesResponse;
  return res;
};

export const getArticles = async (
  params: IArticleRequest
): Promise<IArticleResponse[]> => {
  let response: IArticleResponse[] = [];
  const newsApiResponse = await getNewsApiArticles(params);
  const guardianResponse = await getGuardianArticles(params);
  const nytimesResponse = await getNytimesArticles(params);
  response = [
    ...guardianArticleMapper(guardianResponse),
    ...newsApiArticleMapper(newsApiResponse),
    ...nytimesArticleMapper(nytimesResponse),
  ];
  return response;
};
