import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateConversationsDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
