import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../schemas/contact.schema';

export class CreateContactDto {
  @ApiProperty({ description: 'Contact Name' })
  readonly name: string;

  @ApiProperty({ description: 'Contact Number' })
  readonly number: number;

  @ApiProperty({ description: 'Contact Category' })
  readonly category: Category;
}
