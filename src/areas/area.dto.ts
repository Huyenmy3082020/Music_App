import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AreaStatus, AreaType } from './area.entity';
export class FloorDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  floor: number;

  @ApiProperty({ example: 500 })
  @IsNumber()
  floorArea: number;

  @ApiProperty({ example: null, required: false })
  @IsOptional()
  @IsUUID()
  id?: string | null;
}

export class CreateAreaDto {
  @ApiProperty({ example: 'Main Building' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: AreaType.Reinforced_Concrete, enum: AreaType })
  @IsEnum(AreaType)
  areaType: AreaType;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  areaSize: number;

  @ApiProperty({ example: 2020 })
  @IsNumber()
  yearBuilt: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  aboveGroundFloors: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  undergroundFloors: number;

  @ApiProperty({ example: ['floor1.png', 'floor2.png'] })
  @IsArray()
  @IsString({ each: true })
  floorPlans: string[];

  @ApiProperty({
    example: [
      { id: null, floor: 1, floorArea: 500 },
      { id: null, floor: 2, floorArea: 500 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FloorDto)
  floors: FloorDto[];

  @ApiProperty({ example: 5 })
  @IsNumber()
  floor: number;

  @ApiProperty({ example: 'ACTIVE', enum: AreaStatus })
  @IsEnum(AreaStatus)
  status: AreaStatus;
}
