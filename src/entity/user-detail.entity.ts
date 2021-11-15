import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn} from 'typeorm';
import {UserEntity} from "./user.entity";

@Entity()
export class UserDetailEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true
  })
  street?: string;

  @Column()
  postalCode: string;

  @Column()
  city: string;

  @Column({
    nullable: true
  })
  companyName?: string;

  @Column({
    nullable: true
  })
  acceptANB?: boolean;

  @Column({
    nullable: true,
    type: 'longblob'
  })
  profileImage?: Buffer;

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

  @OneToOne(() => UserEntity)
  @JoinColumn()
  userEntity: UserEntity;
}
