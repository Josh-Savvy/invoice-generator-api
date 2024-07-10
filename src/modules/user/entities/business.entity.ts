import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Invoice } from 'src/modules/invoice/entities/invoice.entity';

@Entity('businesses')
export default class Business {
  @PrimaryGeneratedColumn('rowid')
  id!: number;

  @Column()
  logo_url!: string;

  @Column()
  business_name!: string;

  @Column()
  is_verified!: boolean;

  @OneToOne(() => User, (user) => user.business)
  owner!: User;

  @OneToMany(() => Invoice, (invoices) => invoices.created_by)
  invoices!: Invoice[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;
}
