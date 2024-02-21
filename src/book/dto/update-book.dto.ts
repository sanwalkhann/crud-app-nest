import { IsEmpty } from 'class-validator';
import { Category } from '../schemas/book.schema';
import { User } from '../../auth/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({ description: 'Update book title' })
  readonly title: string;

  @ApiProperty({ description: 'update book description' })
  readonly description: string;

  @ApiProperty({ description: 'update book author' })
  readonly author: string;

  @ApiProperty({ description: 'update book price' })
  readonly price: number;

  @ApiProperty({ description: 'update book category' })
  readonly category: Category;

  @ApiProperty({ description: 'update book user' })
  readonly user: User;
}
