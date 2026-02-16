import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateWebhookDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
