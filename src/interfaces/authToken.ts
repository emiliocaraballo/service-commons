export interface IRequest {
  user?: ITokenUserData;
  headers?: {
    platform?: string;
  };
}
export interface ITokenUserData {
  sub: number; // Id user
  rol?: 'CUSTOMER' | 'ADMIN'; // Role user
  iat?: number;
  exp?: number;
  createdAtToken: string;
}
