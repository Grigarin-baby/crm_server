import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuoteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  quoteNumber: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  validUntil?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dealId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  customerId?: string;
}

export class UpdateQuoteDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  quoteNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  validUntil?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  dealId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  customerId?: string;
}
