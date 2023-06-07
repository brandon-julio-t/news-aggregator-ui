import BaseModel from "./BaseModel";

export default interface Article extends BaseModel {
  title: string;
  description: string;
  author: string;
  category: string;
  source: string;
}
