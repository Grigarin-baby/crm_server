import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  salesOrderId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  invoiceDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  customerId?: string;
}

export class UpdateInvoiceDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  salesOrderId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  invoiceDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  customerId?: string;
}
