import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  tenantName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsEnum(['OWNER', 'MANAGER', 'AGENT'])
  role!: 'OWNER' | 'MANAGER' | 'AGENT';
}
