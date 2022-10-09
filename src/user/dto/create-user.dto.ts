import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { UserVo } from '../vo/user.vo';

export class CreateUserDto extends PickType(UserVo, [
  'code',
  'login_type',
  'email',
  'password',
  'role',
]) {
  @ApiProperty({ description: 'user code', example: 'asdsafs123134' })
  @IsString()
  code: string;

  @IsString()
  login_type: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;
}
