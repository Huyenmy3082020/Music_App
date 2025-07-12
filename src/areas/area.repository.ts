import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './area.entity';
import { Facility } from '../facilities/facility.entity';
@Injectable()
export class AreasRepository {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepo: Repository<Area>,

    @InjectRepository(Facility)
    private readonly facilityRepo: Repository<Facility>
  ) {}

  async save(data: Partial<Area>): Promise<Area> {
    const facility = await this.facilityRepo.findOne({ where: { id: data.facilityId } });
    if (!facility) {
      throw new NotFoundException('FACILITY.NOT_FOUND');
    }

    const area = this.areaRepo.create({
      ...data,
      facility,
    });

    return this.areaRepo.save(area);
  }
}
