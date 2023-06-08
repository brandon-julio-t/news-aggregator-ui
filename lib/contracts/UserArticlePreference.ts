import BaseModel from './BaseModel';

export default interface UserArticlePreference extends BaseModel {
  user_id: number;
  liked_categories: string[];
  liked_authors: string[];
  liked_sources: string[];
}
