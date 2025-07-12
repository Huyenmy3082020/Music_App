import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Facility } from './facility.entity';

export enum PowerContractType {
  FIXED = 'FIXED',
  VARIABLE = 'VARIABLE',
}

export enum PowerContractStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
@Check(`"contracted_power" >= 0`)
@Check(`"base_monthly_fee" >= 0`)
@Check(`"unit_price" >= 0`)
@Check(`"annual_power_usage" >= 0`)
@Check(`"estimated_annual_electricity_cost" >= 0`)
@Entity('power_contracts')
export class PowerContract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'provider_name' })
  providerName: string;

  @Column({
    name: 'contract_type',
    type: 'varchar',
    default: PowerContractType.FIXED,
    nullable: true,
  })
  contractType: PowerContractType | null;

  @Column({ name: 'contracted_power', type: 'float' })
  contractedPower: number;

  @Column({ name: 'base_monthly_fee', type: 'float', nullable: true })
  baseMonthlyFee: number | null;

  @Column({ name: 'unit_price', type: 'float', nullable: true })
  unitPrice: number | null;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date | null;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date | null;

  @Column({ name: 'contract_plan', nullable: true, type: 'varchar' })
  contractPlan: string | null;

  @Column({ name: 'annual_power_usage', type: 'float', nullable: true })
  annualPowerUsage: number | null;

  @Column({ name: 'contract_number', nullable: true, type: 'int' })
  contractNumber: number | null;

  @Column({ name: 'supply_point_id_number', type: 'varchar', nullable: true })
  supplyPointIdNumber: string | null;

  @Column({
    name: 'estimated_annual_electricity_cost',
    type: 'float',
    nullable: true,
  })
  estimatedAnnualElectricityCost: number | null;

  @Column({ name: 'invoice_storage_location', nullable: true, type: 'varchar' })
  invoiceStorageLocation: string | null;

  @Column('text', { name: 'invoice_urls', nullable: true })
  invoiceUrls: string[];

  @Column({
    type: 'enum',
    enum: PowerContractStatus,
    default: PowerContractStatus.ACTIVE,
    nullable: true,
  })
  status: PowerContractStatus | null;

  @Column({ name: 'facility_id' })
  facilityId: string;

  @ManyToOne(() => Facility)
  @JoinColumn({ name: 'facility_id' })
  facility: Facility;
}
