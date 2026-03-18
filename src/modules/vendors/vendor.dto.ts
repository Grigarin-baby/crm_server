import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVendorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateVendorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
