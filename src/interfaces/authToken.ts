export interface IRequest {
  user?: ITokenUserData;
  headers?: {
    platform?: string;
  };
}
export interface ITokenUserData {
  id: number; // Id user
  rol?: 'CUSTOMER' | 'ADMIN' | 'SUPER_ADMIN'; // Role user
  iat?: number;
  exp?: number;
  createdAtToken: string;
}
