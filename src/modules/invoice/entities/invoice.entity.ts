import Decimal from 'decimal.js';
import { Currency } from 'src/constants';
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
import type { PaymentMethod } from '../dto/create-invoice.dto';

export enum InvoiceStatus {
  PENDING = 'pending',
  DRAFT = 'draft',
  SENT = 'sent',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled',
}

export class InvoiceItem {
  name: string;
  description: string;
  price!: number;
  currency!: Currency;
  quantity: number;
  rate: number;

  constructor(item: InvoiceItem) {
    Object.assign(this, item);
    this.calculateTotalPrice();
  }
  calculateTotalPrice() {
    const total_price = new Decimal(this.rate * this.quantity);
    this.price = total_price.toNumber();
    return this;
  }
}

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ length: 100 })
  reference!: string;

  @Column({ type: 'text', nullable: true })
  subject?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0 })
  tax_percentage!: number;

  @Column({ type: 'boolean', default: false })
  is_paid!: boolean;

  @Column({ type: 'boolean', default: false })
  use_business_name!: boolean;

  @Column({ type: 'jsonb', nullable: true })
  client!: Client;

  @Column({ type: 'enum', enum: InvoiceStatus, default: InvoiceStatus.PENDING })
  invoice_status!: InvoiceStatus;

  @Column()
  due_date!: Date;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'jsonb' })
  currency: Currency;

  @Column({ type: 'jsonb' })
  payment_method: PaymentMethod;

  @Column({ type: 'jsonb' })
  items: InvoiceItem[];

  @Column({ type: 'text', nullable: true })
  billing_to?: string;

  @Column({ type: 'text', nullable: true })
  billing_address?: string;

  @ManyToOne(() => User, (user) => user.invoices, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by_id' })
  created_by!: User;

  @Column()
  created_by_id!: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}
