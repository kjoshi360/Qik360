import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
