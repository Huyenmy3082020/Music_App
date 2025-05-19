import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { storageConfig } from 'helper/config';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateDTO';
import {  AuthGuard } from 'src/auth/auth.guard';
import { Admin } from 'typeorm';
import { imageFileFilter } from 'helper/file-filter.util';

@Controller('user')
export class UserController {



  constructor(
    private readonly userService: UserService, 
  ) { }

  @UseGuards(AuthGuard)
  @Get('getAll')
  async getAllUser(@Req() req: any) {
    const data = await this.userService.findAll()
    return data
  
  }
  @UseGuards(AuthGuard)
  @Get('getUser/:id') 
  async getUser(@Param('id') id: number) {
    const data = await this.userService.findOne(id);
    return data;
  }
  @UseGuards(AuthGuard)
  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: storageConfig('avatar'),
    fileFilter: imageFileFilter,
  }))
  async uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
  
    return this.userService.updateAvatar(req.user_data.id, file.destination + '/' + file.filename);
  }
  @UseGuards(AuthGuard)
  @Post('update-user')
  async updateUser(@Body() UpdateUserDto:UpdateUserDto, @Req() req: any) {
    const id = req.user_data.id
    const data = await this.userService.updateUser(id, UpdateUserDto)
    return data
  }
  @UseGuards(AuthGuard)
  @Delete('delete-user')
  async deleteUser(@Req() req: any) {
    const id = req.user_data.id
    const data = await this.userService.deleteUser(id)
    return data
  }
}
