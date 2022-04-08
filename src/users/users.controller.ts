import { Body, Controller, Request, Post, UseGuards, Param } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { UsersDto } from "./dto/users.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService,
                private readonly authService:AuthService){
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('friend/:id')
    addFriend(@Request() req,@Param() param){
       return this.usersService.addFriend(req.user.userId,param.id)
    }


  @Post()
  registerUsers(@Body() body: UsersDto)
  {
    return  this.usersService.createUsers(body.firstName,body.lastName,body.email,body.password)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {

    return this.authService.login(req.user);
  }

}