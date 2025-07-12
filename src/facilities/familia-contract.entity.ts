import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Check } from 'typeorm';
import { Facility } from './facility.entity';

export enum FamiliaContractPlan {
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE',
}

export enum FamiliaContractInstallationMethod {
  WALL = 'WALL',
  DESK = 'DESK',
  RACK = 'RACK',
  OTHER = 'OTHER',
}
@Check(`"contract_duration" >= 0`)
@Check(`"monthly_fee" >= 0`)
@Check(`"terminal_number" >= 0`)
@Entity('familia_contracts')
export class FamiliaContract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Facility, (facility) => facility.id)
  @JoinColumn({ name: 'facility_id' })
  facility: Facility;

  @Column({
    name: 'contract_plan',
    type: 'varchar',
    default: FamiliaContractPlan.STANDARD,
  })
  contractPlan: FamiliaContractPlan;

  @Column({ name: 'contract_start_date', type: 'date' })
  contractStartDate: Date;

  @Column({ name: 'contract_duration', type: 'int', nullable: true })
  contractDuration: number | null;

  @Column({ name: 'contract_options', type: 'simple-array', nullable: true })
  contractOptions: string[] | null;

  @Column({ name: 'monthly_fee', type: 'float' })
  monthlyFee: number;

  @Column({ name: 'contract_remarks', type: 'text', nullable: true })
  contractRemarks: string | null;

  @Column({ name: 'terminal_number', type: 'int' })
  terminalNumber: number;

  @Column({
    name: 'installation_method',
    type: 'varchar',
    nullable: true,
  })
  installationMethod: FamiliaContractInstallationMethod | null;

  @Column({ name: 'connected_device_memo', type: 'text', nullable: true })
  connectedDeviceMemo: string | null;
}
