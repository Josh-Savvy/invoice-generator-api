import { Invoice } from 'src/modules/invoice/entities/invoice.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Business from './business.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  password!: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @OneToMany(() => Invoice, (invoices) => invoices.created_by)
  invoices!: Invoice[];

  @OneToOne(() => Business, (b) => b.owner)
  business!: Business;

  @CreateDateColumn({ type: 'time with time zone' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updated_at!: Date;
}
