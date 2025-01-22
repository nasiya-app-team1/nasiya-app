import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config/config.service';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  createAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: config.jwt.access.secret,
      expiresIn: config.jwt.access.time,
    });
  }

  createRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: config.jwt.refresh.secret,
      expiresIn: config.jwt.refresh.time,
    });
  }
  async verifyAccessToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.jwt.access.secret,
      });
      return payload;
    } catch (error) {
      console.error('Token verification failed:', error.message);
      throw new HttpException('Invalid or expired token', 400);
    }
  }

  async verifyRefreshToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.jwt.refresh.secret,
      });
      return payload;
    } catch (error) {
      console.error('Token verification failed:', error.message);
      throw new HttpException('Invalid or expired token', 400);
    }
  }
}
