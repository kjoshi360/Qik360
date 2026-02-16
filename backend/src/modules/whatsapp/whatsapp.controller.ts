import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
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
}
