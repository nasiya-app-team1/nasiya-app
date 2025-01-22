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
        secret: config.jwt.access.secret,
        signOptions: {
          expiresIn: config.jwt.access.time,
        },
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: config.jwt.refresh.secret,
        signOptions: {
          expiresIn: config.jwt.refresh.time,
        },
      }),
    }),
  ],
  providers: [GuardService, TokenService],
  exports: [GuardService, TokenService],
})
export class GuardModule {}
