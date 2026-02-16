import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { WebhookService } from './webhook.service';

@ApiTags('Webhook')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/webhook')
export class WebhookController {
  constructor(private readonly service: WebhookService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.service.findAll(req.tenant?.id ?? req.user?.tenantId);
  }

  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.service.create(req.tenant?.id ?? req.user?.tenantId, body);
  }
}
