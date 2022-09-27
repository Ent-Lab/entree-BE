import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt();

      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
      return this.userRepository.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.userRepository.selectAll();
  }

  findOne(id: number) {
    try {
      return this.userRepository.selectOneById(id);
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
