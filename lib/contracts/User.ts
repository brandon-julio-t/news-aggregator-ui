import BaseModel from './BaseModel';

export default interface User extends BaseModel {
  name: string;
  email: string;
}
