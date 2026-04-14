import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('wallets') // Table name
export class WalletEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({ type: 'varchar', length: 255 })
    userId!: string;

  @Column('decimal', { precision: 18, scale: 8, default: 0 })
    balance!: number;

  @CreateDateColumn()
    createdAt!: Date;
}