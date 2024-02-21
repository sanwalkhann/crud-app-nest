import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './schemas/contact.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: mongoose.Model<Contact>,
  ) {}

  //Getting all contacts
  async findAll(): Promise<Contact[]> {
    const contacts = await this.contactModel.find();
    return contacts;
  }

  //Creating a contact
  async create(contact: Contact): Promise<Contact> {
    try {
      const existingContact = await this.contactModel.findOne({
        number: contact.number,
      });
      if (existingContact) {
        throw new HttpException(
          'Phone number already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const res = await this.contactModel.create(contact);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  //Getting a contact by id
  async findById(id: String): Promise<Contact> {
    const contact = await this.contactModel.findById(id);
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  //Updating a contact
  async updateById(id: string, contact: Contact): Promise<Contact> {
    try {
      const updatedContact = await this.contactModel.findByIdAndUpdate(
        id,
        contact,
        {
          new: true,
          runValidators: true,
        },
      );

      if (!updatedContact) {
        throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
      }

      return updatedContact;
    } catch (error) {
      console.error(error);

      if (error.name === 'ValidationError') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //Deleting a contact
  async deleteById(id: string): Promise<Contact> {
    try {
      const deletedContact = await this.contactModel.findByIdAndDelete(id);
      return deletedContact;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
