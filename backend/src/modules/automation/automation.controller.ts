import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AutomationService } from './automation.service';

@ApiTags('Automation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/automation')
export class AutomationController {
  constructor(private readonly service: AutomationService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.service.findAll(req.tenant?.id ?? req.user?.tenantId);
  }

  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.service.create(req.tenant?.id ?? req.user?.tenantId, body);
  }
}
