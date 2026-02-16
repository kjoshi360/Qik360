import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsService } from './permissions.service';

@ApiTags('Permissions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/permissions')
export class PermissionsController {
  constructor(private readonly service: PermissionsService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.service.findAll(req.tenant?.id ?? req.user?.tenantId);
  }

  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.service.create(req.tenant?.id ?? req.user?.tenantId, body);
  }
}
