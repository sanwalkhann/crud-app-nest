import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('contacts')
@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all contacts',
    description: 'Retrieve a list of all contacts',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all contacts',
    type: Contact,
    isArray: true,
  })
  async getAllContacts(): Promise<Contact[]> {
    return this.contactService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new contact' })
  @ApiBody({ type: CreateContactDto })
  @ApiResponse({ status: 201, description: 'Contact created', type: Contact })
  async createContact(
    @Body()
    contact: CreateContactDto,
  ): Promise<Contact> {
    return this.contactService.create(contact);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get contact by ID' })
  @ApiParam({ name: 'id', description: 'Contact ID' })
  @ApiResponse({ status: 200, description: 'Contact details', type: Contact })
  @ApiResponse({ status: 404, description: 'Contact not found' })
  async getContact(
    @Param('id')
    id: string,
  ): Promise<Contact> {
    return this.contactService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update contact by ID' })
  @ApiParam({ name: 'id', description: 'Contact ID' })
  @ApiBody({ type: UpdateContactDto })
  @ApiResponse({ status: 200, description: 'Contact updated', type: Contact })
  @ApiResponse({ status: 404, description: 'Contact not found' })
  async updateContact(
    @Param('id')
    id: string,
    @Body()
    contact: UpdateContactDto,
  ): Promise<Contact> {
    return this.contactService.updateById(id, contact);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete contact by ID' })
  @ApiParam({ name: 'id', description: 'Contact ID' })
  @ApiResponse({ status: 204, description: 'Contact deleted' })
  @ApiResponse({ status: 404, description: 'Contact not found' })
  async deleteContact(
    @Param('id')
    id: string,
  ): Promise<Contact> {
    return this.contactService.deleteById(id);
  }
}
