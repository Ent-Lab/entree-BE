import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { UsefulService } from '../useful/useful.service';
import { GetPostDto } from './dto/get-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userfulService: UsefulService
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      createPostDto.code = await this.userfulService.genCode();
      return this.postRepository.create(createPostDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return this.postRepository.selectAll();
    } catch (error) {
      throw error;
    }
  }

  async findOne(code: string): Promise<GetPostDto> {
    try {
      return this.postRepository.selectByCode(code);
    } catch (error) {
      throw error;
    }
  }

  async findByUser(userCode: string): Promise<GetPostDto> {
    try {
      return this.postRepository.selectByUser(userCode);
    } catch (error) {
      throw error;
    }
  }

  async update(userCode: string, code: string, updatePostDto: UpdatePostDto) {
    try {
      const post: GetPostDto = await this.postRepository.selectByCode(code);
      if (post.fk_user_code !== userCode) {
        throw new ForbiddenException('자신의 정보만 수정할 수 있습니다.');
      }
      updatePostDto.title = updatePostDto.title
        ? updatePostDto.title
        : post.title;
      updatePostDto.contents = updatePostDto.contents
        ? updatePostDto.contents
        : post.contents;
      return this.postRepository.update(code, updatePostDto);
    } catch (error) {
      throw error;
    }
  }

  remove(code: string) {
    return `This action removes a #${code} post`;
  }
}
