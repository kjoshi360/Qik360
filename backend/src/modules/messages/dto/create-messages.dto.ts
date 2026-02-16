import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateMessagesDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
