import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "./users.entity";


@Entity()
export class FriendEntity
{

    @Column()
    user1: number;

    @Column()
    user2:  number;

    
    
    @PrimaryGeneratedColumn()
    id:  number;
}