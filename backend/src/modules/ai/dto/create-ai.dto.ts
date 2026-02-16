import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateAiDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
