import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import {
  AddUsersToAudienceDto,
  CampaignInsightsDto,
  CheckAudienceTosDto,
  CreateAdCreativeDto,
  CreateAdDto,
  CreateAdSetDto,
  CreateCampaignDto,
  CreateCustomAudienceDto,
} from './dto/meta-ads.dto';
import { MetaAdsService } from './meta-ads.service';

@ApiTags('Meta Ads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/meta-ads')
export class MetaAdsController {
  constructor(private readonly service: MetaAdsService) {}

  @Post('insights')
  getInsights(@Body() body: CampaignInsightsDto) {
    return this.service.getCampaignInsights(body);
  }

  @Post('campaigns')
  createCampaign(@Body() body: CreateCampaignDto) {
    return this.service.createCampaign(body);
  }

  @Post('adsets')
  createAdSet(@Body() body: CreateAdSetDto) {
    return this.service.createAdSet(body);
  }

  @Post('adcreatives')
  createAdCreative(@Body() body: CreateAdCreativeDto) {
    return this.service.createAdCreative(body);
  }

  @Post('ads')
  createAd(@Body() body: CreateAdDto) {
    return this.service.createAd(body);
  }

  @Post('custom-audiences')
  createCustomAudience(@Body() body: CreateCustomAudienceDto) {
    return this.service.createCustomAudience(body);
  }

  @Post('custom-audiences/users')
  addUsersToAudience(@Body() body: AddUsersToAudienceDto) {
    return this.service.addUsersToAudience(body);
  }

  @Post('custom-audiences/tos')
  checkAudienceTos(@Body() body: CheckAudienceTosDto) {
    return this.service.checkAudienceTos(body);
  }
}
