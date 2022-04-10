import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import * as bcrypt from 'bcrypt';
import { FriendEntity } from './friend.entity';

@Injectable()
export class UsersService {
 constructor(
     @InjectRepository(UsersEntity) private usersRepository:Repository<UsersEntity>,
     @InjectRepository(FriendEntity) private friendRepository:Repository<FriendEntity>,
     )
 {}
    async  createUsers(firstName: string,lastName:  string, email   :  string,password:  string)
    {
        
        const existingUser = await this.findByEmail(email);
        if(existingUser)
        {
            throw new Error('Use other email');
        }
        const hash = await bcrypt.hash(password, parseInt(process.env.SOLT));
       const user = this.usersRepository.create({
            firstName,
            lastName,
            email,
            password: hash,
            friends: [],
        })
        return await this.usersRepository.save(user)
    }
    async findByEmail(email: string) : Promise<UsersEntity>
    {
        const user = await this.usersRepository.findOne(
            {
                where: {
                    email,
                }
            }
        )

        return user;
    }
    


    async addFriend(id1:number,id2:number)
    {
         const user1 = await this.usersRepository.findOne(
            {
                where: {
                    id : id1,
                }
            }
        )
        const user2 = await this.usersRepository.findOne(
            {
                where: {
                    id : id2,
                }
            }
        )
        if(!user2 || !user1)
        {
            throw new NotFoundException('USER NOT FOUND');
        }
        else
        {
            const friend = this.friendRepository.create({
                user1:user1.id,
                user2:user2.id,
              
            })
           await this.friendRepository.save(friend);


            if (!user1.friends) {
                user1.friends = [friend];
            } else {
                user1.friends.push(friend);
            }



           
           return await this.usersRepository.save(user1);
        }

    }

}
