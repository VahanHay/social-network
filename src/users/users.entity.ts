import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { FriendEntity } from "./friend.entity";


@Entity()
export class UsersEntity
{

    @Column()
    firstName: string;

    @Column()
    lastName:  string;

    @Column({
        type: "varchar",
        unique:true
    })
    email   :  string;
    
    @Column()
    password:  string;

    @PrimaryGeneratedColumn()
    id:  number;

    @ManyToMany(() => FriendEntity)
    @JoinTable()
    friends: FriendEntity[];
}
