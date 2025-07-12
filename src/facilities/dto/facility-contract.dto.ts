import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
  IsArray,
  IsInt,
  Min,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  FamiliaContract,
  FamiliaContractInstallationMethod,
  FamiliaContractPlan,
} from '../familia-contract.entity';

export class CreateFamiliaContractDto {
  @ApiProperty({ example: 'STANDARD' })
  @IsNotEmpty()
  @IsString()
  contractPlan: FamiliaContractPlan;

  @ApiProperty({ example: '2024-01-01' })
  @IsNotEmpty()
  @IsDateString()
  contractStartDate: Date;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @IsNumber()
  contractDuration?: number;

  @ApiPropertyOptional({ example: ['Option1', 'Option2'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  contractOptions?: string[];

  @ApiProperty({ example: 10000 })
  @IsNotEmpty()
  @IsNumber()
  monthlyFee: number;

  @ApiPropertyOptional({ example: 'Remark notes here' })
  @IsOptional()
  @IsString()
  contractRemarks?: string;

  @ApiProperty({ example: 5 })
  @IsNotEmpty()
  @IsNumber()
  terminalNumber: number;

  @ApiPropertyOptional({ example: 'Wall mount' })
  @IsOptional()
  @IsString()
  installationMethod?: FamiliaContractInstallationMethod;

  @ApiPropertyOptional({ example: 'Connected to device XYZ' })
  @IsOptional()
  @IsString()
  connectedDeviceMemo?: string;
}
