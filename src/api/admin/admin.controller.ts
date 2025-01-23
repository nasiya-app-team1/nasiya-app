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
import { RoleAdmin } from 'src/common/enum';
import { RefreshDto } from './dto/refresh_token-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Post('super-admin')
  createSuperAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto, RoleAdmin.SUPERADMIN);
  }

  @Public()
  @Post('admin')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto, RoleAdmin.ADMIN);
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
  updateToken(@Body() refreshDto: RefreshDto) {
    return this.adminService.refreshToken(refreshDto);
  }

  @Post('logout')
  logout(
    @Body() refreshDto: RefreshDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshDto, res);
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
