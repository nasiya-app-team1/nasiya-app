import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';

@Module({
  imports: [BcryptModule],
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}
