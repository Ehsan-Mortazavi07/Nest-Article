export interface IUser {
  id: number;
  fullname: string;
  email: string;
  role: string;
  image?: string;
  password: string;
  token?: string;
  deleted: boolean;
}

export interface IJwtPayload {
  sub: any;
  email: string;
}
