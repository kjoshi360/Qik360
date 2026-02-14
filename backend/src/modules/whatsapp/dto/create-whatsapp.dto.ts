import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateWhatsappDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
