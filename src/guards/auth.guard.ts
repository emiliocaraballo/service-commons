// Libraries
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { to } from 'await-to-js';
import { JwtService } from '@nestjs/jwt';
import { customThrowError } from '../filters/errorsFilter/customThrowError';

// Interfaces

// Auth Guard for connect to Auth microservice
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get request context
    const req = context.switchToHttp().getRequest();
    // Send accessToken to validate auth microservice
    const [errorValidate, response] = await to(
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
