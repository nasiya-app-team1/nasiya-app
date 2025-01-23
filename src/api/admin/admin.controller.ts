import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Response } from 'express';
import { Public } from 'src/common/decorator/jwt-public.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Post('super-admin')
  createSuperAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createSuperAdmin(createAdminDto);
  }

  @Public()
  @Post('admin')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Public()
  @Post('login')
  login(
    @Body() loginDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginDto, res);
  }

  @Post('refresh-token')
  updateToken(refresh_token: string) {
    return this.adminService.refreshToken(refresh_token);
  }

  @Post('logout')
  logout(refresh_token: string, @Res({ passthrough: true }) res: Response) {
    return this.adminService.logout(refresh_token, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
