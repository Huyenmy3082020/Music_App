import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacilityCreateDto, FacilityResponse } from './dto/facility.dto';
import { Facility, FacilityStatus } from './facility.entity';
import { Organization } from '../organizations/organization.entity';
import { FamiliaContract } from './familia-contract.entity';
import { PowerContract } from './power-contract.entity';
import { FacilityRepository } from './facility.repository';
import { transMessage } from 'src/shared/trans-message';
import { AreasRepository } from '../areas/area.repository';

@Injectable()
export class FacilitiesService {
  constructor(
    private readonly facilityRepo: FacilityRepository,

    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>,

    @InjectRepository(FamiliaContract)
    private readonly familiaContractRepo: Repository<FamiliaContract>,

    @InjectRepository(PowerContract)
    private readonly powerContractRepo: Repository<PowerContract>,

    private readonly areaRepo: AreasRepository
  ) {}

  async createFacility(data: FacilityCreateDto, lang: string = 'ja'): Promise<FacilityResponse> {
    const { familiaContract, powerContract, area, ...facilityData } = data;

    const organization = await this.orgRepo.findOne({ where: { id: facilityData.organizationId } });
    if (!organization) throw new NotFoundException('ORGANIZATION.NOT_FOUND');

    const facility = this.facilityRepo.create({
      ...facilityData,
      totalArea: facilityData.totalArea || 0,
    });
    const savedFacility = await this.facilityRepo.create(await facility);

    if (familiaContract) {
      const familia = this.familiaContractRepo.create({
        ...familiaContract,
        facility: savedFacility,
      });
      await this.familiaContractRepo.save(familia);
    }

    if (powerContract) {
      const power = this.powerContractRepo.create({
        ...powerContract,
        facility: savedFacility,
      });
      await this.powerContractRepo.save(power);
    }

    if (area) {
      await this.areaRepo.save({
        ...area,
        facility: savedFacility,
      });
    }

    return {
      success: true,
      message: transMessage(lang, 'FACILITY.CREATE_SUCCESS'),
      data: savedFacility,
    };
  }

  async findOneFacility(id: string): Promise<Facility | null> {
    return this.facilityRepo.findOne(id);
  }

  async findAllFacilities(): Promise<Facility[]> {
    return this.facilityRepo.findAll();
  }
}
