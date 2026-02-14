import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreatePermissionsDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
