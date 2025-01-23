import { PartialType } from '@nestjs/swagger';
import { CreateStoreDto } from './create-store.dto';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  login?: string;
  password?: string;
  wallet?: number;
  image?: string;
  is_active?: boolean;
  email?: string;
  pass_code?: string;
  phone_number?: string;
}
