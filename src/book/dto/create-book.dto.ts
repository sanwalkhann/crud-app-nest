import { User } from 'src/auth/schemas/user.schema';
import { Category } from '../schemas/book.schema';
import { IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ description: 'The title of the book' })
  readonly title: string;

  @ApiProperty({ description: 'The description of the book' })
  readonly description: string;

  @ApiProperty({ description: 'The category of the book' })
  readonly author: string;

  @ApiProperty({ description: 'The price of the book' })
  readonly price: number;
  readonly category: Category;

  @IsEmpty({ message: 'Enter user Id' })
  readonly user: User;
}
