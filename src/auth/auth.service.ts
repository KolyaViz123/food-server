import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/users.service';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async ValidateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if(!user) {
      throw new UnauthorizedException('Email or password is incorect');
    }

    const passwordIsMatch = await argon2.verify(user.password, password);

    // todo: don't return user with password
    if (user && passwordIsMatch) {
      return user;
    }

    throw new UnauthorizedException('Email or password is incorect');
  }

  async login(user: IUser) {
    let  {id, email } = user;

    return {
      id,
      email,
      token: this.jwtService.sign({id, email})
    } 
  }
}
