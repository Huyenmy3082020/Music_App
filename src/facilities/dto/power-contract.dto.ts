import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDateString, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePowerContractDto {
  @ApiProperty({ example: 'Provider ABC' }) // Thêm trường providerName này
  @IsNotEmpty()
  @IsString()
  providerName: string;

  @ApiProperty({ example: 'Basic_Plan' })
  @IsNotEmpty()
  @IsString()
  contractPlan: string;

  @ApiProperty({ example: '2025-01-01' })
  @IsNotEmpty()
  @IsDateString()
  contractStartDate: Date;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @IsNumber()
  contractDuration?: number;
  @ApiProperty({ example: 500 })
  @IsNotEmpty()
  @IsNumber()
  contractedPower: number;

  @ApiPropertyOptional({ example: ['Option1', 'Option2'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  contractOptions?: string[];

  @ApiProperty({ example: 1000 })
  @IsNotEmpty()
  @IsNumber()
  monthlyFee: number;

  @ApiPropertyOptional({ example: 'This is a remark' })
  @IsOptional()
  @IsString()
  contractRemarks?: string;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @IsNumber()
  terminalNumber: number;

  @ApiPropertyOptional({ example: 'Self-installed' })
  @IsOptional()
  @IsString()
  installationMethod?: string;

  @ApiPropertyOptional({ example: 'Connected to XYZ device' })
  @IsOptional()
  @IsString()
  connectedDeviceMemo?: string;
}
