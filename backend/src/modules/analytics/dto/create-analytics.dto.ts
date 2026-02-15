import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateAnalyticsDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
