import { Controller, HttpCode, HttpStatus, Post, Req, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { ErrorResponse } from 'src/base/common.response';
import { OrganizationCreateDto } from '../organizations/organization.dto'; // giả sử bạn có dto này
import { Request } from 'express';
import { Public } from 'src/decorator/public.decorator';
import { FacilityCreateDto, FacilityResponse } from './dto/facility.dto';
import { FacilitiesService } from './facility.service';

@ApiTags('facility')
@Controller('facility')
export class FacilitiesController {
  constructor(private readonly facilityService: FacilitiesService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiCookieAuth('accessToken')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create a new facility',
    type: FacilityResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
    type: ErrorResponse,
  })
  @ApiOperation({
    operationId: 'createFacility',
    description: 'Create a new facility',
  })
  async createFacility(
    @Req() req: Request,
    @Body() data: FacilityCreateDto
  ): Promise<FacilityResponse> {
    console.log('Creating facility with data:', data);
    const lang = (req.headers['accept-language'] as string) || 'ja';
    return this.facilityService.createFacility(data, lang);
  }
}
