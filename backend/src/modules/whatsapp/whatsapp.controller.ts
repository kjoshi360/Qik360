import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { SendBulkTemplateDto } from './dto/send-bulk-template.dto';
import { WhatsappService } from './whatsapp.service';

@ApiTags('Whatsapp')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/whatsapp')
export class WhatsappController {
  constructor(private readonly service: WhatsappService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.service.findAll(req.tenant?.id ?? req.user?.tenantId);
  }

  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.service.create(req.tenant?.id ?? req.user?.tenantId, body);
  }

  @Post('bulk-template')
  sendBulkTemplate(@Body() body: SendBulkTemplateDto) {
    return this.service.sendBulkTemplate(
      body.phoneNumberId,
      body.accessToken,
      body.templateName,
      body.languageCode,
      body.recipients,
      body.throttlePerSecond,
    );
  }
}
