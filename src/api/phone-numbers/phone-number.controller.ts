import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhoneNumbersService } from './phone-numbers.service';
import { CreatePhoneNumberDto } from './dto/create-phone-number.dto';
import { UpdatePhoneNumberDto } from './dto/update-phone-number.dto';

@Controller('phone-numbers')
export class PhoneNumbersController {
  constructor(private readonly phoneNumbersService: PhoneNumbersService) {}

  @Post('create')
  create(@Body() createPhoneNumberDto: CreatePhoneNumberDto) {
    return this.phoneNumbersService.create(createPhoneNumberDto);
  }

  @Get('all')
  findAll() {
    return this.phoneNumbersService.findAll();
  }

  @Get('debtor/:id')
  findUserNumbers(@Param('id') id: string) {
    return this.phoneNumbersService.findOneByUserId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phoneNumbersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePhoneNumberDto: UpdatePhoneNumberDto,
  ) {
    return this.phoneNumbersService.updateNumber(id, updatePhoneNumberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phoneNumbersService.deleteNumberById(id);
  }
}
