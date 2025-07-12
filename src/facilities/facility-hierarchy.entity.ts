import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Facility } from './facility.entity';

@Entity('facility_hierarchy')
export class FacilityHierarchy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'parent_id' })
  parentId: string;

  @ManyToOne(() => Facility)
  @JoinColumn({ name: 'parent_id' })
  parentFacility: Facility;

  @Column({ name: 'child_id' })
  childId: string;

  @ManyToOne(() => Facility)
  @JoinColumn({ name: 'child_id' })
  childFacility: Facility;

  @Column({ name: 'hierarchy_type', nullable: true, type: 'varchar' })
  hierarchyType: string | null;
}
