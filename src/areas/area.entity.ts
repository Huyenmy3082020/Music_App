import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
  OneToMany,
} from 'typeorm';
import { Facility } from '../facilities/facility.entity';
import { Device } from '../devices/device.entity';
import { FloorDto } from './area.dto';

export enum AreaStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum AreaType {
  Reinforced_Concrete = 'Reinforced_Concrete',
  Steel = 'Steel',
  Steel_Reinforced_Concrete = 'Steel_Reinforced_Concrete',
  Wood = 'Wood',
  Other = 'Other',
}
@Check(`"floor" >= 0`)
@Check(`"area_size" >= 0`)
@Check(`"above_ground_floors" >= 0`)
@Check(`"underground_floors" >= 0`)
@Entity('areas')
export class Area {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  floor: number;

  @Column({
    name: 'area_type',
    type: 'enum',
    enum: AreaType,
    default: AreaType.Reinforced_Concrete,
  })
  areaType: AreaType;

  @Column({ name: 'area_size', type: 'float' })
  areaSize: number;

  @Column({ name: 'year_built', nullable: true, type: 'int' })
  yearBuilt: number | null;

  @Column({ name: 'above_ground_floors', type: 'int', default: 0 })
  aboveGroundFloors: number;

  @Column({ name: 'underground_floors', default: 0, type: 'int' })
  undergroundFloors: number;

  @Column('text', { array: true, name: 'floor_plans', default: [] })
  floorPlans: string[];

  @Column('json', { name: 'floors', default: [] })
  floors: FloorDto[];

  @Column({ type: 'enum', enum: AreaStatus, default: AreaStatus.ACTIVE })
  status: AreaStatus;

  @Column({ name: 'facility_id', type: 'uuid' })
  facilityId: string;

  @ManyToOne(() => Facility)
  @JoinColumn({ name: 'facility_id' })
  facility: Facility;

  @OneToMany(() => Device, (device) => device.area)
  devices: Device[];
}
