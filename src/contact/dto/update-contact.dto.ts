import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../schemas/contact.schema';

export class UpdateContactDto {
  @ApiProperty({ description: 'Update Contact Name' })
  readonly name: string;

  @ApiProperty({ description: 'update Contact Number' })
  readonly number: number;

  @ApiProperty({ description: 'Update Contact Category' })
  readonly category: Category;
}
