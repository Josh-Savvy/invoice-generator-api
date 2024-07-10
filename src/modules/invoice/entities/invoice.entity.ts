import Client from 'src/modules/user/entities/client.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum InvoiceStatus {
  PENDING = 'pending',
  DRAFT = 'draft',
  SENT = 'sent',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled',
}

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ length: 100 })
  reference!: string;

  @ManyToOne(() => User, (user) => user.invoices, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by_id' })
  created_by!: User;

  @Column()
  created_by_id!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: false })
  is_paid!: boolean;

  @Column({ type: 'boolean', default: false })
  use_business_name!: boolean;

  @Column({ type: 'jsonb', nullable: true })
  client!: Client;

  @Column({ type: 'enum', enum: InvoiceStatus, default: InvoiceStatus.PENDING })
  invoice_status!: InvoiceStatus;

  @Column({ type: 'date' })
  due_date!: Date;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'text', nullable: true })
  bill_to?: string;

  @Column({ type: 'text', nullable: true })
  billing_address?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;
}
