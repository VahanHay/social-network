import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService:UsersService, private jwtService: JwtService) 
    {

    } 


    async valdate(email: string , password : string)
    {
        const user = await this.usersService.findByEmail(email);

        if(user)
        {
            const isEqual = await bcrypt.compare(password, user.password);
            if(isEqual)
             {
                 return user;
             }
             else{
                 return null;
             }
        }
        return null;
    }

    
   async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
