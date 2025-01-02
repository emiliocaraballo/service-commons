// Libraries
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { to } from 'await-to-js';

// Interfaces
import { ITokenUserData } from '../interfaces';
import { customThrowError } from '../filters/errorsFilter/customThrowError';
import { JwtService } from '@nestjs/jwt';

// Auth Guard for connect to Auth microservice
@Injectable()
export class PublicAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get request context
    const req = context.switchToHttp().getRequest();

    // Get Token
    const accessToken = req.headers['authorization']?.split(' ')[1];

    // Ignore if headers have no token to continue
    if (!accessToken) {
      return true;
    }
    // Send accessToken to validate auth microservice
    const [errorValidate, response] = await to<ITokenUserData>(
      this.validateToken(req.headers['authorization']?.split(' ')[1]),
    );
    if (errorValidate) {
      throw new UnauthorizedException(
        customThrowError(errorValidate, 'UNAUTHORIZED'),
      );
    }
    // SET response USER to request
    req.user = response;
    return true;
  }

  public async validateToken(accessToken: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.API_TOKEN_KEY_VALUE,
      });
      return decoded;
    } catch (err) {
      console.log(err);
    }
    throw new UnauthorizedException('Invalid token');
  }
}
