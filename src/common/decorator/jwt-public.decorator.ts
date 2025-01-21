import { SetMetadata } from '@nestjs/common';
import { config } from 'src/config/config.service';

export const PUBLIC_KEY = config.jwt.public_key;
export const Public = () => SetMetadata(PUBLIC_KEY, true);
