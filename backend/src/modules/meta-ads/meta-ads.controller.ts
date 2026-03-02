import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { MetaAdsLeadEvent, MetaAdsService } from './meta-ads.service';

@ApiTags('Meta Ads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/meta-ads')
export class MetaAdsController {
  constructor(private readonly service: MetaAdsService) {}

  @Get('leads')
  listLeads() {
    return this.service.listLeads();
  }

  @Post('leads')
  ingestLead(@Body() payload: MetaAdsLeadEvent) {
    return this.service.ingestLead(payload);
  }
}
