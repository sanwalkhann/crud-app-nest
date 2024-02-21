import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  OFFICE = 'Office',
  PERSONAL = 'Personal',
}

@Schema({
  timestamps: true,
})
export class Contact {
  @Prop()
  name: string;

  @Prop({ unique: true })
  number: number;

  @Prop()
  category: Category;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
