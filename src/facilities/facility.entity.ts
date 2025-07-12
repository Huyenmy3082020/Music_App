import { BaseEntity } from '../../base/base.entity';
import {
  Check,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from '../organizations/organization.entity';
import { User } from '../users/user.entity';
import { Terminal } from '../terminals/terminal.entity';

export enum FacilityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum FacilityType {
  OFFICE_BUILDING = 'OFFICE_BUILDING',
  FACTORY = 'FACTORY',
  WAREHOUSE = 'WAREHOUSE',
  STORE = 'STORE',
  HOTEL = 'HOTEL',
  HOSPITAL = 'HOSPITAL',
  SCHOOL = 'SCHOOL',
  OTHERS = 'OTHERS',
}
@Check(`"total_area" >= 0`)
@Entity('facilities')
export class Facility extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({
    name: 'facility_type',
    type: 'varchar',
    default: FacilityType.OFFICE_BUILDING,
  })
  facilityType: FacilityType;

  @Column({ name: 'total_area', type: 'float' })
  totalArea: number;

  @Column({ name: 'facility_code', unique: true })
  facilityCode: string;

  @Column({ name: 'contact_name', nullable: true, type: 'varchar' })
  contactName: string | null;

  @Column({ name: 'contact_phone' })
  contactPhone: string;

  @Column({})
  email: string;

  @Column({ name: 'postal_code', nullable: true, type: 'varchar' })
  postalCode: string | null;

  @Column({ name: 'province', nullable: true, type: 'varchar' })
  province: string | null;

  @Column({ nullable: true, type: 'varchar' })
  district: string | null;

  @Column({ type: 'text', nullable: true })
  remarks: string | null;

  @Column({
    type: 'varchar',
    default: FacilityStatus.ACTIVE,
  })
  status: FacilityStatus;

  @Column({ name: 'organization_id' })
  organizationId: string;

  @ManyToOne(() => Organization, (organization) => organization.facilities)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedAt: Date | null;

  @ManyToMany(() => User, (user) => user.facilities, {
    onDelete: 'CASCADE',
  }) // Thiết lập quan hệ nhiều-nhiều với User
  users: User[];

  @OneToMany(() => Terminal, (terminal) => terminal.facility, {
    onDelete: 'CASCADE',
  }) // Thiết lập quan hệ một-nhiều với Terminal
  terminals: Terminal[];
}
