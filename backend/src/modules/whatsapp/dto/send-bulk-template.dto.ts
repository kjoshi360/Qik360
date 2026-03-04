import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class TemplateParameterDto {
  @IsString()
  text!: string;
}

class RecipientTemplateMessageDto {
  @IsPhoneNumber(undefined)
  to!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TemplateParameterDto)
  parameters!: TemplateParameterDto[];
}

export class SendBulkTemplateDto {
  @IsString()
  phoneNumberId!: string;

  @IsString()
  accessToken!: string;

  @IsString()
  templateName!: string;

  @IsString()
  languageCode!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10000)
  @ValidateNested({ each: true })
  @Type(() => RecipientTemplateMessageDto)
  recipients!: RecipientTemplateMessageDto[];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(80)
  throttlePerSecond?: number;
}

export type RecipientTemplateMessage = RecipientTemplateMessageDto;
