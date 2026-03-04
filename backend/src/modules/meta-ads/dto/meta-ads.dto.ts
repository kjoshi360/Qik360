import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class CampaignInsightsDto {
  @IsString()
  adAccountId!: string;

  @IsString()
  accessToken!: string;

  @IsOptional()
  @IsString()
  level?: string;

  @IsOptional()
  @IsString()
  datePreset?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fields?: string[];
}

export class CreateCampaignDto {
  @IsString()
  adAccountId!: string;

  @IsString()
  accessToken!: string;

  @IsString()
  name!: string;

  @IsString()
  objective!: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsObject()
  extra?: Record<string, unknown>;
}

export class CreateAdSetDto {
  @IsString()
  adAccountId!: string;

  @IsString()
  accessToken!: string;

  @IsObject()
  params!: Record<string, unknown>;
}

export class CreateAdCreativeDto {
  @IsString()
  adAccountId!: string;

  @IsString()
  accessToken!: string;

  @IsObject()
  params!: Record<string, unknown>;
}

export class CreateAdDto {
  @IsString()
  adAccountId!: string;

  @IsString()
  accessToken!: string;

  @IsObject()
  params!: Record<string, unknown>;
}

export class CreateCustomAudienceDto {
  @IsString()
  adAccountId!: string;

  @IsString()
  accessToken!: string;

  @IsObject()
  params!: Record<string, unknown>;
}

export class AddUsersToAudienceDto {
  @IsString()
  audienceId!: string;

  @IsString()
  accessToken!: string;

  @IsObject()
  payload!: Record<string, unknown>;
}

export class CheckAudienceTosDto {
  @IsString()
  adAccountId!: string;

  @IsString()
  accessToken!: string;
}
