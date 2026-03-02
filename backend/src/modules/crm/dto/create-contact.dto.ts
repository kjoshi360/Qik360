import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  organizationId!: string;

  @IsString()
  name!: string;

  @IsString()
  phone!: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
