import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
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

@Injectable()
export class MetaAdsService {
  constructor(private readonly config: ConfigService) {}

  private baseUrl() {
    return this.config.get<string>('app.metaApiUrl') ?? 'https://graph.facebook.com/v21.0';
  }

  async getCampaignInsights(payload: CampaignInsightsDto) {
    const response = await axios.get(`${this.baseUrl()}/act_${payload.adAccountId}/insights`, {
      params: {
        access_token: payload.accessToken,
        level: payload.level ?? 'campaign',
        date_preset: payload.datePreset ?? 'last_30d',
        fields: (payload.fields ?? ['campaign_name', 'impressions', 'clicks', 'spend', 'actions']).join(','),
      },
    });

    return response.data;
  }

  async createCampaign(payload: CreateCampaignDto) {
    const response = await axios.post(`${this.baseUrl()}/act_${payload.adAccountId}/campaigns`, null, {
      params: {
        access_token: payload.accessToken,
        name: payload.name,
        objective: payload.objective,
        status: payload.status ?? 'PAUSED',
        ...(payload.extra ?? {}),
      },
    });

    return response.data;
  }

  async createAdSet(payload: CreateAdSetDto) {
    const response = await axios.post(`${this.baseUrl()}/act_${payload.adAccountId}/adsets`, null, {
      params: {
        access_token: payload.accessToken,
        ...(payload.params ?? {}),
      },
    });
    return response.data;
  }

  async createAdCreative(payload: CreateAdCreativeDto) {
    const response = await axios.post(`${this.baseUrl()}/act_${payload.adAccountId}/adcreatives`, null, {
      params: {
        access_token: payload.accessToken,
        ...(payload.params ?? {}),
      },
    });
    return response.data;
  }

  async createAd(payload: CreateAdDto) {
    const response = await axios.post(`${this.baseUrl()}/act_${payload.adAccountId}/ads`, null, {
      params: {
        access_token: payload.accessToken,
        ...(payload.params ?? {}),
      },
    });
    return response.data;
  }

  async createCustomAudience(payload: CreateCustomAudienceDto) {
    const response = await axios.post(`${this.baseUrl()}/act_${payload.adAccountId}/customaudiences`, null, {
      params: {
        access_token: payload.accessToken,
        ...(payload.params ?? {}),
      },
    });
    return response.data;
  }

  async addUsersToAudience(payload: AddUsersToAudienceDto) {
    const response = await axios.post(`${this.baseUrl()}/${payload.audienceId}/users`, payload.payload, {
      params: {
        access_token: payload.accessToken,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }

  async checkAudienceTos(payload: CheckAudienceTosDto) {
    const response = await axios.get(`${this.baseUrl()}/act_${payload.adAccountId}`, {
      params: {
        access_token: payload.accessToken,
        fields: 'tos_accepted',
      },
    });
    return response.data;
  }
}
