import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from 'src/core/entities/user.entity';
import { BcryptModule } from 'src/infrastructure/bcrypt/bcrypt.module';
import { GuardService } from 'src/common/guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { GuardModule } from 'src/common/guard/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    GuardModule,
    BcryptModule,
    UsersModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: GuardService,
    },
  ],
  exports: [ConfigService],
})
export class AppModule {}
