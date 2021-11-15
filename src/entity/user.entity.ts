import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';
import {AccountTypeEnum} from "../enum";

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
  accountType: AccountTypeEnum;

  // TODO: Implement mail service to send activation link and set default to false
  @Column({
    default: true
  })
  isActivated: boolean;

  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt?: Date;

  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt?: Date;
}
