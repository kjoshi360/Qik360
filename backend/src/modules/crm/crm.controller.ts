import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateContactDto } from './dto/create-contact.dto';
import { CrmService } from './crm.service';

@ApiTags('CRM')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/crm')
export class CrmController {
  constructor(private readonly service: CrmService) {}

  @Get('contacts')
  listContacts(@Query('organizationId') organizationId?: string) {
    return this.service.listContacts(organizationId);
  }

  @Post('contacts')
  createContact(@Body() body: CreateContactDto) {
    return this.service.createContact(body);
  }
}
