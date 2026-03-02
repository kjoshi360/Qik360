import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class CrmService {
  private readonly contacts: Contact[] = [];

  listContacts(organizationId?: string) {
    return this.contacts.filter((contact) => !organizationId || contact.organizationId === organizationId);
  }

  createContact(input: CreateContactDto): Contact {
    const contact: Contact = {
      id: `contact_${this.contacts.length + 1}`,
      ...input,
    };

    this.contacts.push(contact);

    return contact;
  }
}
