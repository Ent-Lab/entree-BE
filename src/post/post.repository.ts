import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostRepository {
  constructor(
    @InjectQueue('message-queue') private queue: Queue,
    private readonly databaseService: DatabaseService
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const { code, title, contents, fk_user_code } = createPostDto;
      await this.databaseService.query(
        `
        INSERT INTO post
        (code, title, contents, fk_user_code)
        VALUES
        ('${code}', '${title}', '${contents}', '${fk_user_code}');
        `
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async selectAll(): Promise<any[]> {
    try {
      return this.databaseService.query(
        `
        select * from post;
        `,
        'r'
      );
    } catch (error) {
      throw error;
    }
  }

  async selectOne(id: number): Promise<any> {
    try {
      const row = await this.databaseService.query(
        `
        select * from post where id = '${id}';
        `,
        'r'
      );
      return row[0];
    } catch (error) {
      throw error;
    }
  }

  async selectByUser(userCode: string): Promise<any> {
    try {
      const row = this.databaseService.query(
        `
        select * from post where fk_user_code = '${userCode}';
        `,
        'r'
      );
      return row[0];
    } catch (error) {
      throw error;
    }
  }

  async selectByTitle(title: string): Promise<any> {
    try {
      const row = await this.databaseService.query(
        `
        select * from post where title like '%${title}%';
        `,
        'r'
      );
      return row[0];
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      await this.databaseService.query(
        `
        UPDATE post
        SET (title='${updatePostDto.title}', contents='${updatePostDto.contents}')
        WHERE id=${id};
        `
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    await this.databaseService.query(`
    DELETE FROM post
    WHERE id=${id};
    `);
    return true;
    try {
    } catch (error) {
      throw error;
    }
  }
}
