import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { AccountType } from '../models/accounttype.model';


@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  email: string;
  
  @Column()
  password: string;

  @Column()
  account_type: AccountType;

  // @Column({
  //   asExpression: 'ADD COLUMN `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP',
  // })
  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP' 
  })
  created_at: Date;
  
}