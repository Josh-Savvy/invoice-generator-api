import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

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
  @JoinColumn({ name: 'owner_id' })
  owner!: User;

  @Column()
  owner_id!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;
}
