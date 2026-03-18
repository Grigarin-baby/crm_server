import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSalesOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orderNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  quoteId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  orderStatus?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  customerId?: string;
}

export class UpdateSalesOrderDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  orderNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  quoteId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  orderStatus?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  customerId?: string;
}
