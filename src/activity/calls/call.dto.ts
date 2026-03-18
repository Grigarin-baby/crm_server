import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum CallType {
  INCOMING = 'INCOMING',
  OUTGOING = 'OUTGOING',
}

export class CreateCallDto {
  @ApiProperty({ enum: CallType })
  @IsEnum(CallType)
  @IsNotEmpty()
  callType: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  contactId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  dealId?: string;
}

export class UpdateCallDto {
  @ApiProperty({ enum: CallType, required: false })
  @IsOptional()
  @IsEnum(CallType)
  callType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contactId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  dealId?: string;
}
