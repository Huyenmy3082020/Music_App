import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommonResponse, PaginateResponse } from 'src/base/common.response';
import { FacilityStatus, FacilityType } from '../facility.entity';
import { Type } from 'class-transformer';
import { CreateFamiliaContractDto } from './facility-contract.dto';
import { CreatePowerContractDto } from './power-contract.dto';
import { CreateAreaDto } from 'src/modules/areas/area.dto';

class FacilityCreateDto {
  @ApiProperty({ example: 'Main Warehouse', description: 'Tên cơ sở' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123 Main St, District 1', description: 'Địa chỉ cơ sở' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    enum: FacilityType,
    example: FacilityType.WAREHOUSE,
    description: 'Loại cơ sở',
    required: false,
  })
  @IsOptional()
  @IsEnum(FacilityType)
  facilityType?: FacilityType;

  @ApiProperty({
    example: 5000,
    description: 'Tổng diện tích cơ sở (m2)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalArea?: number;

  @ApiProperty({ example: 'FAC-001', description: 'Mã định danh cơ sở' })
  @IsString()
  @IsNotEmpty()
  facilityCode: string;

  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Tên người liên hệ',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  contactName?: string | null;

  @ApiProperty({ example: '+84901234567', description: 'Số điện thoại liên hệ' })
  @IsString()
  @IsNotEmpty()
  contactPhone: string;

  @ApiProperty({ example: 'facility@example.com', description: 'Email liên hệ' })
  @IsString()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    type: String,
    example: 'service-plan-id-123',
    description: 'Postal code',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  postalCode?: string | null;

  @ApiProperty({ example: 'Hồ Chí Minh', description: 'Tỉnh/Thành phố', required: false })
  @IsOptional()
  @IsString()
  province?: string;

  @ApiProperty({ example: 'Quận 1', description: 'Quận/Huyện', required: false })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({ example: 'Cơ sở chính quản lý hàng hóa', description: 'Ghi chú', required: false })
  @IsOptional()
  @IsString()
  remarks?: string;

  @ApiProperty({
    example: '8b5b3f85-66bf-4b90-9070-f7ebaacd46ba',
    description: 'ID tổ chức sở hữu',
  })
  @IsUUID()
  organizationId: string;

  @ApiProperty({ type: CreateFamiliaContractDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateFamiliaContractDto)
  familiaContract?: CreateFamiliaContractDto;

  @ApiProperty({ type: CreatePowerContractDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePowerContractDto)
  powerContract?: CreatePowerContractDto;

  @ApiProperty({ type: CreateAreaDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAreaDto)
  area?: CreateAreaDto;
}
class FacilityDto {
  @ApiProperty({ example: 'uuid-facility-123' })
  id: string;

  @ApiProperty({ example: 'Main Warehouse' })
  name: string;

  @ApiProperty({ example: '123 Main St, District 1' })
  address: string;

  @ApiProperty({ enum: FacilityType })
  facilityType: FacilityType;

  @ApiProperty({ example: 5000 })
  totalArea: number;

  @ApiProperty({ example: 'FAC-001' })
  facilityCode: string;

  @ApiProperty({ example: 'Nguyễn Văn A', required: false })
  contactName?: string | null;

  @ApiProperty({ example: '+84901234567' })
  contactPhone: string;
  @ApiProperty({
    type: String,
    example: 'service-plan-id-123',
    description: 'Postal code',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  postalCode?: string | null;

  @ApiProperty({
    type: String,
    example: 'service-plan-id-123',
    description: 'ID of the service plan associated with the organization',
    required: true,
  })
  @ApiProperty({ example: 'Hồ Chí Minh', required: false })
  province?: string | null;

  @ApiProperty({ example: 'Quận 1', required: false })
  district?: string | null;

  @ApiProperty({ example: 'Ghi chú về cơ sở', required: false })
  remarks?: string | null;

  @ApiProperty({ enum: FacilityStatus })
  status: FacilityStatus;

  @ApiProperty({ type: CreateFamiliaContractDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateFamiliaContractDto)
  familiaContract?: CreateFamiliaContractDto;

  @ApiProperty({ type: CreatePowerContractDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePowerContractDto)
  powerContract?: CreatePowerContractDto;

  @ApiProperty({ type: CreateAreaDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAreaDto)
  area?: CreateAreaDto;

  @ApiProperty({ example: '8b5b3f85-66bf-4b90-9070-f7ebaacd46ba' })
  organizationId: string;
}

class FacilityGetListDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({ example: 'Main', required: false })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiProperty({ enum: FacilityStatus, example: FacilityStatus.ACTIVE, required: false })
  @IsOptional()
  @IsEnum(FacilityStatus)
  status?: FacilityStatus;

  @ApiProperty({ example: '8b5b3f85-66bf-4b90-9070-f7ebaacd46ba', required: false })
  @IsOptional()
  @IsUUID()
  organizationId?: string;

  @ApiProperty({ enum: ['ASC', 'DESC'], example: 'ASC', required: false })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  orderType?: 'ASC' | 'DESC' = 'ASC';

  @ApiProperty({ example: 'name', required: false })
  @IsOptional()
  @IsString()
  orderBy?: string;
}

class FacilityResponse extends CommonResponse<FacilityDto> {
  @ApiProperty({ type: FacilityDto })
  declare data: FacilityDto;
}

class FacilityGetListResponse extends PaginateResponse<FacilityDto> {
  @ApiProperty({ type: [FacilityDto] })
  declare data: FacilityDto[];
}

export {
  FacilityCreateDto,
  FacilityDto,
  FacilityGetListDto,
  FacilityResponse,
  FacilityGetListResponse,
};
