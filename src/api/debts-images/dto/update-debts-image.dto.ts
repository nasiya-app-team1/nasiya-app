import { PartialType } from '@nestjs/swagger';
import { CreateDebtsImageDto } from './create-debts-image.dto';

export class UpdateDebtsImageDto extends PartialType(CreateDebtsImageDto) {}
