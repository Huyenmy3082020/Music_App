import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facility, FacilityStatus } from './facility.entity';
import { Organization } from '../organizations/organization.entity';
import { FacilityCreateDto } from './dto/facility.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class FacilityRepository {
  constructor(
    @InjectRepository(Facility)
    private readonly facilityRepo: Repository<Facility>,

    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>,
    private readonly logger: Logger
  ) {}

  x;

  async create(dto: Partial<Facility>): Promise<Facility> {
    const organization = await this.orgRepo.findOne({
      where: { id: dto.organizationId },
    });

    if (!organization) {
      throw new NotFoundException('ORGANIZATION.NOT_FOUND');
    }
    this.logger.log(`Creating facility with facilityCode: ${dto.organizationId}`);

    const facility = this.facilityRepo.create({
      ...dto,
      organization,
      totalArea: 0,
      status: FacilityStatus.ACTIVE,
    });

    return this.facilityRepo.save(facility);
  }

  async findOne(id: string): Promise<Facility | null> {
    return this.facilityRepo.findOne({ where: { id } });
  }

  async findAll(): Promise<Facility[]> {
    return this.facilityRepo.find();
  }
}
