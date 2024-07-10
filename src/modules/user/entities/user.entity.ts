import { Invoice } from 'src/modules/invoice/entities/invoice.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true, type: 'timestamp' })
  last_login_at?: Date;

  @OneToMany(() => Invoice, (invoices) => invoices.created_by)
  invoices!: Invoice[];

  @OneToOne(() => Business, (b) => b.owner)
  @JoinColumn({ name: 'business_id' })
  business!: Business;

  @Column({ nullable: true })
  business_id!: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}
