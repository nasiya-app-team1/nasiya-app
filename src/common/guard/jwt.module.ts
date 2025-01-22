import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GuardService } from './jwt-auth.guard';
import { TokenService } from './jwt.service';
import { config } from 'src/config/config.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: config.JWT_ACCESS_SECRET,
        signOptions: {
          expiresIn: config.JWT_ACCESS_TIME,
        },
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: config.JWT_REFRESH_SECRET,
        signOptions: {
          expiresIn: config.JWT_REFRESH_TIME,
        },
      }),
    }),
  ],
  providers: [GuardService, TokenService],
  exports: [GuardService, TokenService],
})
export class GuardModule {}
