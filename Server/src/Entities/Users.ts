import { BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Users extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    firstName!:string;

    @Column()
    lastName!:string;

    @Column()
    email!:string;

    @Column()
    username!:string;

    @Column()
    password!:string;

    @Column()
    mobile!:string;

    @Column()
    state!:string;

    @Column()
    city!:string;
}