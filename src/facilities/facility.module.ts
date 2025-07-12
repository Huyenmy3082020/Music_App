import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Facility } from './facility.entity';
import { PowerContract } from './power-contract.entity';
import { FamiliaContract } from './familia-contract.entity';
import { Organization } from '../organizations/organization.entity';
import { Area } from '../areas/area.entity';

import { FacilityRepository } from './facility.repository';
import { AreasRepository } from '../areas/area.repository';

import { FacilitiesController } from './facility.controller';
import { FacilitiesService } from './facility.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Facility,
      PowerContract,
      FamiliaContract,
      Organization,
      Area, // cần import nếu dùng AreasRepository
    ]),
  ],
  providers: [FacilitiesService, FacilityRepository, AreasRepository],
  controllers: [FacilitiesController],
  exports: [FacilityRepository],
})
export class FacilitiesModule {}
