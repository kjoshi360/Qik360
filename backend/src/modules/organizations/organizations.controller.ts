import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { OrganizationsService } from './organizations.service';

@ApiTags('Organizations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/organizations')
export class OrganizationsController {
  constructor(private readonly service: OrganizationsService) {}

  @Get()
  list(@Req() req: any) {
    return this.service.findAll(req.user?.tenantId);
  }

  @Post()
  create(@Req() req: any, @Body() body: { name: string; code: string }) {
    return this.service.create({
      ...body,
      ownerTenantId: req.user?.tenantId,
    });
  }
}
