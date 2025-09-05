import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export interface Article {
  id: number;
  title: string;
  subTitle: string;
  introduction: string;
  thumbnailImage: string;
  publishedDate: string;
  authorName: string;
  categoryName: string;
}

export interface ArticleDetail {
  id: number;
  title: string;
  subTitle: string;
  introduction: string;
  content: string;
  image: string;
  thumbnailImage: string;
  publishedDate: string;
  authorName: string;
  categoryName: string;
}

export interface ArticleModel {
  articleList: Article[];
  selectedArticle: ArticleDetail | null;
  setArticleList: Action<ArticleModel, Article[]>;
  setSelectedArticle: Action<ArticleModel, ArticleDetail | null>;
  getArticleList: Thunk<ArticleModel, number | null>; // categoryId ou null pour tous
  getArticleById: Thunk<ArticleModel, number>;
}

export const articleModel: ArticleModel = {
  articleList: [],
  selectedArticle: null,
  setArticleList: action((state, articleList) => {
    state.articleList = articleList;
  }),
  getArticleList: thunk(async (actions, categoryId) => {
    try {
      const url =
        categoryId !== null
          ? `${VITE_API_URL}/articles/${categoryId}`
          : `${VITE_API_URL}/articles`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      actions.setArticleList(response.data);
    } catch (error) {
      console.log("error get activityList");
    }
  }),
  setSelectedArticle: action((state, article) => {
    state.selectedArticle = article;
  }),
  getArticleById: thunk(async (actions, id) => {
    try {
      const response = await axios.get(`${VITE_API_URL}/articles/${id}`);
      actions.setSelectedArticle(response.data);
    } catch (error) {
      console.error("Error fetching article details:", error);
    }
  }),
};
