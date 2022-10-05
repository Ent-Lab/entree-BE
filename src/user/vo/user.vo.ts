import { IsString, IsEmail, IsNumber, IsDate } from 'class-validator';

export class UserVo {
  @IsString()
  code: string;

  @IsString()
  login_type: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  role: number;

  @IsDate()
  created_time: Date;

  @IsDate()
  updated_time: Date;
}
