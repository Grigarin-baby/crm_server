import {
  IsString,
  IsOptional,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  priority?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  assignedUserId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  dealId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  customerId?: string;
}

export class UpdateTaskDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  priority?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  assignedUserId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  dealId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  customerId?: string;
}
