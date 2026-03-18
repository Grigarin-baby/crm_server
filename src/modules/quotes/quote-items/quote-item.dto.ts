import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuoteItemDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty()
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  tax?: number;

  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  quoteId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: string;
}

export class UpdateQuoteItemDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  unitPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  tax?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  total?: number;
}
