export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  nickname: string;
  organization: string;
}
