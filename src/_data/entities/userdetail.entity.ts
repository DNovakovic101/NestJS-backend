import { UserEntity } from './user.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class UserDetailEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    street: string;

    @Column()
    code_postale: string;

    @Column()
    city: string;

    @Column({nullable: true, type: 'longblob'})
    profile_image?: Buffer;

    @Column({
        nullable: false,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: Date;

    @Column({
        nullable: false,
        type: 'timestamp',
    })
    updated_at: Date;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    userEntity: UserEntity;

    @Column({ nullable: true })
    userEntityId?: number;
}