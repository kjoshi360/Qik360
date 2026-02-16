import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateBillingDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
